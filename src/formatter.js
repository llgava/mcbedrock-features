import fs from 'fs';
import os from 'os';
import { glob } from 'glob';

const ignoredFiles = [
  '**/node_modules/**',
  'docs.json',
  'package.json',
  'package-lock.json',
  '.eslintrc.json',
  '.prettierrc.json',
];

export async function formatJSONFiles() {
  const files = await glob('**/*.json', { ignore: ignoredFiles });
  files.sort((x, y) => x.localeCompare(y));

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const lfToCRLF = content.replace(/\n/g, os.EOL);

    fs.writeFileSync(file, lfToCRLF, 'utf8');
  });
}
