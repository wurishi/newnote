import * as d3 from 'd3';
import { getAssetsUrl } from '../utils/proxy';

const duration = 2500;

const formatNumber = d3.format(',d');

export default async function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const data = await (async () => {
    const keys = d3.range(1790, 2000, 10);
    const [regions, states] = await Promise.all([
      (await fetch(getAssetsUrl('/assets/census-regions.csv'))).text(),
      (await fetch(getAssetsUrl('/assets/population.tsv'))).text(),
    ]).then(([regions, states]) => [
      d3.csvParse(regions),
      d3.tsvParse(states, (d, i) =>
        i === 0
          ? null
          : {
            name: d[''],
            values: keys.map((key) => +d[key]!.replace(/,/g, '')),
          }
      ),
    ]);
    const regionByState = new Map(regions.map((d: any) => [d.State, d.Region]));
    const divisionByState = new Map(regions.map((d: any) => [d.State, d.Division]));
    return {
      keys, group: d3.group((states as d3.DSVParsedArray<{ name: string }>), d => regionByState.get(d.name), d => divisionByState.get(d.name))
    }
  })();

  const sums = data.keys.map((d, i) => d3.hierarchy(data.group).sum((d: any) => d.values[i]).value!);

  const max = d3.max(sums)!;

  const color = d3.scaleOrdinal(data.group.keys(), d3.schemeCategory10.map(d => d3.interpolateRgb(d, 'white')(0.5)));

  chart(data);

  function chart(data: any) {
    const treemap = d3
      .treemap()
      .tile(d3.treemapResquarify)
      .size([width, height])
      .padding((d) => (d.height === 1 ? 1 : 0))
      .round(true);

    const root = treemap(d3.hierarchy(data.group))
      .sum((d: any) => Array.isArray(d.values) ? d3.sum(d.values) : 0)
      .sort((a: any, b: any) => b.value - a.value);

    const svg = d3.create('svg')
      .attr('viewBox', `0 -20 ${width} ${height + 20}`)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .style('overflow', 'visible');

    const box = svg.append('g')
      .selectAll('g')
      .data(data.keys.map((key: any, i: any) => {
        const value = root.sum((d: any) => d.values[i]).value!;
        return {
          key, value, i, k: Math.sqrt(value / max)
        }
      }).reverse())
      .join('g')
      .attr('transform', (p: any) => {
        const { k } = p;
        return `translate(${(1 - k) / 2 * width}, ${(1 - k) / 2 * height})`
      })
      .attr('opacity', (p: any) => {
        const { i } = p;
        return i >= 0 ? 1 : 0
      })
      .call(
        g => g.append('text')
        .attr('y', -6)
        .attr('fill', '#777')
        .selectAll('tspan')
        .data((d: any) => {
          const {key, value} = d;
          return [key, `${formatNumber(value)}`]
        })
        .join('tspan')
        .attr('font-weight', (d, i) => i === 0 ? 'bold' : null)
        .text(d => d)
      )
      .call(
        g => g.append('rect')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('width', (d: any) => {
          const {k} = d;
          return k * width;
        })
        .attr('height', (d: any) => {
          const {k} = d;
          return k * height;
        })
      )

      // TODO:
  }
}
