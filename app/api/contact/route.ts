import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailWrapper, dataRow } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: 'Please fill in all required fields' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Hadsul Contact Form <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:20px; margin:0 0 20px 0;">New Contact Form Submission</h2>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${dataRow('Name', name)}
            ${dataRow('Email', `<a href="mailto:${email}" style="color:#059669;">${email}</a>`)}
            ${phone ? dataRow('Phone', `<a href="tel:${phone}" style="color:#059669;">${phone}</a>`) : ''}
            ${dataRow('Subject', subject)}
            ${dataRow('Submitted', new Date().toLocaleString())}
          </tbody>
        </table>
        <div style="margin-top:20px; background:#f9fafb; border-left:4px solid #059669; border-radius:4px; padding:16px;">
          <p style="font-weight:bold; color:#374151; margin:0 0 8px 0; font-size:14px;">Message:</p>
          <p style="color:#1f2937; margin:0; font-size:14px; line-height:1.7; white-space:pre-wrap;">${message}</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td style="padding-right:10px;">
              <a href="mailto:${email}" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:10px 24px; border-radius:50px; font-size:14px; font-weight:bold;">
                Reply to ${name}
              </a>
            </td>
            ${phone ? `<td><a href="tel:${phone}" style="display:inline-block; background:#6b7280; color:#ffffff; text-decoration:none; padding:10px 24px; border-radius:50px; font-size:14px; font-weight:bold;">Call ${name}</a></td>` : ''}
          </tr>
        </table>
      `, `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hadsul.co.uk'}/unnamed.jpg`),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, message: 'Failed to send message. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Thank you for your message! We will get back to you shortly.' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
