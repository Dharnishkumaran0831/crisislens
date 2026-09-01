const fs = require('fs');
const pdf = require('pdf-parse');

function render_page(pageData) {
  let render_options = {
    normalizeWhitespace: true,
    disableCombineTextItems: false
  }

  return pageData.getTextContent(render_options)
  .then(function(textContent) {
    for (let item of textContent.items) {
      if (item.str.trim()) {
        console.log(`Text: "${item.str}" at X: ${item.transform[4].toFixed(2)}, Y: ${item.transform[5].toFixed(2)}`);
      }
    }
    return "";
  });
}

let dataBuffer = fs.readFileSync('c:/Users/Dharnishkumaran/Downloads/dharnish_resume.pdf');

pdf(dataBuffer, { pagerender: render_page }).then(function(data) {
  console.log('Parse complete');
}).catch(console.error);
