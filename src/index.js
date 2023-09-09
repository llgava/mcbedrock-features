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
  await collectFeatures(table);
  await formatJSONFiles();

  table.unshift(tableHeader);

  const MDTable = markdownTable(table, tableConfig);

  const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
  const readmeContent = templateContent.replace('%markdown_feature_table%', MDTable);

  fs.writeFileSync(readmeFilePath, readmeContent);
}

main();
