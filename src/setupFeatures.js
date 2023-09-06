import { glob } from 'glob';
import fs from 'fs';
import JSON5 from 'json5';

import { Feature } from './collectFeatures.js';

const ignoredFiles = [
  "**/node_modules/**",
  "**/feature_rules/*.json",
  "docs.json",
  "package.json"
];

export async function setupFeatures(table) {
  const files = await glob('**/*.json', { ignore: ignoredFiles });
  const addedFeatures = []

  files.sort((x, y) => x.localeCompare(y));

  files.forEach((file) => {
    const rawData = fs.readFileSync(file);
    const data = JSON5.parse(rawData);

    formatFeatureFile(data, file);

    if (file.includes('latest')) return;
    const feature = new Feature(data, file);

    if (addedFeatures.includes(feature.identifier)) return;

    addedFeatures.push(feature.identifier);
    table.push([
      feature.MDLink,
      feature.version,
      feature.description
    ]);
  });
}

function formatFeatureFile(data, path) {
  const formattedJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync(path, formattedJSON, 'utf-8');
}