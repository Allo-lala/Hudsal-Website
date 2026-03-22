import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, product, platform, variant, price, aiDescription, name, email, phone, company, notes } = body;

    const isAI = category?.includes("AI");

    const orderDetails = isAI
      ? `<p><strong>Service:</strong> AI & Automation — Custom Request</p><p><strong>Description:</strong><br/>${aiDescription}</p>`
      : `<p><strong>Product:</strong> ${product}</p>
         ${platform ? `<p><strong>Platform:</strong> ${platform === "windows" ? "Windows" : "macOS"}</p>` : ""}
         ${variant ? `<p><strong>Version:</strong> ${variant}</p>` : ""}
         ${price ? `<p><strong>Price:</strong> ${price}</p>` : ""}`;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.TO_EMAIL || "admin@hadsul.co.uk",
      subject: `New Software Order — ${product || "AI Service"} from ${name}`,
      html: `
        <h2>New Software Order</h2>
        <h3>Order Details</h3>
        <p><strong>Category:</strong> ${category}</p>
        ${orderDetails}
        <hr/>
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
      `,
    });

    // Confirmation to customer
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: `Order Received — ${product || "AI & Automation Service"}`,
      html: `
        <h2>Thank you for your order, ${name}!</h2>
        <p>We've received your order and will be in touch shortly with delivery details and next steps.</p>
        ${orderDetails}
        <p>If you have any questions, reply to this email or contact us at admin@hadsul.co.uk</p>
        <p>— The Hadsul Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Software order error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
