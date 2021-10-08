import DataSet from '@antv/data-set';

const data = [
    { year: 2000, total: 1000 },
    { year: 1999, total: 899 },
    { year: 2001, total: 1004 },
];

const dv = new DataSet.DataView().source(data);
dv.transform({
    type: 'subset',
    startRowIndex: 1, // 保留行的起始索引
    endRowIndex: 2, // 保留行的结束索引
    fields: ['year'], // 保留字段集
});

console.log(dv.rows);

// [
//     {
//         year: 1999,
//     },
//     {
//         year: 2001,
//     },
// ];
