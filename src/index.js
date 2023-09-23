import fs from 'fs';
import path from 'path';
import { markdownTable } from 'markdown-table';

import { collectFeatures } from './collectFeatures.js';
import { formatJSONFiles } from './formatter.js';

const templateFilePath = path.join('src/template/README_TEMPLATE.md');
const readmeFilePath = path.join('README.md');

// Configuratios
const table = [];
const tableHeader = ['Feature', 'Added Version', 'Description'];
const tableConfig = { align: ['l', 'c'] };

async function main() {
  const collectedFeatures = await collectFeatures(table);
  await formatJSONFiles();

  collectedFeatures.features.unshift(tableHeader);
  const percentageCollected = Math.round((collectedFeatures.documented / collectedFeatures.features.length) * 100);

  console.log('Collected: ', collectedFeatures.documented);
  console.log('Total:', collectedFeatures.features.length);
  console.log('Collected percentage:', percentageCollected);

  const MDTable = markdownTable(collectedFeatures.features, tableConfig);

  const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
  const readmeContent = templateContent
    .replace('%collected%', percentageCollected)
    .replace('%markdown_feature_table%', MDTable);

  fs.writeFileSync(readmeFilePath, readmeContent);
}

main();
