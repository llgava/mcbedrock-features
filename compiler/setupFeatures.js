import { glob } from 'glob';
import fs from 'fs';
import JSON from 'json5';

import { Feature } from './collectFeatures.js';

const ignoredFiles = [
  "**/node_modules/**",
  "**/latest/**",
  "**/feature_rules/**",
  "docs.json",
  "package.json"
];

export async function setupFeatures(table) {
  const files = await glob('**/*.json', { ignore: ignoredFiles });

  files.sort((x, y) => x.localeCompare(y));

  files.forEach((file) => {
    const rawData = fs.readFileSync(file);
    const data = JSON.parse(rawData);

    const feature = new Feature(data, file);

    table.push([
      feature.MDLink,
      feature.version,
      feature.lastVersion,
      feature.type,
      feature.description
    ]);
  });
}