/**
 * PDF project insertion tool.
 * Appends new portfolio project entries directly to the target PDF document.
 */
const fs = require('fs');
const { PDFDocument, PDFName, StandardFonts, rgb } = require('pdf-lib');

async function run() {
  const pdfPath = 'c:/Users/Dharnishkumaran/Downloads/dharnish_resume.pdf';
  const data = fs.readFileSync(pdfPath);
  const doc = await PDFDocument.load(data);
  const page = doc.getPages()[0];
  
  // Cover "Number Guessing Game" section with a white rectangle
  // Y = 330 to 395, X = 30 to 570
  page.drawRectangle({
    x: 30,
    y: 330,
    width: 540,
    height: 65,
    color: rgb(1, 1, 1), // White
  });
  
  // Embed fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  
  // Primary colors
  const colorText = rgb(0.18, 0.18, 0.18); // Dark gray/black
  const colorPrimary = rgb(0.08, 0.4, 0.74); // Theme blue
  
  // 1. Heading
  page.drawText('CareerPilot AI – AI-powered Career Copilot', {
    x: 34.02,
    y: 386.42,
    size: 9.5,
    font: fontBold,
    color: colorText,
  });
  
  page.drawText('2026', {
    x: 542.70,
    y: 386.42,
    size: 9.5,
    font: fontBold,
    color: colorPrimary,
  });
  
  // 2. Technologies
  page.drawText('React · Tailwind CSS · Vite · Framer Motion', {
    x: 34.02,
    y: 374.47,
    size: 8.0,
    font: fontOblique,
    color: colorText,
  });
  
  // 3. Bullet 1
  page.drawText('•', {
    x: 39.00,
    y: 361.52,
    size: 8.5,
    font: fontRegular,
    color: colorText,
  });
  page.drawText('Designed interactive path roadmaps, LeetCode analytics, and ATS resume analyzer.', {
    x: 48.96,
    y: 361.52,
    size: 8.5,
    font: fontRegular,
    color: colorText,
  });
  
  // 4. Bullet 2
  page.drawText('•', {
    x: 39.00,
    y: 348.07,
    size: 8.5,
    font: fontRegular,
    color: colorText,
  });
  page.drawText('Built AI mock interview voice simulator, feedback charts, and placement trackers.', {
    x: 48.96,
    y: 348.07,
    size: 8.5,
    font: fontRegular,
    color: colorText,
  });
  
  // Save PDF
  const modifiedPdfBytes = await doc.save();
  fs.writeFileSync(pdfPath, modifiedPdfBytes);
  console.log('Resume PDF updated successfully with CareerPilot AI!');
}

run().catch(console.error);
