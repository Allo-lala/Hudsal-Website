import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      phoneNumber,
      companyName,
      country,
      state,
      hearAboutUs,
      companyWebsite,
      currentPlatforms,
    } = body;

    if (!firstName || !lastName || !email || !jobTitle || !phoneNumber || !companyName || !country || !state || !hearAboutUs) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Send email to admin
    const { error } = await resend.emails.send({
      from: 'Hadsul CRM <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      replyTo: email,
      subject: `CRM Demo Request from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New CRM Request
          </h2>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 200px;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #059669;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Job Title:</td>
                <td style="padding: 8px 0; color: #1f2937;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone Number:</td>
                <td style="padding: 8px 0; color: #1f2937;">${phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Company Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Country/Region:</td>
                <td style="padding: 8px 0; color: #1f2937;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">State/Region:</td>
                <td style="padding: 8px 0; color: #1f2937;">${state}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">How they heard about us:</td>
                <td style="padding: 8px 0; color: #1f2937;">${hearAboutUs}</td>
              </tr>
              ${companyWebsite ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Company Website:</td>
                <td style="padding: 8px 0;"><a href="${companyWebsite}" style="color: #059669;">${companyWebsite}</a></td>
              </tr>` : ''}
              ${currentPlatforms ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Current Platforms:</td>
                <td style="padding: 8px 0; color: #1f2937;">${currentPlatforms.replace(/\n/g, '<br/>')}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted:</td>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 10px;">
            <a href="mailto:${email}" style="display: inline-block; background-color: #059669; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">Reply to ${firstName}</a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            <em>CRM Request from Hadsul Website</em>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, message: 'Failed to submit request. Please try again.' }, { status: 500 });
    }

    // Send confirmation to user
    const { error: userError } = await resend.emails.send({
      from: 'Hadsul <onboarding@resend.dev>',
      to: [email],
      subject: 'CRM Request Received - Hadsul',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            Thank You for Your Interest!
          </h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${firstName},</p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We've received your CRM request. Our team will review your details and get back to you within 24–48 hours to schedule your demo.
          </p>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin-top: 0;">What Happens Next?</h3>
            <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
              <li>Our team will review your request</li>
              <li>We'll contact you within 24–48 hours</li>
              <li>We'll schedule a personalised CRM for your care home</li>
              <li>We'll guide you through the onboarding process</li>
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

    return NextResponse.json({ success: true, message: 'CRM request submitted successfully!' });
  } catch (error) {
    console.error('CRM request API error:', error);
    return NextResponse.json(
      { success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
