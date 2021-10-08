import DataSet from '@antv/data-set';

const data = [
    { x: 1, y: 11 },
    { x: 2, y: 12 },
    { x: 3, y: 13 },
    { x: 4, y: 14 },
    { x: 5, y: 15 },
];

const dv = new DataSet.DataView().source(data);
dv.transform({
    type: 'pick',
    fields: ['x'],
});

console.log(dv.rows);
/*
[
  { x: 1 },
  { x: 2 },
  { x: 3 },
  { x: 4 },
  { x: 5 }
]
*/
