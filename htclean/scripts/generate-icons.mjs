import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-icon-temp.png', size: 180 },
  { name: 'favicon.png', size: 32 },
];

async function generateIcons() {
  const inputImage = 'public/apple-icon.png';
  
  // Generate PNG icons
  for (const { name, size } of sizes) {
    await sharp(inputImage)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(`public/${name}`);
    console.log(`Generated ${name} (${size}x${size})`);
  }

  // Rename the temporary apple icon
  await fs.rename('public/apple-icon-temp.png', 'public/apple-icon.png');
}

generateIcons().catch(console.error); 