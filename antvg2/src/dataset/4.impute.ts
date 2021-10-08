import DataSet from '@antv/data-set';

const data = [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 1, y: 7 },
    { x: 1 },
    { x: 1, y: 9 },
    { x: 2 },
];

const dv = new DataSet.DataView().source(data).transform({
    type: 'impute',
    field: 'y', // 待补全字段
    groupBy: ['x'], // 分组字段集 （传空则不分组）
    method: 'median', // 补全字段值时执行的规则
});

console.table(dv.rows);
/*
 dv.rows 变为
[
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 3 },
  { x: 1, y: 5 },
  { x: 1, y: 6 },
  { x: 1, y: 7 },
  { x: 1, y: 7 },
  { x: 1, y: 9 },
  { x: 2, y: 9 }
]
 */