import DataSet from '@antv/data-set';

const data = [
    { country: 'USA', gold: 10, silver: 20 },
    { country: 'Canada', gold: 7, silver: 26 },
];

const dv = new DataSet()
    .createView()
    .source(data)
    .transform({
        type: 'fold',
        fields: ['gold', 'silver'], // 展开字段集
        key: 'key', // key 字段名
        value: 'value', // value 字段名
        retains: ['country'], // 保留字段集，默认为除 fields 以外的所有字段
    });

console.table(dv.rows);
/*
 dv.rows 变为
[
  { key: gold, value: 10, country: "USA" },
  { key: silver, value: 20, country: "USA" },
  { key: gold, value: 7, country: "Canada" },
  { key: silver, value: 26, country: "Canada" }
]
 */
