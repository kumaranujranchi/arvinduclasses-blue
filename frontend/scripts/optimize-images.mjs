import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("./public/assets/images");
const SIZE_THRESHOLD_BYTES = 50 * 1024; // 50KB

async function getFilesRecursively(dir) {
  let results = [];
  const list = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const file of list) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(await getFilesRecursively(res));
    } else {
      results.push(res);
    }
  }
  return results;
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function getTargetWidth(filePath) {
  const relativePath = path.relative(IMAGES_DIR, filePath).toLowerCase();
  const filename = path.basename(filePath).toLowerCase();

  // Teachers/Staff headshots (rendered tiny)
  if (relativePath.includes("teachers/") || filename.startsWith("teacher-")) {
    return 400;
  }

  // Course specific thumbnails/covers
  if (relativePath.includes("courses/") || (filename.startsWith("course-") && !filename.includes("banner"))) {
    return 600;
  }

  // Campus gallery (rendered small in grid, slightly larger when clicked)
  if (filename.includes("campus") || relativePath.includes("gallery")) {
    return 800;
  }

  // About sections small widgets
  if (relativePath.includes("about/") && !filename.includes("grid")) {
    return 400;
  }
  
  // About section large grids
  if (relativePath.includes("about/") && filename.includes("grid")) {
    return 800;
  }

  // Side graphics (e.g., girls, testimonials)
  if (filename.startsWith("homepage_girl") || filename.startsWith("testimonial_")) {
    return 500;
  }

  // Full-width banners (homepage backgrounds, footer background, course banners)
  if (filename.includes("homepage") || filename.includes("banner") || filename.includes("footer")) {
    return 1440;
  }

  // Default fallback for other larger assets
  return 1280;
}

async function optimizeImages() {
  console.log(`🚀 Starting Image Optimization (Phase 2: Intelligent Resizing)...`);
  console.log(`📂 Scanning directory: ${IMAGES_DIR}\n`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Error: Images directory not found at ${IMAGES_DIR}`);
    process.exit(1);
  }

  let files;
  try {
    files = await getFilesRecursively(IMAGES_DIR);
  } catch (err) {
    console.error(`❌ Error scanning directory:`, err);
    process.exit(1);
  }

  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp"];
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  console.log(`🔍 Found ${imageFiles.length} total image files.`);
  console.log(`⚡ Filtering for images larger than ${formatBytes(SIZE_THRESHOLD_BYTES)}...\n`);

  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let optimizedCount = 0;
  let skippedCount = 0;

  for (const filePath of imageFiles) {
    const relativePath = path.relative(IMAGES_DIR, filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    let stats;
    try {
      stats = await fs.promises.stat(filePath);
    } catch (err) {
      console.error(`⚠️ Could not get stats for ${relativePath}:`, err.message);
      continue;
    }

    const originalSize = stats.size;
    totalOriginalSize += originalSize;

    if (originalSize < SIZE_THRESHOLD_BYTES) {
      skippedCount++;
      totalNewSize += originalSize;
      continue;
    }

    const targetWidth = getTargetWidth(filePath);
    console.log(`⚙️ Processing: ${relativePath}`);
    console.log(`   - Size: ${formatBytes(originalSize)}`);
    console.log(`   - Target Max Width: ${targetWidth}px`);

    const tempFilePath = `${filePath}.tmp`;

    try {
      // 1. Get current image dimensions
      const metadata = await sharp(filePath).metadata();
      const currentWidth = metadata.width || 0;
      const currentHeight = metadata.height || 0;

      let pipeline = sharp(filePath);

      // 2. Apply resize if the current width exceeds the target width
      if (currentWidth > targetWidth) {
        console.log(`   - Resizing: ${currentWidth}x${currentHeight} ➡️ ${targetWidth}x[Auto]`);
        pipeline = pipeline.resize({
          width: targetWidth,
          withoutEnlargement: true
        });
      } else {
        console.log(`   - Resizing: Skipped (Already ${currentWidth}px wide)`);
      }

      // 3. Apply compression
      if (ext === ".png") {
        pipeline = pipeline.png({
          quality: 75,
          compressionLevel: 9,
          palette: true,
          effort: 10
        });
      } else if (ext === ".webp") {
        pipeline = pipeline.webp({
          quality: 75,
          effort: 6
        });
      } else if (ext === ".jpg" || ext === ".jpeg") {
        pipeline = pipeline.jpeg({
          quality: 75,
          progressive: true,
          mozjpeg: true
        });
      }

      await pipeline.toFile(tempFilePath);

      const tempStats = await fs.promises.stat(tempFilePath);
      const newSize = tempStats.size;

      if (newSize < originalSize) {
        // Replace original with optimized
        await fs.promises.unlink(filePath);
        await fs.promises.rename(tempFilePath, filePath);
        const savedBytes = originalSize - newSize;
        const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
        console.log(`   ✅ Success: ${formatBytes(originalSize)} ➡️ ${formatBytes(newSize)} (Saved ${formatBytes(savedBytes)}, -${savedPercent}%)`);
        totalNewSize += newSize;
        optimizedCount++;
      } else {
        // Temp file is larger, keep original
        await fs.promises.unlink(tempFilePath);
        console.log(`   ℹ️ Skipped: Original size was already better.`);
        totalNewSize += originalSize;
        skippedCount++;
      }
    } catch (err) {
      console.error(`   ❌ Error processing ${relativePath}:`, err.message);
      if (fs.existsSync(tempFilePath)) {
        try { await fs.promises.unlink(tempFilePath); } catch (_) {}
      }
      totalNewSize += originalSize;
      skippedCount++;
    }
    console.log(`--------------------------------------------------`);
  }

  const totalSaved = totalOriginalSize - totalNewSize;
  const totalSavedPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(1);

  console.log(`\n🎉 Optimization Completed!`);
  console.log(`📊 Summary:`);
  console.log(`- Optimized/Resized: ${optimizedCount} images`);
  console.log(`- Skipped/No-change: ${skippedCount} images`);
  console.log(`- Pre-optimized Size: ${formatBytes(totalOriginalSize)}`);
  console.log(`- New Optimized Size: ${formatBytes(totalNewSize)}`);
  console.log(`- Total Space Saved: ${formatBytes(totalSaved)} (-${totalSavedPercent}%)\n`);
}

optimizeImages();
