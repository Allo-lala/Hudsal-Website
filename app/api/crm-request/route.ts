import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailWrapper, dataRow } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, jobTitle, phoneNumber, companyName, country, state, hearAboutUs, companyWebsite, currentPlatforms } = await request.json();

    if (!firstName || !lastName || !email || !jobTitle || !phoneNumber || !companyName || !country || !state || !hearAboutUs) {
      return NextResponse.json({ success: false, message: 'All required fields must be filled' }, { status: 400 });
    }

    // Admin notification
    const { error } = await resend.emails.send({
      from: 'Hadsul CRM <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      replyTo: email,
      subject: `CRM Request — ${firstName} ${lastName}`,
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:20px; margin:0 0 20px 0;">New CRM Demo Request</h2>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${dataRow('Name', `${firstName} ${lastName}`)}
            ${dataRow('Email', `<a href="mailto:${email}" style="color:#059669;">${email}</a>`)}
            ${dataRow('Job Title', jobTitle)}
            ${dataRow('Phone', phoneNumber)}
            ${dataRow('Company', companyName)}
            ${dataRow('Country/Region', country)}
            ${dataRow('State/Region', state)}
            ${dataRow('How they heard', hearAboutUs)}
            ${companyWebsite ? dataRow('Website', `<a href="${companyWebsite}" style="color:#059669;">${companyWebsite}</a>`) : ''}
            ${currentPlatforms ? dataRow('Current Platforms', currentPlatforms.replace(/\n/g, '<br/>')) : ''}
            ${dataRow('Submitted', new Date().toLocaleString())}
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
      `),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, message: 'Failed to submit request. Please try again.' }, { status: 500 });
    }

    // User confirmation
    const { error: userError } = await resend.emails.send({
      from: 'Hadsul <onboarding@resend.dev>',
      to: [email],
      subject: 'CRM Request Received — Hadsul',
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:22px; margin:0 0 8px 0;">Thank You for Your Interest!</h2>
        <p style="color:#6b7280; font-size:15px; margin:0 0 24px 0;">We've received your CRM request.</p>

        <p style="color:#374151; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
          Dear ${firstName}, our team will review your details and get back to you within 24–48 hours to schedule your CRM.
        </p>

        <div style="background:#f0fdf4; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="font-weight:bold; color:#374151; margin:0 0 10px 0; font-size:15px;">What Happens Next?</p>
          <ul style="color:#374151; line-height:1.9; padding-left:20px; margin:0; font-size:14px;">
            <li>Our team will review your request</li>
            <li>We'll contact you within 24–48 hours</li>
            <li>We'll schedule a personalised demo for your team</li>
            <li>We'll guide you through the onboarding process</li>
          </ul>
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
      `, `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hadsul.co.uk'}/images/services/crm.png`),
    });

    if (userError) {
      console.error('User confirmation email error:', userError);
    }

    return NextResponse.json({ success: true, message: 'CRM request submitted successfully!' });
  } catch (error) {
    console.error('CRM request API error:', error);
    return NextResponse.json({ success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
