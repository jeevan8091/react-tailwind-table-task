// src/iconReplacer.js
// Simple script to replace inline SVG icons with react-icons components based on className heuristics.
import fs from 'fs';
import path from 'path';
import globby from 'globby';

// Directories to scan
// Directories to scan (excluding assets and logo files)
const scanDirs = [
  'src/components',
  'src/pages',
  'src/projects',
  'src/routes',
  'src/Layout',
  'src/sidebar',
  'src/dashboard',
];

// Helper to determine if a file should be processed
function shouldProcess(filePath) {
  const lowered = filePath.toLowerCase();
  // Exclude assets folder and any file containing 'logo' in its name
  return !lowered.includes('/assets/') && !lowered.includes('logo');
}


// Mapping from className pattern (regex) to { component, importPath }
// Expanded mapping according to user‑approved list
const iconMap = [
  { pattern: /h-3\.5 w-3\.5 flex-shrink-0/, component: 'HiOutlinePencilAlt', importPath: 'react-icons/hi' }, // Edit
  { pattern: /h-7 w-7/, component: 'MdDeleteForever', importPath: 'react-icons/md' }, // Delete
  { pattern: /w-4\.5 h-4\.5 text-slate-400/, component: 'FiSearch', importPath: 'react-icons/fi' }, // Search
  { pattern: /h-5 w-5(?!.*mr-1)/, component: 'FiEye', importPath: 'react-icons/fi' }, // View (Eye)
  { pattern: /h-4 w-4/, component: 'FiSettings', importPath: 'react-icons/fi' }, // Settings
  { pattern: /h-6 w-6/, component: 'FiHome', importPath: 'react-icons/fi' }, // Home/Dashboard
  { pattern: /h-5 w-5 mr-1/, component: 'FiFolder', importPath: 'react-icons/fi' }, // Folder/Projects
  { pattern: /h-5 w-5/, component: 'FiUser', importPath: 'react-icons/fi' }, // User (fallback generic)
  { pattern: /h-5 w-5/, component: 'FiPlus', importPath: 'react-icons/fi' }, // Add (generic plus)
];

function ensureImport(content, importPath, component) {
  const importRegex = new RegExp(`import\\s+\{[^}]*${component}[^}]*\}\\s+from\\s+['"]${importPath}['"];?`);
  if (importRegex.test(content)) return content;
  const lines = content.split('\n');
  let insertIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i])) insertIdx = i + 1;
  }
  const importLine = `import { ${component} } from '${importPath}';`;
  lines.splice(insertIdx, 0, importLine);
  return lines.join('\n');
}

let reportEntries = [];

function replaceSvg(content, mapping, filePath) {
  const { pattern, component, importPath } = mapping;
  // Match <svg ... className="..." ...>...</svg>
  const svgRegex = new RegExp(`<svg([^>]*?)className=["']([^"']*)${pattern.source}([^"']*)["']([^>]*)>([\s\S]*?)</svg>`, 'g');
  let modified = false;
  const newContent = content.replace(svgRegex, (match, pre1, class1, class2, pre2, inner) => {
    // Preserve other attributes (stroke, fill, aria-*, title, style)
    const otherAttrs = `${pre1} ${pre2}`.trim();
    const attrs = otherAttrs ? ' ' + otherAttrs : '';
    modified = true;
    // Record report entry (old snippet trimmed to first line)
    const oldSnippet = match.replace(/\s+/g, ' ').trim();
    reportEntries.push({ file: filePath, old: oldSnippet, new: component });
    return `<${component}${attrs} />`;
  });
  return { newContent, modified };
}

async function processFile(filePath) {
  // Skip files that should not be processed (assets, logos)
  if (!shouldProcess(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let fileModified = false;
  for (const mapping of iconMap) {
    const { newContent, modified } = replaceSvg(content, mapping, filePath);
    if (modified) {
      content = newContent;
      fileModified = true;
      // Ensure import for this component
      content = ensureImport(content, mapping.importPath, mapping.component);
    }
  }
  if (fileModified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

(async () => {
  const patterns = scanDirs.map(dir => `${dir}/**/*.{js,jsx}`);
  const files = await globby(patterns);
  for (const file of files) {
    await processFile(file);
  }
  console.log('Icon replacement finished.');
  // Write markdown report
  const reportLines = ['| File | Old Icon | New React Icon |', '|------|----------|----------------|'];
  for (const entry of reportEntries) {
    const relPath = entry.file.replace(/^.*src\//, 'src/');
    reportLines.push(`| ${relPath} | ${entry.old} | ${entry.new} |`);
  }
  const reportContent = reportLines.join('\n');
  fs.writeFileSync(path.join(process.cwd(), 'icon-modernization-report.md'), reportContent, 'utf8');
  console.log('Report written to icon-modernization-report.md');
})();

