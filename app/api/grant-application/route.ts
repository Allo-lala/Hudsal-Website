import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      role,
      email,
      organizationName,
      isRegistered,
      budget,
      countryOfOperation,
      previousFunding,
      previousFundingDetails,
    } = body;

    // Validate required fields
    if (!name || !role || !email || !organizationName || !isRegistered || !budget || !countryOfOperation || !previousFunding) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled.' },
        { status: 400 }
      );
    }

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Grant Application</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { margin-bottom: 25px; }
            .section h3 { color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-bottom: 15px; }
            .field { margin-bottom: 12px; }
            .field strong { color: #374151; }
            .highlight { background: #ecfdf5; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1> New Grant Application Received</h1>
              <p>A new grant application has been submitted through your website</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h3>Personal Information</h3>
                <div class="field"><strong>Name:</strong> ${name}</div>
                <div class="field"><strong>Role/Position:</strong> ${role}</div>
                <div class="field"><strong>Email:</strong> ${email}</div>
              </div>

              <div class="section">
                <h3>Organization Information</h3>
                <div class="field"><strong>Organization Name:</strong> ${organizationName}</div>
                <div class="field"><strong>Registration Status:</strong> ${isRegistered}</div>
                <div class="field"><strong>Country of Operation:</strong> ${countryOfOperation}</div>
              </div>

              <div class="section">
                <h3>Project Information</h3>
                <div class="field"><strong>Requested Budget:</strong> ${budget}</div>
                <div class="field"><strong>Previous Funding:</strong> ${previousFunding}</div>
                ${previousFunding === 'yes' && previousFundingDetails ? `
                  <div class="highlight">
                    <strong>Previous Funding Details:</strong><br>
                    ${previousFundingDetails.replace(/\n/g, '<br>')}
                  </div>
                ` : ''}
              </div>

              <div class="footer">
                <p>This application was submitted on ${new Date().toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p>Please review and respond to the applicant promptly.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: 'Hadsul Website <noreply@hadsul.co.uk>',
      to: ['info@hadsul.co.uk'],
      subject: `New Grant Application from ${name} - ${organizationName}`,
      html: htmlContent,
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Grant application submitted successfully!',
    });

  } catch (error) {
    console.error('Grant application API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}