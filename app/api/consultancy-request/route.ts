import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessEmail,
      address,
      serviceType,
      deliveryMode,
      otherService,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !businessName || !businessEmail || !address || !serviceType || !deliveryMode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If "Other" is selected, otherService is required
    if (serviceType === "Other" && !otherService) {
      return NextResponse.json(
        { error: "Please describe the service you need" },
        { status: 400 }
      );
    }

    const serviceDescription = serviceType === "Other" ? otherService : serviceType;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Hadsul Consultancy Request <noreply@hadsul.co.uk>",
      to: process.env.CONTACT_EMAIL || "info@hadsul.co.uk",
      replyTo: email,
      subject: `Consultancy Request: ${serviceType} (${deliveryMode}) - ${businessName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consultancy Request</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Consultancy Request</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #10b981; margin-top: 0;">Personal Information</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${phone}</td>
                </tr>
              </table>

              <h2 style="color: #10b981;">Business Information</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Business Name:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${businessName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Business Email:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${businessEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Address:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${address}</td>
                </tr>
              </table>

              <h2 style="color: #10b981;">Consultation Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Service Type:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${serviceType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Delivery Mode:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><span style="background: ${deliveryMode === 'Remote' ? '#3b82f6' : '#f59e0b'}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">${deliveryMode}</span></td>
                </tr>
                ${serviceType === "Other" ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Description:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${otherService}</td>
                </tr>
                ` : ''}
              </table>

              <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  This consultancy request was submitted through the Hadsul website. Please respond promptly to provide excellent customer service.
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
              <p>© ${new Date().getFullYear()} Hadsul. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Consultancy request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
