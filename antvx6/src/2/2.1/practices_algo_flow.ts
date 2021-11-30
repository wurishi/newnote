import { Graph, Node, Platform, Dom } from '@antv/x6';

export default function () {
    Graph.registerNode(
        'algo-node',
        {
            inherit: 'rect',
            attrs: {
                body: {
                    strokeWidth: 1,
                    stroke: '#108ee9',
                    fill: '#fff',
                    rx: 15,
                    ry: 15,
                },
            },
            portMarkup: [
                {
                    tagName: 'foreignObject',
                    selector: 'fo',
                    attrs: {
                        width: 10,
                        height: 10,
                        x: -5,
                        y: -5,
                        magnet: 'true',
                    },
                    children: [
                        {
                            ns: Dom.ns.xhtml,
                            tagName: 'body',
                            selector: 'foBody',
                            attrs: {
                                xmlns: Dom.ns.xhtml,
                            },
                            style: {
                                width: '100%',
                                height: '100%',
                            },
                            children: [
                                {
                                    tagName: 'div',
                                    selector: 'content',
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        true
    );

    Graph.registerConnector(
        'algo-edge',
        (source, target) => {
            const offset = 4;
            const control = 80;
            const v1 = { x: source.x, y: source.y + offset + control };
            const v2 = { x: target.x, y: target.y - offset - control };

            return `M ${source.x} ${source.y}
        L ${source.x} ${source.y + offset}
        C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${target.x} ${target.y - offset}
        L ${target.x} ${target.y}`;
        },
        true
    );

    const graph = new Graph({
        grid: true,
        container: document.getElementById('app'),
        onPortRendered(args) {
            const port = args.port;
            const contentSelectors = args.contentSelectors;
            const container = contentSelectors && contentSelectors.content;
            if (container) {
            }
        },
        // highlighting: {
        //     nodeAvailable: {
        //         name: 'className',
        //         args: {className:'available'}
        //     }
        // }
    });

    graph.addNode({
        x: 380,
        y: 180,
        width: 160,
        height: 30,
        shape: 'algo-node',
        label: '归一化',
        ports: {
            items: [
                { group: 'in', id: 'in1' },
                { group: 'in', id: 'in2' },
                { group: 'out', id: 'out1' },
                { group: 'out', id: 'out2' },
            ],
            groups: {
                in: {
                    position: { name: 'top' },
                    zIndex: 1,
                },
                out: {
                    position: { name: 'bottom' },
                    zIndex: 1,
                },
            },
        },
    });

    console.log(graph);
}

export const TITLE = 'Flow for AI Model';
