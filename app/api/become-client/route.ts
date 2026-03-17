import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailWrapper, dataRow } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, address, companyName, phone, service, description } = body;

    const { error } = await resend.emails.send({
      from: 'Hadsul Website <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      replyTo: email,
      subject: `New Client Request — ${service}`,
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:20px; margin:0 0 20px 0;">New Client Request</h2>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${dataRow('Name', name)}
            ${dataRow('Email', `<a href="mailto:${email}" style="color:#059669;">${email}</a>`)}
            ${dataRow('Phone', phone)}
            ${dataRow('Address', address)}
            ${dataRow('Company', companyName)}
            ${dataRow('Service', `<strong style="color:#059669;">${service}</strong>`)}
            ${dataRow('Submitted', new Date().toLocaleString())}
          </tbody>
        </table>
        <div style="margin-top:20px; background:#f9fafb; border-left:4px solid #059669; border-radius:4px; padding:16px;">
          <p style="font-weight:bold; color:#374151; margin:0 0 8px 0; font-size:14px;">Description:</p>
          <p style="color:#1f2937; margin:0; font-size:14px; line-height:1.7; white-space:pre-wrap;">${description}</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td>
              <a href="mailto:${email}" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:10px 24px; border-radius:50px; font-size:14px; font-weight:bold;">
                Reply to ${name}
              </a>
            </td>
          </tr>
        </table>
      `, `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hadsul.co.uk'}/images/services/staffing.png`),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
