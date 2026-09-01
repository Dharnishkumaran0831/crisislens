const fs = require('fs');
const { PDFDocument, PDFName, PDFString, StandardFonts, rgb } = require('pdf-lib');

async function run() {
  const pdfPath = 'c:/Users/Dharnishkumaran/Downloads/dharnish_resume.pdf';
  const data = fs.readFileSync(pdfPath);
  const doc = await PDFDocument.load(data);
  const page = doc.getPages()[0];
  
  // Extract original URIs
  const annots = page.node.lookup(PDFName.of('Annots'));
  let linkedinUri = 'https://linkedin.com';
  let githubUri = 'https://github.com';
  let leetcodeUri = 'https://leetcode.com';
  
  if (annots) {
    if (annots.size() > 1) {
      const a1 = annots.lookup(1).lookup(PDFName.of('A'));
      if (a1) linkedinUri = a1.lookup(PDFName.of('URI')).value || a1.lookup(PDFName.of('URI')).toString();
    }
    if (annots.size() > 2) {
      const a2 = annots.lookup(2).lookup(PDFName.of('A'));
      if (a2) githubUri = a2.lookup(PDFName.of('URI')).value || a2.lookup(PDFName.of('URI')).toString();
    }
    if (annots.size() > 3) {
      const a3 = annots.lookup(3).lookup(PDFName.of('A'));
      if (a3) leetcodeUri = a3.lookup(PDFName.of('URI')).value || a3.lookup(PDFName.of('URI')).toString();
    }
  }
  
  console.log('Original URIs:');
  console.log('LinkedIn:', linkedinUri);
  console.log('GitHub:', githubUri);
  console.log('LeetCode:', leetcodeUri);
  
  // Draw white rectangle to cover the old line
  page.drawRectangle({
    x: 50,
    y: 775,
    width: 500,
    height: 18,
    color: rgb(1, 1, 1), // White
  });
  
  // Embed font
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontSize = 9.5;
  
  // Define parts
  const parts = [
    { text: 'Portfolio', url: 'https://dharnish-portfolio-six.vercel.app', isLink: true },
    { text: '  —  ', isLink: false },
    { text: 'LinkedIn', url: linkedinUri, isLink: true },
    { text: '  —  ', isLink: false },
    { text: 'GitHub', url: githubUri, isLink: true },
    { text: '  —  ', isLink: false },
    { text: 'LeetCode', url: leetcodeUri, isLink: true }
  ];
  
  // Calculate total width
  let totalWidth = 0;
  for (const part of parts) {
    part.width = font.widthOfTextAtSize(part.text, fontSize);
    totalWidth += part.width;
  }
  
  const pageWidth = page.getSize().width;
  const startX = (pageWidth - totalWidth) / 2;
  const yPos = 780.139; // Original Y base alignment
  
  // Draw text parts and collect link rects
  let currentX = startX;
  const newLinks = [];
  
  for (const part of parts) {
    if (part.isLink) {
      // Draw link text in blue
      page.drawText(part.text, {
        x: currentX,
        y: yPos,
        size: fontSize,
        font: font,
        color: rgb(0.08, 0.4, 0.74), // Professional link blue
      });
      // Store link coordinates
      newLinks.push({
        url: part.url,
        rect: [currentX - 1, yPos - 2, currentX + part.width + 1, yPos + fontSize + 2]
      });
    } else {
      // Draw separator in dark gray/black
      page.drawText(part.text, {
        x: currentX,
        y: yPos,
        size: fontSize,
        font: font,
        color: rgb(0.2, 0.2, 0.2),
      });
    }
    currentX += part.width;
  }
  
  // Build new annotations array
  const newAnnotsArray = doc.context.obj([]);
  
  // Keep original email annotation (Annot 0)
  if (annots && annots.size() > 0) {
    newAnnotsArray.push(annots.get(0));
  }
  
  // Add new link annotations
  for (const link of newLinks) {
    const linkAnnot = doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: link.rect,
      Border: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(link.url),
      },
    });
    newAnnotsArray.push(linkAnnot);
  }
  
  // Set new annotations on page
  page.node.set(PDFName.of('Annots'), newAnnotsArray);
  
  // Save PDF
  const modifiedPdfBytes = await doc.save();
  fs.writeFileSync(pdfPath, modifiedPdfBytes);
  console.log('PDF modified successfully!');
}

run().catch(console.error);
