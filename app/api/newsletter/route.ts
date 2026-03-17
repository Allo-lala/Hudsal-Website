import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailWrapper, dataRow } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // Subscriber confirmation email
    const { error: confirmationError } = await resend.emails.send({
      from: 'Hadsul Newsletter <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Hadsul Newsletter!',
      html: emailWrapper(`
        <h1 style="color:#059669; font-size:24px; margin:0 0 8px 0;">Welcome to Hadsul!</h1>
        <p style="color:#6b7280; font-size:15px; margin:0 0 24px 0;">Thank you for subscribing to our newsletter.</p>

        <p style="color:#374151; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
          You're now part of the Hadsul community. We'll keep you updated with the latest in healthcare, business insights, and company news.
        </p>

        <div style="background:#f0fdf4; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="color:#374151; font-weight:bold; margin:0 0 10px 0; font-size:15px;">What to expect:</p>
          <ul style="color:#374151; line-height:1.9; padding-left:20px; margin:0; font-size:14px;">
            <li>Latest industry news and opportunities</li>
            <li>Updates on our services and new offerings</li>
            <li>Healthcare tips and best practices</li>
            <li>Company news and announcements</li>
          </ul>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <a href="https://hadsul.co.uk" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:12px 32px; border-radius:50px; font-size:15px; font-weight:bold;">
                Visit Our Website
              </a>
            </td>
          </tr>
        </table>
      `, `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hadsul.co.uk'}/unnamed.jpg`),
    });

    if (confirmationError) {
      console.error('Confirmation email error (domain likely not verified):', confirmationError);
    }

    // Admin notification
    const { error: notificationError } = await resend.emails.send({
      from: 'Hadsul Newsletter <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      subject: 'New Newsletter Subscription',
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:20px; margin:0 0 20px 0;">New Newsletter Subscription</h2>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${dataRow('Email', `<a href="mailto:${email}" style="color:#059669;">${email}</a>`)}
            ${dataRow('Subscribed', new Date().toLocaleString())}
          </tbody>
        </table>
      `),
    });

    if (notificationError) {
      console.error('Admin notification email error:', notificationError);
      return NextResponse.json({ success: false, message: 'Failed to process subscription. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
