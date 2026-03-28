import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailWrapper, dataRow } from '@/lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, address, company, designation, registrationNumber, productName, productDescription } = await request.json();

    if (!name || !email || !address || !company || !designation || !registrationNumber || !productName) {
      return NextResponse.json({ success: false, message: 'Please fill in all required fields' }, { status: 400 });
    }

    const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hadsul.co.uk';
    const productBannerMap: Record<string, string> = {
      'Gold on Demand': `${BASE}/images/below/gold_subscription.png`,
      'Platinum on Demand': `${BASE}/images/below/platinum_subscription.png`,
      'Emerald on Demand': `${BASE}/images/below/emerald_subscription.png`,
      'Hadsul House': `${BASE}/images/below/hadsul_subscription.png`,
    };
    const bannerUrl = productBannerMap[productName] || `${BASE}/unnamed.png`;

    // Admin notification
    const { error } = await resend.emails.send({
      from: 'Hadsul Subscriptions <onboarding@resend.dev>',
      to: ['admin@hadsul.co.uk'],
      replyTo: email,
      subject: `New Subscription: ${productName}`,
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:20px; margin:0 0 20px 0;">New Product Subscription</h2>
        <div style="background:#f0fdf4; border-radius:8px; padding:16px; margin-bottom:20px;">
          <p style="margin:0; font-size:15px; color:#374151;"><strong>Product:</strong> <span style="color:#059669;">${productName}</span></p>
          <p style="margin:6px 0 0 0; font-size:13px; color:#6b7280;">${productDescription}</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          <tbody>
            ${dataRow('Full Name', name)}
            ${dataRow('Email', `<a href="mailto:${email}" style="color:#059669;">${email}</a>`)}
            ${dataRow('Address', address)}
            ${dataRow('Company', company)}
            ${dataRow('Designation', designation)}
            ${dataRow('Registration No.', registrationNumber)}
            ${dataRow('Submitted', new Date().toLocaleString())}
          </tbody>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td>
              <a href="mailto:${email}" style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; padding:10px 24px; border-radius:50px; font-size:14px; font-weight:bold;">
                Contact Subscriber
              </a>
            </td>
          </tr>
        </table>
      `, bannerUrl),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, message: 'Failed to submit subscription. Please try again.' }, { status: 500 });
    }

    // User confirmation
    const { error: userError } = await resend.emails.send({
      from: 'Hadsul <onboarding@resend.dev>',
      to: [email],
      subject: `Subscription Confirmation — ${productName}`,
      html: emailWrapper(`
        <h2 style="color:#059669; font-size:22px; margin:0 0 8px 0;">Thank You for Subscribing!</h2>
        <p style="color:#6b7280; font-size:15px; margin:0 0 24px 0;">We've received your subscription request.</p>

        <p style="color:#374151; font-size:15px; line-height:1.7; margin:0 0 20px 0;">
          Dear ${name}, thank you for subscribing to <strong style="color:#059669;">${productName}</strong>. Our team will contact you shortly to complete the setup.
        </p>

        <div style="background:#f0fdf4; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="font-weight:bold; color:#374151; margin:0 0 12px 0; font-size:15px;">Your Subscription Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              ${dataRow('Product', productName)}
              ${dataRow('Company', company)}
              ${dataRow('Submitted', new Date().toLocaleString())}
            </tbody>
          </table>
        </div>

        <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:20px; margin:0 0 24px 0;">
          <p style="font-weight:bold; color:#374151; margin:0 0 10px 0; font-size:15px;">What Happens Next?</p>
          <ul style="color:#374151; line-height:1.9; padding-left:20px; margin:0; font-size:14px;">
            <li>We will review your subscription request</li>
            <li>We'll contact you within 24–48 hours</li>
            <li>You'll receive detailed information about your subscription</li>
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
      `, bannerUrl),
    });

    if (userError) {
      console.error('User confirmation email error:', userError);
    }

    return NextResponse.json({ success: true, message: 'Subscription submitted successfully! Check your email for confirmation.' });
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
