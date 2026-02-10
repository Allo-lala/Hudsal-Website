import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Newsletter API called');
    
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    console.log('Newsletter subscription for:', email);

    // Send confirmation email to subscriber
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: 'Hadsul Newsletter <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Hadsul Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; margin-bottom: 10px;">Welcome to Hudsal Newsletter!</h1>
            <p style="color: #6b7280; font-size: 16px;">Thank you for subscribing to our healthcare updates</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-bottom: 15px;">What to Expect:</h2>
            <ul style="color: #1f2937; line-height: 1.8; padding-left: 20px;">
              <li>Latest healthcare industry Opportunities news and insights</li>
              <li>Updates on our services and new offerings</li>
              <li>Healthcare tips and best practices</li>
              <li>Company news and announcements</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; margin-bottom: 15px;">Stay connected with us:</p>
            <div style="display: flex; justify-content: center; gap: 15px;">
              <a href="https://www.linkedin.com/company/hadsul" style="color: #059669; text-decoration: none;">LinkedIn</a>
              <a href="https://www.facebook.com/hadsulltd" style="color: #059669; text-decoration: none;">Facebook</a>
              <a href="https://x.com/hadsulltd" style="color: #059669; text-decoration: none;">Twitter Formely X</a>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            <em>You're receiving this because you subscribed to Hadsul Newsletter</em><br>
            <a href="mailto:info@hadsul.co.uk" style="color: #059669;">Contact us</a> if you have any questions
          </p>
        </div>
      `,
    });

    // Send notification to admin
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: 'Hadsul Newsletter <onboarding@resend.dev>',
      to: ['allankyagulanyi8@gmail.com'],
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Newsletter Subscription
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; font-size: 16px; margin: 0;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
              Subscribed on: ${new Date().toLocaleString()}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            <em>Newsletter subscription from Hadsul Website</em>
          </p>
        </div>
      `,
    });

    if (confirmationError || notificationError) {
      console.error('Email errors:', { confirmationError, notificationError });
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to send confirmation email' 
      }, { status: 500 });
    }

    console.log('Newsletter emails sent successfully');
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}