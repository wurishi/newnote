import DataSet from '@antv/data-set';

const data = [
    { a: 0, b: 0 },
    { a: 0, b: 1 },
    { a: 0, b: 2 },
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 1, b: 3 },
    { a: 2, b: 0 },
];

const dv = new DataSet.DataView().source(data).transform({
    type: 'fill-rows', // fillRows
    groupBy: ['a'],
    orderBy: ['b'],
    fillBy: 'group', // 默认为 group, 可选值为 order
});

console.log(dv.rows);
/*
 * dv.rows 变为:
 * [
 *   { a: 0, b: 0 }, // 分组1 作为第一个序列字段最全（b）的组，被选为基准
 *   { a: 0, b: 1 },
 *   { a: 0, b: 2 },
 *   { a: 1, b: 1 }, // 分组2 序列字段个数和基准组一致，所以不补充数据
 *   { a: 1, b: 2 },
 *   { a: 1, b: 3 },
 *   { a: 2, b: 0 }, // 分组3 缺省数据，根据基准组进行数据补全
 *   { a: 2, b: 1 }, // 这行数据被补充
 *   { a: 2, b: 2 }, // 这行数据被补充
 * ]
 */
