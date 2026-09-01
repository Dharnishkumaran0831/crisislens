const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function run() {
  const fileData = fs.readFileSync('c:/Users/Dharnishkumaran/Downloads/dharnish_resume.pdf');
  const uint8Data = new Uint8Array(fileData);
  const parser = new PDFParse(uint8Data);
  const doc = await parser.load();
  const page = await doc.getPage(1);
  const textContent = await page.getTextContent();
  for (const item of textContent.items) {
    if (item.str.trim()) {
      console.log(`Text: "${item.str}" at X: ${item.transform[4].toFixed(2)}, Y: ${item.transform[5].toFixed(2)}`);
    }
  }
}
run().catch(console.error);
