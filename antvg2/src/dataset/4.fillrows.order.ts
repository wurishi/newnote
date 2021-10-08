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
    type: 'fill-rows',
    groupBy: ['a'],
    orderBy: ['b'],
    fillBy: 'order',
});

console.log(dv.rows);
/*
 * dv.rows 变为:
 * [
 *   { a: 0, b: 0 }, // 分组1
 *   { a: 0, b: 1 },
 *   { a: 0, b: 2 },
 *   { a: 0, b: 3 }, // 分组1 补充了这行数据，因为全量的序列字段（b）有这个值
 *   { a: 1, b: 0 }, // 分组2 补充了这行数据，因为全量的序列字段（b）有这个值
 *   { a: 1, b: 1 },
 *   { a: 1, b: 2 },
 *   { a: 1, b: 3 },
 *   { a: 2, b: 0 }, // 分组3 缺省数据，根据基准组进行数据补全
 *   { a: 2, b: 1 }, // 这行数据被补充
 *   { a: 2, b: 2 }, // 这行数据被补充
 *   { a: 2, b: 3 }, // 这行数据被补充
 * ]
 */
