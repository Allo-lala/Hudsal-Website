import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { readFileSync } from 'fs';
import { join } from 'path';

interface AssessmentData {
  organisationName: string;
  contactEmail: string;
  organisationType: string;
  revenueBand: string;
  teamSize: string;
  decisionAuthority: string;
  overallScore: number;
  pillarScores: Array<{
    pillar: string;
    score: number;
  }>;
  riskLevel: string;
  referenceId: string;
  completionDate: string;
}

export async function generateAssessmentReport(data: AssessmentData): Promise<Uint8Array> {
  try {
    // Load the letterhead PDF from the file system
    const letterheadPath = join(process.cwd(), 'public', 'hadsul.pdf');
    const letterheadBytes = readFileSync(letterheadPath);
    
    // Load the existing PDF
    const pdfDoc = await PDFDocument.load(letterheadBytes);
    
    // Get the first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    
    // Embed fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Define colors
    const emeraldColor = rgb(0.024, 0.588, 0.412); // emerald-600
    const darkGrayColor = rgb(0.2, 0.2, 0.2);
    const grayColor = rgb(0.4, 0.4, 0.4);
    
    // Add content to the PDF (positioning will need to be adjusted based on your letterhead)
    const startY = height - 250; // Move title lower
    let currentY = startY;
    
    // Title - bigger, centered, and lower
    const titleText = 'Executive X-Ray™ Assessment Report';
    const titleWidth = helveticaBoldFont.widthOfTextAtSize(titleText, 28);
    firstPage.drawText(titleText, {
      x: (width - titleWidth) / 2, // Center the title
      y: currentY,
      size: 28, // Bigger size
      font: helveticaBoldFont,
      color: emeraldColor,
    });
    currentY -= 60;
    
    // Score box on the right side (like exam marks)
    const scoreBoxWidth = 200;
    const scoreBoxHeight = 80;
    const scoreBoxX = width - 250; // Position on the right side
    const scoreBoxY = currentY;
    
    // Draw score box border
    firstPage.drawRectangle({
      x: scoreBoxX,
      y: scoreBoxY - scoreBoxHeight,
      width: scoreBoxWidth,
      height: scoreBoxHeight,
      borderColor: emeraldColor,
      borderWidth: 2,
    });
    
    // Overall Score in the box
    const scoreText = `${data.overallScore}%`;
    const scoreTextWidth = helveticaBoldFont.widthOfTextAtSize(scoreText, 32);
    firstPage.drawText(scoreText, {
      x: scoreBoxX + (scoreBoxWidth - scoreTextWidth) / 2, // Center in box
      y: scoreBoxY - 35,
      size: 32,
      font: helveticaBoldFont,
      color: emeraldColor,
    });
    
    const overallText = 'Overall Score';
    const overallTextWidth = helveticaFont.widthOfTextAtSize(overallText, 12);
    firstPage.drawText(overallText, {
      x: scoreBoxX + (scoreBoxWidth - overallTextWidth) / 2, // Center in box
      y: scoreBoxY - 55,
      size: 12,
      font: helveticaFont,
      color: darkGrayColor,
    });
    
    // Risk Assessment in the box
    const riskTextWidth = helveticaBoldFont.widthOfTextAtSize(data.riskLevel, 14);
    firstPage.drawText(data.riskLevel, {
      x: scoreBoxX + (scoreBoxWidth - riskTextWidth) / 2, // Center in box
      y: scoreBoxY - 75,
      size: 14,
      font: helveticaBoldFont,
      color: data.riskLevel === 'High Risk' ? rgb(0.8, 0.2, 0.2) : 
             data.riskLevel === 'Medium Risk' ? rgb(0.8, 0.6, 0.2) : 
             rgb(0.2, 0.6, 0.2),
    });
    
    currentY -= 120;
    
    // Organisation Details Section (as table)
    firstPage.drawText('Organisation Details', {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBoldFont,
      color: darkGrayColor,
    });
    currentY -= 25;
    
    // Draw table for organisation details
    const tableStartY = currentY;
    const tableWidth = 400;
    const rowHeight = 20;
    const col1Width = 120;
    const col2Width = 280;
    
    const orgDetailsData = [
      ['Organisation:', data.organisationName],
      ['Contact:', data.contactEmail],
      ['Type:', data.organisationType],
      ['Revenue Band:', data.revenueBand],
      ['Team Size:', data.teamSize],
      ['Authority Level:', data.decisionAuthority],
    ];
    
    // Draw table borders and content
    orgDetailsData.forEach((row, index) => {
      const rowY = tableStartY - (index * rowHeight);
      
      // Draw row border
      firstPage.drawRectangle({
        x: 70,
        y: rowY - rowHeight,
        width: tableWidth,
        height: rowHeight,
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 0.5,
      });
      
      // Draw column separator
      firstPage.drawLine({
        start: { x: 70 + col1Width, y: rowY },
        end: { x: 70 + col1Width, y: rowY - rowHeight },
        color: rgb(0.8, 0.8, 0.8),
        thickness: 0.5,
      });
      
      // Add text
      firstPage.drawText(row[0], {
        x: 75,
        y: rowY - 14,
        size: 10,
        font: helveticaBoldFont,
        color: darkGrayColor,
      });
      
      firstPage.drawText(row[1], {
        x: 75 + col1Width + 5,
        y: rowY - 14,
        size: 10,
        font: helveticaFont,
        color: darkGrayColor,
      });
    });
    
    currentY -= (orgDetailsData.length * rowHeight) + 30;
    
    // Governance Pillar Breakdown Section (as table)
    firstPage.drawText('Governance Pillar Breakdown', {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBoldFont,
      color: darkGrayColor,
    });
    currentY -= 25;
    
    // Draw table for pillar scores
    const pillarTableStartY = currentY;
    const pillarTableWidth = 400;
    const pillarCol1Width = 300;
    const pillarCol2Width = 100;
    
    data.pillarScores.forEach((pillar, index) => {
      const pillarName = pillar.pillar
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const rowY = pillarTableStartY - (index * rowHeight);
      
      // Draw row border
      firstPage.drawRectangle({
        x: 70,
        y: rowY - rowHeight,
        width: pillarTableWidth,
        height: rowHeight,
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 0.5,
      });
      
      // Draw column separator
      firstPage.drawLine({
        start: { x: 70 + pillarCol1Width, y: rowY },
        end: { x: 70 + pillarCol1Width, y: rowY - rowHeight },
        color: rgb(0.8, 0.8, 0.8),
        thickness: 0.5,
      });
      
      // Add text
      firstPage.drawText(pillarName, {
        x: 75,
        y: rowY - 14,
        size: 10,
        font: helveticaFont,
        color: darkGrayColor,
      });
      
      firstPage.drawText(`${pillar.score}%`, {
        x: 75 + pillarCol1Width + 20,
        y: rowY - 14,
        size: 10,
        font: helveticaBoldFont,
        color: emeraldColor,
      });
    });
    
    currentY -= (data.pillarScores.length * rowHeight) + 30;
    
    // Strategic Observations Section
    firstPage.drawText('Strategic Observations', {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBoldFont,
      color: darkGrayColor,
    });
    currentY -= 25;
    
    const observations = [
      'This assessment provides a structured view of your organisation\'s',
      'governance maturity across five critical pillars.',
      '',
      'Based on your results, targeted interventions may strengthen',
      'operational resilience and strategic alignment.',
      '',
      'For detailed recommendations and strategic consultation,',
      'please contact our advisory team.',
    ];
    
    observations.forEach(line => {
      if (line === '') {
        currentY -= 9;
      } else {
        firstPage.drawText(line, {
          x: 70,
          y: currentY,
          size: 10,
          font: helveticaFont,
          color: grayColor,
        });
        currentY -= 14;
      }
    });
    
    // Footer details moved up below Strategic Observations
    currentY -= 30;
    
    firstPage.drawText(`Reference ID: ${data.referenceId}`, {
      x: 50,
      y: currentY,
      size: 8,
      font: helveticaFont,
      color: grayColor,
    });
    currentY -= 12;
    
    firstPage.drawText(`Assessment Date: ${data.completionDate}`, {
      x: 50,
      y: currentY,
      size: 8,
      font: helveticaFont,
      color: grayColor,
    });
    currentY -= 12;
    
    firstPage.drawText('This report is confidential and proprietary to Hadsul Ltd.', {
      x: 50,
      y: currentY,
      size: 8,
      font: helveticaFont,
      color: grayColor,
    });
    
    firstPage.drawText(`Generated on ${new Date().toLocaleDateString('en-GB')}`, {
      x: width - 150,
      y: currentY,
      size: 8,
      font: helveticaFont,
      color: grayColor,
    });
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      data: {
        organisationName: data.organisationName,
        pillarScoresLength: data.pillarScores?.length || 0
      }
    });
    throw new Error(`Failed to generate PDF report: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}