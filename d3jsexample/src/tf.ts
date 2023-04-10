import * as d3 from 'd3';
import data from './d.json';

// console.log(data);

export default function () {
  
}

export function A () {
  const sim = d3
    .forceSimulation()
    .force('charge', d3.forceManyBody())
    .force(
      'link',
      d3.forceLink().id((d: any) => d.id)
    )
    .force('x', d3.forceX())
    .force('y', d3.forceY())
    .on('tick', ticked);

  const div = document.createElement('svg');
  div.style.width = '800px';
  div.style.height = '600px';
  document.body.appendChild(div);
  const width = 800,
    height = 600;
  const svg = d3
    .select('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height]);

  let link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line');

  let node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle');

  function ticked() {
    node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y);
  }

  function update(data: { nodes: any[]; links: any[] }) {
    console.log(data);
    node = node
      .data(data.nodes, (d: any) => d.id)
      .join((enter) =>
        enter
          .append('circle')
          .attr('r', 5)
          .attr('fill', '#00ff00')
          .call((node) => node.append('title').text((d: any) => d.id))
      );

    link = link
      .data(data.links, (d: any) => [d.source, d.target] as any)
      .join('line');

    sim.nodes(data.nodes);
    // sim.force('link').links(data.links);
    sim.alpha(1).restart().tick();
    ticked();
  }

  const nodes = data.nodes.filter((d) => d.start.startsWith('2009-06-04'));
  const links = data.links.filter((d) => d.start.startsWith('2009-06-04'));
  update(data);
}
