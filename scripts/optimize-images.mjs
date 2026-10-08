import { mkdir, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";

const sourceDirectory = resolve("src/assets/brand");
const outputDirectory = resolve("src/assets/brand-optimized");
const excludedFiles = new Set([
  "logo.jpg",
  "logo_removebg.png",
  "IMG-20260820-WA0143.jpg",
]);

await mkdir(outputDirectory, { recursive: true });
const sourceFiles = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter(entry => entry.isFile())
  .map(entry => entry.name)
  .filter(name => /\.(jpg|jpeg|png)$/i.test(name))
  .filter(name => !excludedFiles.has(name) && !name.startsWith("Sem ti"));

const results = await Promise.all(sourceFiles.map(async sourceName => {
  const sourcePath = join(sourceDirectory, sourceName);
  const outputPath = join(outputDirectory, `${sourceName}.webp`);
  const [sourceInfo, outputInfo] = await Promise.all([
    stat(sourcePath),
    stat(outputPath).catch(() => null),
  ]);

  if (outputInfo && outputInfo.mtimeMs >= sourceInfo.mtimeMs) {
    return { original: sourceInfo.size, optimized: outputInfo.size };
  }

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(outputPath);

  const optimizedInfo = await stat(outputPath);
  return { original: sourceInfo.size, optimized: optimizedInfo.size };
}));

const originalBytes = results.reduce((sum, result) => sum + result.original, 0);
const optimizedBytes = results.reduce((sum, result) => sum + result.optimized, 0);
const savedPercent = originalBytes ? Math.round((1 - optimizedBytes / originalBytes) * 100) : 0;

console.log(`Optimized ${results.length} photos: ${(originalBytes / 1048576).toFixed(1)} MiB -> ${(optimizedBytes / 1048576).toFixed(1)} MiB (${savedPercent}% smaller).`);