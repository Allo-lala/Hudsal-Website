import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailWrapper, dataRow } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, address, qualification, experience, trainingInterest, additionalInfo } = await request.json();

    if (!name || !email || !phone || !address || !qualification || !experience || !trainingInterest) {
      return NextResponse.json({ success: false, message: 'All required fields must be filled' }, { status: 400 });
    }

    // Admin notification
    const { error } = await resend.emails.send({
      from: 'Hadsul Training <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      replyTo: email,
      subject: `Training Application — ${name}`,
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:20px; margin:0 0 20px 0;">New Career Training & Coaching Application</h2>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${dataRow('Full Name', name)}
            ${dataRow('Email', `<a href="mailto:${email}" style="color:#059669;">${email}</a>`)}
            ${dataRow('Phone', phone)}
            ${dataRow('Address', address)}
            ${dataRow('Qualifications', qualification)}
            ${dataRow('Experience', experience.replace(/\n/g, '<br/>'))}
            ${dataRow('Training Interest', trainingInterest)}
            ${additionalInfo ? dataRow('Additional Info', additionalInfo.replace(/\n/g, '<br/>')) : ''}
            ${dataRow('Submitted', new Date().toLocaleString())}
          </tbody>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td>
              <a href="mailto:${email}" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:10px 24px; border-radius:50px; font-size:14px; font-weight:bold;">
                Reply to ${name}
              </a>
            </td>
          </tr>
        </table>
      `),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, message: 'Failed to submit application. Please try again.' }, { status: 500 });
    }

    // User confirmation
    const { error: userError } = await resend.emails.send({
      from: 'Hadsul <onboarding@resend.dev>',
      to: [email],
      subject: 'Training Application Received — Hadsul',
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:22px; margin:0 0 8px 0;">Application Received!</h2>
        <p style="color:#6b7280; font-size:15px; margin:0 0 24px 0;">We've received your training application.</p>

        <p style="color:#374151; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
          Dear ${name}, thank you for applying to our <strong style="color:#059669;">Career Training & Coaching</strong> program. Our team will review your application and contact you shortly.
        </p>

        <div style="background:#f0fdf4; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="font-weight:bold; color:#374151; margin:0 0 12px 0; font-size:15px;">Your Application Summary</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              ${dataRow('Training Interest', trainingInterest)}
              ${dataRow('Submitted', new Date().toLocaleString())}
            </tbody>
          </table>
        </div>

        <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="font-weight:bold; color:#374151; margin:0 0 10px 0; font-size:15px;">What Happens Next?</p>
          <ul style="color:#374151; line-height:1.9; padding-left:20px; margin:0; font-size:14px;">
            <li>Our team will review your application</li>
            <li>We'll contact you within 24–48 hours</li>
            <li>We'll discuss the training program details and schedule</li>
            <li>You'll receive guidance on the next steps to get started</li>
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
      `, `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hadsul.co.uk'}/images/services/training.png`),
    });

    if (userError) {
      console.error('User confirmation email error:', userError);
    }

    return NextResponse.json({ success: true, message: 'Training application submitted successfully!' });
  } catch (error) {
    console.error('Training application API error:', error);
    return NextResponse.json({ success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
