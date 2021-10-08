import DataSet from '@antv/data-set';
import { csvParse, dsvFormat } from 'd3-dsv';
import { isString } from 'lodash';

DataSet.registerConnector(
    'csv',
    (data, options: { delimiter?: string } = {}) => {
        const delimiter = options.delimiter || ',';
        if (!isString(delimiter)) {
            throw new TypeError('Invalid delimiter: must be a string!');
        }
        return dsvFormat(delimiter).parse(data);
    }
);

const testCSV = `Expt,Run,Speed
 1,1,850
 1,2,740
 1,3,900
 1,4,1070`;

const dv = new DataSet.View().source(testCSV, { type: 'csv' });

console.log(dv.rows);
// [
//     {"Expt": " 1","Run": "1","Speed": "850"},
//     {"Expt": " 1","Run": "2","Speed": "740"},
//     {"Expt": " 1","Run": "3","Speed": "900"},
//     {"Expt": " 1","Run": "4","Speed": "1070"}
// ]

DataSet.registerTransform(
    'filter',
    (dv, options: { callback?: Function } = {}) => {
        dv.rows = dv.rows.filter(options.callback || ((row) => !!row));
    }
);

dv.transform({
    type: 'filter',
    callback: (row) => row.Run !== '1',
});

console.log(dv.rows);
// [
//     {"Expt": " 1","Run": "2","Speed": "740"},
//     {"Expt": " 1","Run": "3","Speed": "900"},
//     {"Expt": " 1","Run": "4","Speed": "1070"}
// ]
