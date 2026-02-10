import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API called');
    
    const contactData = await request.json();
    const { name, email, phone, subject, message } = contactData;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      }, { status: 400 });
    }

    console.log('Contact form submission from:', email);

    // Send email to admin with contact form details
    const { data, error } = await resend.emails.send({
      from: 'Hadsul Contact Form <onboarding@resend.dev>',
      to: ['allankyagulanyi8@gmail.com'],
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 8px 0; color: #1f2937;">
                  <a href="tel:${phone}" style="color: #059669; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                <td style="padding: 8px 0; color: #1f2937;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted:</td>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #059669; border-radius: 4px;">
              <p style="color: #1f2937; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; font-size: 14px; margin: 0;">
              <strong>Quick Actions:</strong>
            </p>
            <div style="margin-top: 10px;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #059669; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; margin-right: 10px; font-size: 14px;">Reply via Email</a>
              ${phone ? `<a href="tel:${phone}" style="display: inline-block; background-color: #6b7280; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 14px;">Call ${name}</a>` : ''}
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            <em>Contact form submission from Hadsul Website</em>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to send message. Please try again.' 
      }, { status: 500 });
    }

    console.log('Contact email sent successfully:', data);
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you shortly.' 
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}
