const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');
const outPath = path.join(root, 'config.js');

if (!fs.existsSync(envPath)) {
  console.error('Missing .env file. Copy .env.example to .env and add your access key.');
  process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf8');
const match = env.match(/^\s*WEB3FORMS_ACCESS_KEY\s*=\s*(.+)\s*$/m);

if (!match || !match[1].trim()) {
  console.error('.env must define WEB3FORMS_ACCESS_KEY=your_key');
  process.exit(1);
}

const key = match[1].trim().replace(/^["']|["']$/g, '');

fs.writeFileSync(
  outPath,
  `// Auto-generated from .env — do not edit manually\nwindow.WEB3FORMS_ACCESS_KEY = ${JSON.stringify(key)};\n`,
  'utf8'
);

console.log('Created config.js from .env');
