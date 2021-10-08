import DataSet from '@antv/data-set';

const data = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
];

const dv = new DataSet().createView().source(data);
dv.transform({
    type: 'reverse',
});

console.log(dv.rows);
/*
[
  { x: 3, y: 3 },
  { x: 2, y: 2 },
  { x: 1, y: 1 }
]
*/
