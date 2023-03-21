import * as d3 from 'd3';

function chart(width: number, height: number) {
  const treemap = d3
    .treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .padding((d) => (d.height === 1 ? 1 : 0))
    .round(true);
}

export default async function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log(width, height);

  const data = await (async () => {
    const keys = d3.range(1790, 2000, 10);
    console.log(keys);
    const [regions, states] = await Promise.all([
      (await fetch('/assets/census-regions.csv')).text(),
      (await fetch('/assets/population.tsv')).text(),
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
    regions.forEach(d => console.log(d))
    // const regionByState = new Map(regions.map(d => [d.State, d.Region]));
  })();
}
