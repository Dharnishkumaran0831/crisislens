import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve('.output/public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dharnishkumaran R — Full-Stack Developer & IT Engineer Portfolio</title>
    <meta name="description" content="Official portfolio of Dharnishkumaran R, B.Tech Information Technology student at V.S.B. Engineering College." />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body class="bg-background text-foreground">
    <div id="root"></div>
    <script type="module">
      window.location.replace('/');
    </script>
  </body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);
console.log('Successfully created .output/public/index.html for Vercel deployment!');
