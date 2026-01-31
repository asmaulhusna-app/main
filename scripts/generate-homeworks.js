import fs from "fs";
import path from "path";
import readline from "readline";

const DIR = "homeworks-files";
const OUT_DIR = "data";
const OUT_FILE = path.join(OUT_DIR, "homeworks.json");
const SITE_BASE = ""; // leave empty for relative paths (best for GitHub Pages)

if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

let previous = [];
if (fs.existsSync(OUT_FILE)) {
  try {
    const raw = fs.readFileSync(OUT_FILE, "utf-8").trim();
    previous = raw ? JSON.parse(raw) : [];
  } catch {
    console.log("⚠️ Broken JSON — reset.");
    previous = [];
  }
}

const filesInDir = fs.readdirSync(DIR).filter(f =>
  fs.statSync(path.join(DIR, f)).isFile()
);

const newFiles = filesInDir.filter(f =>
  !previous.some(p => path.basename(p.url) === f)
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = q => new Promise(res => rl.question(q, res));

(async () => {
  for (const filename of newFiles) {
    const stats = fs.statSync(path.join(DIR, filename));
    const d = stats.birthtime;

    const date =
      `${String(d.getDate()).padStart(2, "0")}.` +
      `${String(d.getMonth() + 1).padStart(2, "0")}.` +
      `${d.getFullYear()}`;

    console.log(`\n📄 ${filename}`);
    const name = await ask("Name: ");
    const description = await ask("Description: ");

    previous.push({
      name: name || filename,
      description: description || "",
      date,
      url: `${SITE_BASE}homeworks-files/${filename}`
    });
  }

  rl.close();

  previous = previous.filter(p =>
    fs.existsSync(path.join(DIR, path.basename(p.url)))
  );

  fs.writeFileSync(OUT_FILE, JSON.stringify(previous, null, 2));
  console.log("\n✅ homeworks.json updated!");
})();
