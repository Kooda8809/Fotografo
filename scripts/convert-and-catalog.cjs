const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '..', 'IMAGENS REAIS');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'real');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  const files = fs.readdirSync(sourceDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return false;
    if (f.includes('LOGO REAL') || f.includes('Carlota foto real')) return false;
    return true;
  });

  console.log(`Found ${files.length} real photos in "${sourceDir}"`);

  // Sort files for deterministic naming
  files.sort();

  const catalog = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const sourceFilePath = path.join(sourceDir, file);
    const idNum = String(i + 1).padStart(3, '0');
    const webpFilename = `session-real-${idNum}.webp`;
    const targetFilePath = path.join(targetDir, webpFilename);

    try {
      const metadata = await sharp(sourceFilePath).metadata();
      const origSize = fs.statSync(sourceFilePath).size;

      // Determine aspect ratio
      const width = metadata.width || 800;
      const height = metadata.height || 600;
      const ratio = width / height;

      let aspectRatio = 'aspect-[4/5]';
      if (ratio > 1.4) aspectRatio = 'aspect-[16/10]';
      else if (ratio > 1.15) aspectRatio = 'aspect-[4/3]';
      else if (ratio >= 0.9 && ratio <= 1.1) aspectRatio = 'aspect-square';
      else if (ratio < 0.7) aspectRatio = 'aspect-[9/16]';
      else aspectRatio = 'aspect-[3/4]';

      // Convert to WebP with max 1800px width/height and quality 85
      await sharp(sourceFilePath)
        .rotate() // auto-orient based on EXIF
        .resize({
          width: 1800,
          height: 1800,
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85, effort: 4 })
        .toFile(targetFilePath);

      const webpSize = fs.statSync(targetFilePath).size;

      catalog.push({
        id: `real-${idNum}`,
        index: i + 1,
        originalFile: file,
        webpFile: `/images/real/${webpFilename}`,
        width,
        height,
        ratio: Number(ratio.toFixed(2)),
        aspectRatio,
        originalSizeKB: Math.round(origSize / 1024),
        webpSizeKB: Math.round(webpSize / 1024)
      });

      if ((i + 1) % 15 === 0 || i === files.length - 1) {
        console.log(`Processed ${i + 1}/${files.length} images...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  const catalogPath = path.join(targetDir, 'full-catalog.json');
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`Successfully converted ${catalog.length} photos! Catalog saved to ${catalogPath}`);
}

run().catch(console.error);
