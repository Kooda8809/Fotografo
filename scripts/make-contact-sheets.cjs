const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const catalogPath = path.join(__dirname, '..', 'public', 'images', 'real', 'full-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const outputDir = path.join(__dirname, '..', 'public', 'images', 'audit');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function createContactSheets() {
  const perSheet = 16; // 4x4 grid
  const thumbSize = 350;
  const numSheets = Math.ceil(catalog.length / perSheet);

  console.log(`Generating ${numSheets} contact sheets for ${catalog.length} photos...`);

  for (let s = 0; s < numSheets; s++) {
    const start = s * perSheet;
    const end = Math.min(start + perSheet, catalog.length);
    const slice = catalog.slice(start, end);

    const composites = [];

    for (let i = 0; i < slice.length; i++) {
      const item = slice[i];
      const col = i % 4;
      const row = Math.floor(i / 4);
      const left = col * thumbSize;
      const top = row * thumbSize;

      const imgPath = path.join(__dirname, '..', 'public', item.webpFile);

      // Resize thumbnail
      const thumbBuf = await sharp(imgPath)
        .resize(thumbSize - 8, thumbSize - 8, { fit: 'cover' })
        .toBuffer();

      // SVG badge with photo index and ID
      const svgLabel = `
        <svg width="${thumbSize - 8}" height="${thumbSize - 8}">
          <rect x="0" y="0" width="120" height="36" fill="rgba(0,0,0,0.85)" rx="4"/>
          <text x="8" y="24" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffff00">#${item.index}</text>
          <text x="56" y="24" font-family="sans-serif" font-size="14" fill="#ffffff">${item.id}</text>
        </svg>
      `;

      const thumbWithLabel = await sharp(thumbBuf)
        .composite([{ input: Buffer.from(svgLabel), top: 0, left: 0 }])
        .toBuffer();

      composites.push({
        input: thumbWithLabel,
        left: left + 4,
        top: top + 4
      });
    }

    const sheetHeight = Math.ceil(slice.length / 4) * thumbSize;
    const sheetWidth = 4 * thumbSize;

    const sheetFile = path.join(outputDir, `sheet-${s + 1}.jpg`);

    await sharp({
      create: {
        width: sheetWidth,
        height: sheetHeight,
        channels: 3,
        background: { r: 24, g: 24, b: 24 }
      }
    })
      .composite(composites)
      .jpeg({ quality: 85 })
      .toFile(sheetFile);

    console.log(`Saved sheet ${s + 1}/${numSheets} to ${sheetFile}`);
  }

  console.log('All contact sheets generated successfully!');
}

createContactSheets().catch(console.error);
