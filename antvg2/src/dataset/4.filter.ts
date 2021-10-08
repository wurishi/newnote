import DataSet from '@antv/data-set';

const data = [
    { year: 1990, sales: 200 },
    { year: 1992, sales: 100 },
    { year: 1994, sales: 120 },
    { year: 1995, sales: 85 },
];

const dv = new DataSet().createView().source(data);
dv.transform({
    type: 'filter',
    callback: (row) => row.sales < 100,
});

console.log(dv.rows);
// [{ year: 1995, sales: 85 }];
