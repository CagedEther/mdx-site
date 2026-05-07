/**
 * Sync content files from GitHub (source of truth).
 *
 * Auto-discovers ALL files under src/content/ in the GitHub repo —
 * no hardcoded file list needed. Just add files to GitHub and sync.
 *
 * Run manually:  pnpm sync
 * Runs automatically before: pnpm dev, pnpm build
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const GITHUB_REPO = "CagedEther/mdx-site";
const GITHUB_BRANCH = "main";

/** Directories in the repo to auto-discover and sync */
const CONTENT_DIRS = ["src/content"];

const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;

/** Recursively list all files in a repo directory via the GitHub Contents API */
async function listRepoFiles(dir) {
  const url = `${API_BASE}/contents/${dir}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) {
    throw new Error(`Failed to list ${dir}: ${res.status} ${res.statusText}`);
  }
  const entries = await res.json();
  const files = [];
  for (const entry of entries) {
    if (entry.type === "file") {
      files.push(entry.path);
    } else if (entry.type === "dir") {
      files.push(...(await listRepoFiles(entry.path)));
    }
  }
  return files;
}

async function fetchFile(repoPath) {
  const url = `${RAW_BASE}/${repoPath}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${repoPath}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

async function syncFile(repoPath) {
  const content = await fetchFile(repoPath);
  const localPath = path.join(ROOT, repoPath);
  fs.mkdirSync(path.dirname(localPath), { recursive: true });

  // Only write if content actually changed (avoids unnecessary Vite HMR)
  if (fs.existsSync(localPath)) {
    const existing = fs.readFileSync(localPath, "utf8");
    if (existing === content) return { path: repoPath, status: "unchanged" };
  }

  fs.writeFileSync(localPath, content, "utf8");
  return { path: repoPath, status: "updated" };
}

async function sync() {
  console.log(`\nSyncing content from github.com/${GITHUB_REPO} (${GITHUB_BRANCH})...\n`);

  // Discover all files across all content dirs
  const discovered = (
    await Promise.all(CONTENT_DIRS.map(listRepoFiles))
  ).flat();

  if (discovered.length === 0) {
    console.log("  No files found in content directories.");
    return;
  }

  // Fetch and write all files
  const results = await Promise.allSettled(discovered.map(syncFile));

  let hasErrors = false;
  for (const result of results) {
    if (result.status === "fulfilled") {
      const { path: p, status } = result.value;
      const icon = status === "updated" ? "↓" : "·";
      console.log(`  ${icon} ${p}${status === "updated" ? " (updated)" : ""}`);
    } else {
      console.error(`  ✗ ${result.reason.message}`);
      hasErrors = true;
    }
  }

  console.log(hasErrors ? "\nSync completed with errors.\n" : `\nSync complete. ${discovered.length} files checked.\n`);
  if (hasErrors) process.exit(1);
}

sync();
