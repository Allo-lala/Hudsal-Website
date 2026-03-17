import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { emailWrapper, dataRow } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://hadsul.co.uk";

export async function POST(request: NextRequest) {
  try {
    const {
      firstName, lastName, email, phone, company,
      addressLine1, addressLine2, city, county, postcode,
      notes, items,
    } = await request.json();

    if (!firstName || !lastName || !email || !phone || !addressLine1 || !city || !county || !postcode) {
      return NextResponse.json({ success: false, message: "Please fill in all required fields" }, { status: 400 });
    }

    const itemsHtml = (items as string[])
      .map((item) => `<li style="padding:4px 0; color:#374151; font-size:14px;">${item}</li>`)
      .join("");

    const shippingAddress = [addressLine1, addressLine2, city, county, postcode]
      .filter(Boolean)
      .join(", ");

    // Admin notification
    const { error } = await resend.emails.send({
      from: "Hadsul Shop <onboarding@resend.dev>",
      to: ["admin@hadsul.co.uk"],
      replyTo: email,
      subject: `New Product Order — ${firstName} ${lastName}`,
      html: emailWrapper(
        `
        <h2 style="color:#059669; font-size:20px; margin:0 0 20px 0;">New Product Order</h2>

        <div style="background:#f0fdf4; border-radius:8px; padding:16px; margin-bottom:20px;">
          <p style="font-weight:bold; color:#374151; margin:0 0 8px 0; font-size:14px;">Items Ordered:</p>
          <ul style="margin:0; padding-left:20px;">${itemsHtml}</ul>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${dataRow("Name", `${firstName} ${lastName}`)}
            ${dataRow("Email", `<a href="mailto:${email}" style="color:#059669;">${email}</a>`)}
            ${dataRow("Phone", `<a href="tel:${phone}" style="color:#059669;">${phone}</a>`)}
            ${company ? dataRow("Company", company) : ""}
            ${dataRow("Shipping Address", shippingAddress)}
            ${notes ? dataRow("Notes", notes) : ""}
            ${dataRow("Submitted", new Date().toLocaleString())}
          </tbody>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td>
              <a href="mailto:${email}" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:10px 24px; border-radius:50px; font-size:14px; font-weight:bold;">
                Reply to ${firstName}
              </a>
            </td>
          </tr>
        </table>
        `,
        `${BASE}/images/services/staffing.png`
      ),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, message: "Failed to place order. Please try again." }, { status: 500 });
    }

    // Customer confirmation
    const { error: confirmError } = await resend.emails.send({
      from: "Hadsul Shop <onboarding@resend.dev>",
      to: [email],
      subject: "Order Received — Hadsul",
      html: emailWrapper(
        `
        <h2 style="color:#059669; font-size:22px; margin:0 0 8px 0;">Order Received!</h2>
        <p style="color:#6b7280; font-size:15px; margin:0 0 24px 0;">Thank you for your order, ${firstName}.</p>

        <p style="color:#374151; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
          We've received your order and our team will review it and contact you within 24 hours to confirm pricing and delivery details.
        </p>

        <div style="background:#f0fdf4; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="font-weight:bold; color:#374151; margin:0 0 10px 0; font-size:15px;">Your Order</p>
          <ul style="margin:0; padding-left:20px;">${itemsHtml}</ul>
        </div>

        <div style="background:#f9fafb; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="font-weight:bold; color:#374151; margin:0 0 10px 0; font-size:15px;">Shipping To</p>
          <p style="color:#374151; font-size:14px; margin:0;">${shippingAddress}</p>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <a href="mailto:admin@hadsul.co.uk" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:12px 32px; border-radius:50px; font-size:15px; font-weight:bold;">
                Contact Us
              </a>
            </td>
          </tr>
        </table>
        `,
        `${BASE}/images/services/staffing.png`
      ),
    });

    if (confirmError) {
      console.error("Confirmation email error:", confirmError);
    }

    return NextResponse.json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json({ success: false, message: "Server error. Please try again." }, { status: 500 });
  }
}
