import DataSet from '@antv/data-set';

const data = [
    { year: 2000, total: 1000 },
    { year: 1999, total: 899 },
    { year: 2001, total: 1004 },
];

const dv = new DataSet.DataView().source(data);
dv.transform({
    type: 'sort',
    callback: (a, b) => a.year - b.year, // 排序依据，和原生 JS 的排序 callback 一致
});

console.log(dv.rows);
