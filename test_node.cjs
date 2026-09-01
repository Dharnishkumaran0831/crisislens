const { PDFParse } = require('pdf-parse/node');
const fs = require('fs');

async function test() {
  console.log('PDFParse class:', PDFParse);
  const data = fs.readFileSync('c:/Users/Dharnishkumaran/Downloads/dharnish_resume.pdf');
  
  // We will instantiate the parser. Since the constructor takes options, let's pass the buffer.
  const parser = new PDFParse(data);
  console.log('Instantiated successfully');
  
  const doc = await parser.load();
  console.log('PDF document loaded successfully, pages:', doc.numPages);
  
  // Let's get the text of page 1:
  const page = await doc.getPage(1);
  const text = await parser.getPageText(page, 1, {});
  console.log('Page 1 Text Length:', text.length);
}

test().catch(console.error);
