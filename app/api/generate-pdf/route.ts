import { NextRequest, NextResponse } from 'next/server';
import { generateAssessmentReport } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
    const { 
      qualificationData, 
      pillarScores, 
      overallScore, 
      riskLevel,
      referenceId 
    } = body;

    // Prepare data for PDF generation
    const assessmentData = {
      organisationName: qualificationData.organisationName,
      contactEmail: qualificationData.contactEmail,
      organisationType: qualificationData.organisationType,
      revenueBand: qualificationData.revenueBand,
      teamSize: qualificationData.teamSize,
      decisionAuthority: qualificationData.decisionAuthority,
      overallScore,
      pillarScores,
      riskLevel,
      referenceId: referenceId || `HADSUL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      completionDate: new Date().toLocaleDateString('en-GB'),
    };

    // Generate PDF
    const pdfBytes = await generateAssessmentReport(assessmentData);

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Executive-XRay-Report-${qualificationData.organisationName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    console.error('Request body:', body);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to generate PDF report',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}