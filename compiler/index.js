import { markdownTable } from 'markdown-table';

import { setupFeatures } from './setupFeatures.js';

const table = [['Feature', 'Added Version', 'Last Version', 'Feature Type', 'Description']]
const tableConfig = {
  align: ['l', 'c', 'c']
}

await setupFeatures(table);

const mk = markdownTable(table, tableConfig);
console.log(mk);