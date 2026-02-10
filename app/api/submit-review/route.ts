import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('API Route called - processing review submission');
    console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY);
    
    const formData = await request.formData();
    
    const reviewData = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      location: formData.get('location') as string,
      service: formData.get('service') as string,
      rating: formData.get('rating') as string,
      review: formData.get('review') as string,
    };

    console.log('Review data:', reviewData);

    // Create star rating display
    const stars = '⭐'.repeat(parseInt(reviewData.rating));

    // Send email using Resend
    console.log('Attempting to send email via Resend...');
    const { data, error } = await resend.emails.send({
      from: 'Hudsal Reviews <onboarding@resend.dev>',
      to: ['allankyagulanyi8@gmail.com'],
      subject: `New Review Submission - ${reviewData.rating} Stars`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Review Submission
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${reviewData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Role:</td>
                <td style="padding: 8px 0; color: #1f2937;">${reviewData.role}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Location:</td>
                <td style="padding: 8px 0; color: #1f2937;">${reviewData.location}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Service:</td>
                <td style="padding: 8px 0; color: #1f2937;">${reviewData.service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Rating:</td>
                <td style="padding: 8px 0; font-size: 18px;">${stars} (${reviewData.rating}/5)</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">Review:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #059669; border-radius: 4px;">
              <p style="color: #1f2937; line-height: 1.6; margin: 0;">"${reviewData.review}"</p>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
            <em>Submitted from Hadsul Website</em>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error details:', error);
      return NextResponse.json({ 
        success: false, 
        message: `Email service error: ${error.message || 'Unknown error'}`,
        error: error 
      }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, message: 'Review submitted successfully', data });

  } catch (error) {
    console.error('API Route error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}