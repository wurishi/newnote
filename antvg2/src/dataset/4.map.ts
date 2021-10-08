import DataSet from '@antv/data-set';

const data = [
    { x: 'a', y: 1 },
    { x: 'b', y: 11 },
    { x: 'c', y: 21 },
];

const dv = new DataSet.DataView().source(data);
dv.transform({
    type: 'map',
    callback: (row) => ({ ...row, z: 'z' }),
});

console.log(dv.rows);

// [
//     { x: 'a', y: 1, z: 'z' },
//     { x: 'b', y: 11, z: 'z' },
//     { x: 'c', y: 21, z: 'z' },
// ]
