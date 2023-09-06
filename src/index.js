import { markdownTable } from 'markdown-table';

import { collectFeatures } from './collectFeatures.js';

const table = []
const tableConfig = {
  align: ['l', 'c']
}

await collectFeatures(table);
table.unshift(['Feature', 'Added Version', 'Description']);

const md = markdownTable(table, tableConfig);
console.log(md);