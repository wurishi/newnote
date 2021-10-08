import DataSet from '@antv/data-set';

const data = [
    { year: 2000, month: 1, total: 1000 },
    { year: 1999, month: 1, total: 899 },
    { year: 2001, month: 1, total: 1004 },
    { year: 2000, month: 2, total: 222 },
    { year: 1999, month: 2, total: 222 },
    { year: 2001, month: 2, total: 222 },
];

const dv = new DataSet.DataView().source(data);
dv.transform({
    type: 'partition', // group groups
    groupBy: ['year'], // 以 year 字段进行分组
    orderBy: ['month'], // 以 month 字段进行排序
});

console.log(dv.rows);

// {
//     "_2000": [
//         {
//             "year": 2000,
//             "month": 1,
//             "total": 1000
//         },
//         {
//             "year": 2000,
//             "month": 2,
//             "total": 222
//         }
//     ],
//     "_1999": [
//         {
//             "year": 1999,
//             "month": 1,
//             "total": 899
//         },
//         {
//             "year": 1999,
//             "month": 2,
//             "total": 222
//         }
//     ],
//     "_2001": [
//         {
//             "year": 2001,
//             "month": 1,
//             "total": 1004
//         },
//         {
//             "year": 2001,
//             "month": 2,
//             "total": 222
//         }
//     ]
// }
