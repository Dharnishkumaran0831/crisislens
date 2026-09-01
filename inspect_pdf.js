const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function run() {
  const data = fs.readFileSync('c:/Users/Dharnishkumaran/Downloads/dharnish_resume.pdf');
  const doc = await PDFDocument.load(data);
  const pages = doc.getPages();
  console.log('Number of pages:', pages.length);
  const page = pages[0];
  const { width, height } = page.getSize();
  console.log('Page 0 size:', width, 'x', height);
}

run().catch(console.error);
