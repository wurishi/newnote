import { Chart } from '@antv/g2';

export default function () {
    const data = [
        { year: '2001', population: 41.8 },
        { year: '2002', population: 38 },
        { year: '2003', population: 33.7 },
        { year: '2004', population: 30.7 },
        { year: '2005', population: 25.8 },
        { year: '2006', population: 31.7 },
        { year: '2007', population: 33 },
        { year: '2008', population: 46 },
        { year: '2009', population: 38.3 },
        { year: '2010', population: 28 },
        { year: '2011', population: 42.5 },
        { year: '2012', population: 30.3 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(data);
    chart.coordinate('polar');
    chart.axis(false);
    chart.tooltip({ showMarkers: false });

    chart.interaction('element-highlight');
    chart
        .interval()
        .position('year*population')
        .label('year', { offset: -15 })
        .style({
            lineWidth: 1,
            stroke: '#fff',
        });

    chart.render();
}

export const MENU1 = '7';
export const MENU2 = '3';
export const TITLE = '南丁格尔玫瑰图';
