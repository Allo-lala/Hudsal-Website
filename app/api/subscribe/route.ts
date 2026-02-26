import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Subscription API called');
    
    const subscriptionData = await request.json();
    const { name, email, address, company, designation, registrationNumber, productName, productDescription } = subscriptionData;

    if (!name || !email || !address || !company || !designation || !registrationNumber || !productName) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      }, { status: 400 });
    }

    console.log('Subscription submission for:', productName, 'from:', email);

    // Send email to admin with subscription details
    const { data, error } = await resend.emails.send({
      from: 'Hadsul Subscriptions <onboarding@resend.dev>',
      to: ['allankyagulanyi8@gmail.com'],
      replyTo: email,
      subject: `New Subscription: ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Product Subscription
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin-top: 0;">Product Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 180px;">Product:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${productName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Description:</td>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${productDescription}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <h3 style="color: #374151; margin-top: 0;">Subscriber Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 180px;">Full Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Address:</td>
                <td style="padding: 8px 0; color: #1f2937;">${address}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Company/Organization:</td>
                <td style="padding: 8px 0; color: #1f2937;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Designation:</td>
                <td style="padding: 8px 0; color: #1f2937;">${designation}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Registration Number:</td>
                <td style="padding: 8px 0; color: #1f2937;">${registrationNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted:</td>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; font-size: 14px; margin: 0;">
              <strong>Quick Actions:</strong>
            </p>
            <div style="margin-top: 10px;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #059669; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; margin-right: 10px; font-size: 14px;">Contact Subscriber</a>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            <em>Subscription request from Hadsul Website</em>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to submit subscription. Please try again.' 
      }, { status: 500 });
    }

    console.log('Subscription email sent successfully:', data);
    return NextResponse.json({ 
      success: true, 
      message: 'Subscription submitted successfully! Our team will contact you shortly.' 
    });

  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}
