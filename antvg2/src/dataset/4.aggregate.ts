import DataSet from '@antv/data-set';

const data = [];

for (let i = 0; i < 100; i++) {
    data.push({
        i,
        value: Math.floor(Math.random() * 100),
    });
}
data.push({ i: 10000, value: 0 });

const dv = new DataSet.DataView().source(data);

dv.transform({
    type: 'aggregate', // summary
    fields: ['i', 'i', 'i', 'i', 'i', 'value', 'value', 'i', 'i', 'i', 'i'], // 统计字段集
    operations: [
        'count',
        'max',
        'min',
        'mean',
        'median',
        'mode',
        'product',
        'standardDeviation',
        'sum',
        'sumSimple',
        'variance',
    ], // 统计操作集
    as: [
        'count',
        'max',
        'min',
        'mean',
        'median',
        'mode',
        'product',
        'standardDeviation',
        'sum',
        'sumSimple',
        'variance',
    ], // 存储字段集
    groupBy: [], // 分组字段集
});

console.table(dv.rows);
