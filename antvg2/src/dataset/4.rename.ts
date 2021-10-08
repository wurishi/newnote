import DataSet from '@antv/data-set';

const data = [{ a: 1, b: 2 }];
const dv = new DataSet().createView().source(data);
dv.transform({
    type: 'rename', // rename-fields
    map: {
        a: 'x',
        b: 'y',
    },
});

console.log(dv.rows);
// [ { x: 1, y: 2 } ]
