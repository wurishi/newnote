import DataSet from '@antv/data-set';

const data = [
    { year: 2000, total: 1000 },
    { year: 1999, total: 899 },
    { year: 2001, total: 1004 },
];

const dv = new DataSet().createView().source(data);
dv.transform({
    type: 'sort-by', // sortBy
    fields: ['year'], // 根据指定的字段集进行排序，与 lodash 的 sortBy 行为一致
    order: 'DESC', // 默认为 ASC, DESC 则为逆序
});

console.log(dv.rows);
