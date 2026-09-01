const fs = require('fs');
const { PDFDocument, PDFName } = require('pdf-lib');

async function run() {
  const data = fs.readFileSync('c:/Users/Dharnishkumaran/Downloads/dharnish_resume.pdf');
  const doc = await PDFDocument.load(data);
  const page = doc.getPages()[0];
  
  const annots = page.node.lookup(PDFName.of('Annots'));
  if (!annots) {
    console.log('No annotations found');
    return;
  }
  
  for (let i = 0; i < annots.size(); i++) {
    const annot = annots.lookup(i);
    const rect = annot.lookup(PDFName.of('Rect'));
    const a = annot.lookup(PDFName.of('A'));
    let uri = '';
    if (a) {
      const uriObj = a.lookup(PDFName.of('URI'));
      if (uriObj) {
        uri = uriObj.value || uriObj.toString();
      }
    }
    console.log(`Annotation ${i}: Rect = ${rect}, URI = ${uri}`);
  }
}
run().catch(console.error);
