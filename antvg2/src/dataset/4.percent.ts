import DataSet from '@antv/data-set';

const data = [
    { year: 2000, category: 'Intel', sold: 15000 },
    { year: 2000, category: 'AMD', sold: 1800 },
    { year: 2020, category: 'Intel', sold: 150000 },
    { year: 2020, category: 'AMD', sold: 58000 },
];

const dv = new DataSet().createView().source(data);
dv.transform({
    type: 'percent',
    field: 'sold', // 统计销量
    dimension: 'year', // 每年的占比
    groupBy: ['category'], // 以不同产品类别为分组，每个分组内部各自统计占比
    as: 'percent', // 结果存储在 percent 字段
});

console.log(dv.rows);
