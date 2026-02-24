import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qualificationData, responses, pillarScores, overallScore } = body;

    // Generate unique reference ID
    const referenceId = `XR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate completion percentage
    const totalQuestions = 25; // 5 pillars × 5 questions each
    const completionPercentage = Math.round((responses.length / totalQuestions) * 100);

    // Determine risk level
    const getRiskLevel = (score: number) => {
      if (score >= 80) return 'Low Risk';
      if (score >= 60) return 'Medium Risk';
      return 'High Risk';
    };

    // Send notification email to Hadsul
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Executive X-Ray™ Assessment Completed</h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Organisation Details</h3>
          <p><strong>Name:</strong> ${qualificationData.organisationName}</p>
          <p><strong>Email:</strong> ${qualificationData.contactEmail}</p>
          <p><strong>Type:</strong> ${qualificationData.organisationType}</p>
          <p><strong>Revenue:</strong> ${qualificationData.revenueBand}</p>
          <p><strong>Team Size:</strong> ${qualificationData.teamSize}</p>
          <p><strong>Authority:</strong> ${qualificationData.decisionAuthority}</p>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Assessment Results</h3>
          <p><strong>Reference ID:</strong> ${referenceId}</p>
          <p><strong>Completion:</strong> ${completionPercentage}%</p>
          <p><strong>Overall Score:</strong> ${overallScore}%</p>
          <p><strong>Risk Level:</strong> ${getRiskLevel(overallScore)}</p>
        </div>

        <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Pillar Breakdown</h3>
          ${pillarScores.map((p: any) => `
            <p><strong>${p.pillar.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}:</strong> ${p.score}%</p>
          `).join('')}
        </div>

        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Next Steps</h3>
          <p>This organisation may require strategic intervention based on their assessment results.</p>
          <p><strong>Recommended Action:</strong> ${overallScore < 60 ? 'Immediate strategic review recommended' : overallScore < 80 ? 'Strategic consultation advised' : 'Monitoring and optimization opportunities'}</p>
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Assessment completed on ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Executive X-Ray™ <noreply@hadsul.co.uk>',
      to: ['allankyagulanyi8@gmail.com'],
      subject: `Executive X-Ray™ Assessment: ${qualificationData.organisationName} - ${getRiskLevel(overallScore)}`,
      html: adminEmailHtml,
    });

    // Send confirmation email to client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Executive X-Ray™ Assessment Complete</h2>
        
        <p>Dear ${qualificationData.organisationName} team,</p>
        
        <p>Thank you for completing the Executive X-Ray™ diagnostic assessment. Your results have been processed and are ready for review.</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Assessment Summary</h3>
          <p><strong>Reference ID:</strong> ${referenceId}</p>
          <p><strong>Overall Governance Score:</strong> ${overallScore}%</p>
          <p><strong>Risk Assessment:</strong> ${getRiskLevel(overallScore)}</p>
          <p><strong>Date Completed:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <p>Based on your results, our team will review your assessment and may reach out to discuss strategic opportunities for your organisation.</p>
        
        <p>This assessment is confidential and will not be shared publicly or used for any purpose other than providing you with strategic insights.</p>
        
        <div style="margin: 30px 0; padding: 20px; background: #fefce8; border-radius: 8px;">
          <p><strong>Next Steps:</strong></p>
          <p>If you would like to discuss your results in detail or explore strategic interventions, please reply to this email or contact us directly.</p>
        </div>
        
        <p>Best regards,<br>
        The Hadsul Strategic Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">
          This is a confidential assessment. Please do not forward or share this email.<br>
          © ${new Date().getFullYear()} Hadsul Ltd. All rights reserved.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Executive X-Ray™ <noreply@hadsul.co.uk>',
      to: [qualificationData.contactEmail],
      subject: 'Your Executive X-Ray™ Assessment Results',
      html: clientEmailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Assessment submitted successfully',
      referenceId 
    });

  } catch (error) {
    console.error('Executive X-Ray submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit assessment' },
      { status: 500 }
    );
  }
}