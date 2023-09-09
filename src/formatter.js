import fs from 'fs';
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
    const lines = content.split('\n');
    const fixedContent = lines
      .map((line, i) => {
        if (i == lines.length - 1) return line;
        return line + '\r';
      })
      .join('');

    fs.writeFileSync(file, fixedContent, 'utf8');
  });
}
