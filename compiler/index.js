import { markdownTable } from 'markdown-table';

import { setupFeatures } from './setupFeatures.js';

const table = [['Feature', 'Added Version', 'Description']]
const tableConfig = {
  align: ['l', 'c']
}

await setupFeatures(table);
table.unshift(['Feature', 'Added Version', 'Description']);

const md = markdownTable(table, tableConfig);
console.log(md);