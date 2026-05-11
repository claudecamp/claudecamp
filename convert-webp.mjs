import sharp from 'sharp';
import { statSync } from 'fs';
import { join, extname, basename } from 'path';

const ASSETS = 'assets';

// maxW = max width in px before downscaling (height scales proportionally)
const IMAGES = [
  // Hero / full-bleed — keep wide for large screens
  { file: 'the-moment-laptop-steam.jpg', maxW: 1920, quality: 82 },
  { file: 'hero.jpg',                    maxW: 1920, quality: 82 },
  // Section backgrounds / place photos
  { file: 'hot-springs-dawn-mist.jpg',   maxW: 1600, quality: 82 },
  { file: 'hot-springs-dawn-mist3.jpg',  maxW: 1200, quality: 80 },
  { file: 'community-night-table.jpg',   maxW: 1600, quality: 82 },
  { file: 'arrival-dusk-wide.jpg',       maxW: 1600, quality: 82 },
  { file: 'bamboo-bungalow.png',         maxW: 1200, quality: 82 },
  // Excursion cards — displayed at ~400px, 2x retina = 800px
  { file: 'Buddhist_monk.jpg',           maxW: 900,  quality: 80 },
  { file: 'pai-canyon.jpg',              maxW: 900,  quality: 80 },
  { file: 'pai-canyon-trails.jpg',       maxW: 900,  quality: 80 },
  { file: 'tham-lot-cave.jpg',           maxW: 900,  quality: 80 },
  { file: 'thai-cooking.jpg',            maxW: 900,  quality: 80 },
  { file: 'krathong-closing-ceremony.jpg', maxW: 900, quality: 80 },
];

let totalSavedKB = 0;

for (const { file, maxW, quality } of IMAGES) {
  const src = join(ASSETS, file);
  const dest = join(ASSETS, basename(file, extname(file)) + '.webp');
  try {
    const before = statSync(src).size;
    await sharp(src)
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality })
      .toFile(dest);
    const after = statSync(dest).size;
    const savedKB = ((before - after) / 1024).toFixed(0);
    totalSavedKB += (before - after) / 1024;
    console.log(`✓ ${file} → ${basename(dest)}  (${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB, saved ${savedKB}KB)`);
  } catch (e) {
    console.log(`✗ ${file}: ${e.message}`);
  }
}

console.log(`\nTotal saved: ${(totalSavedKB / 1024).toFixed(1)} MB`);
