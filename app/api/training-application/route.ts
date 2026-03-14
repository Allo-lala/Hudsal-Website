import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      address,
      qualification,
      experience,
      trainingInterest,
      additionalInfo,
    } = body;

    if (!name || !email || !phone || !address || !qualification || !experience || !trainingInterest) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Send email to admin
    const { error } = await resend.emails.send({
      from: 'Hadsul Training <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      replyTo: email,
      subject: `Training Application from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Career Training & Coaching Application
          </h2>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <h3 style="color: #374151; margin-top: 0;">Applicant Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 200px;">Full Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #059669;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 8px 0; color: #1f2937;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Address:</td>
                <td style="padding: 8px 0; color: #1f2937;">${address}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Current Qualifications:</td>
                <td style="padding: 8px 0; color: #1f2937;">${qualification}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Relevant Experience:</td>
                <td style="padding: 8px 0; color: #1f2937;">${experience.replace(/\n/g, '<br/>')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Training Interest:</td>
                <td style="padding: 8px 0; color: #1f2937;">${trainingInterest}</td>
              </tr>
              ${additionalInfo ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Additional Info:</td>
                <td style="padding: 8px 0; color: #1f2937;">${additionalInfo.replace(/\n/g, '<br/>')}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted:</td>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 10px;">
            <a href="mailto:${email}" style="display: inline-block; background-color: #059669; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">Reply to ${name}</a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            <em>Training Application from Hadsul Website</em>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, message: 'Failed to submit application. Please try again.' }, { status: 500 });
    }

    // Send confirmation to applicant
    const { error: userError } = await resend.emails.send({
      from: 'Hadsul <onboarding@resend.dev>',
      to: [email],
      subject: 'Training Application Received - Hadsul',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            Application Received!
          </h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Thank you for applying to our <strong style="color: #059669;">Career Training & Coaching</strong> program. We've received your application and our team will review it shortly.
          </p>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin-top: 0;">Your Application Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 180px;">Training Interest:</td>
                <td style="padding: 8px 0; color: #1f2937;">${trainingInterest}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted:</td>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <h3 style="color: #374151; margin-top: 0;">What Happens Next?</h3>
            <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
              <li>Our team will review your application</li>
              <li>We'll contact you within 24–48 hours</li>
              <li>We'll discuss the training program details and schedule</li>
              <li>You'll receive guidance on the next steps to get started</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 20px 0;">
            <a href="mailto:admin@hadsul.co.uk" style="display: inline-block; background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px;">Contact Us</a>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px;">Best regards,<br><strong style="color: #059669;">The Hadsul Team</strong></p>
        </div>
      `,
    });

    if (userError) {
      console.error('User confirmation email error:', userError);
    }

    return NextResponse.json({ success: true, message: 'Training application submitted successfully!' });
  } catch (error) {
    console.error('Training application API error:', error);
    return NextResponse.json(
      { success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
