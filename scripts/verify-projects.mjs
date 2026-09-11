import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const server = await createServer({ root, server: { middlewareMode: true }, appType: "custom" });
try {
  const { projects, projectImages } = await server.ssrLoadModule("/src/components/projectsImages.js");
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length, "Duplicate project ID");
  const photos = projects.flatMap(project => {
    assert.ok(project.title && project.category && project.gallery.length, "Incomplete project");
    assert.equal(project.cover, project.gallery[0], "Cover must belong to its gallery");
    const link = new URL(project.cta.href);
    assert.equal(link.hostname, "wa.me");
    assert.ok(link.searchParams.get("text").includes(project.title), "Missing project-specific message");
    project.gallery.forEach(photo => assert.ok(photo.src && photo.alt, "Missing source or alt"));
    return project.gallery;
  });
  assert.equal(new Set(photos.map(photo => photo.src)).size, photos.length, "Photo assigned more than once");
  assert.equal(projectImages.length, projects.length, "Expected one wall cover per project");
  assert.equal(new Set(projectImages.map(item => item.image)).size, projectImages.length, "Duplicate covers");

  const source = await readFile(new URL("../src/components/projectsImages.js", import.meta.url), "utf8");
  const imported = [...source.matchAll(/assets\/brand\/([^"']+\.(?:jpg|jpeg|png))/g)].map(match => match[1]);
  const files = await readdir(new URL("../src/assets/brand/", import.meta.url));
  const brandAssets = new Set(["logo.jpg", "logo_leao.png", "logo_removebg.png", "IMG-20260820-WA0143.jpg"]);
  const candidates = files.filter(name => /\.(jpg|jpeg|png)$/i.test(name) && !brandAssets.has(name) && !name.startsWith("Sem ti"));
  assert.deepEqual(imported.sort(), candidates.sort(), "Review added, removed or unassigned photographs");
  console.log(`OK: ${projects.length} projects, ${photos.length} photos, unique covers, valid WhatsApp CTAs and current asset inventory.`);
} finally {
  await server.close();
}
