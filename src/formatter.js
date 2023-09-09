import fs from 'fs';
import JSON5 from 'json5';
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
    const rawData = fs.readFileSync(file, 'utf8');
    const data = JSON5.parse(rawData);

    const formattedJSON = JSON.stringify(data, null, 2);
    fs.writeFileSync(file, formattedJSON, { encoding: 'utf8' });
  });
}
