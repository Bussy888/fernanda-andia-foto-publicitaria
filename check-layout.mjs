import assert from 'node:assert/strict';
import fs from 'node:fs';
import {layoutRows} from './src/gallery-layout.js';
const photos=JSON.parse(fs.readFileSync(new URL('./photos.json',import.meta.url)));
for(const width of [288,320,375,480,600,768,960,1200,1440]) {
 for(const letter of ['a','b','c','d','e','f']) {
  const items=photos.filter(p=>p.source.startsWith(letter));
  const rows=layoutRows(items,width);
  assert.deepEqual(rows.flatMap(row=>row.items.map(p=>p.id)),items.map(p=>p.id),'Order and count');
  for(const row of rows){
   assert.ok(row.height>0 && row.height<=420.001,'Bounded image height');
   assert.ok(row.width<=width+0.001,'No horizontal overflow');
   const sum=row.items.reduce((n,p)=>n+row.height*p.width/p.height,0)+row.gap*(row.items.length-1);
   assert.ok(Math.abs(sum-row.width)<0.001,'Natural aspect ratios fit row exactly');
  }
 }
}
console.log('54 collection/viewport combinations passed: order, counts, proportions and width.');
