const fs = require('fs');
const content = fs.readFileSync('c:/Users/Dharnishkumaran/Downloads/Dharnishkumaran R - Reactive Resume.html', 'utf8');

const regex = /MediChain/gi;
let match;
const matches = [];

while ((match = regex.exec(content)) !== null) {
  matches.push({
    index: match.index,
    text: content.substring(match.index - 50, match.index + 100)
  });
}

console.log('Found matches:', matches.length);
matches.forEach((m, i) => {
  console.log(`Match ${i}: offset ${m.index}\nContext: ${m.text}\n`);
});
