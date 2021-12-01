import { Graph, Node, Platform, Dom } from '@antv/x6';
import './practices_algo_flow.css';

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

    const graph: Graph = new Graph({
        grid: true,
        container: document.getElementById('app')!,
        onPortRendered(args) {
            const port: any = args.port;
            const contentSelectors = args.contentSelectors;
            const container =
                contentSelectors && (contentSelectors.content as Element);
            if (container) {
                const portDiv =
                    container.querySelector('div') ||
                    document.createElement('div');
                portDiv.className = `my-port${
                    port.connected ? ' connected' : ''
                }`;
                container.appendChild(portDiv);
            }
        },
        highlighting: {
            nodeAvailable: {
                name: 'className',
                args: { className: 'available' },
            },
            magnetAvailable: {
                name: 'className',
                args: { className: 'available' },
            },
            magnetAdsorbed: {
                name: 'className',
                args: { className: 'availabel' },
            },
        },
        connecting: {
            snap: true,
            allowBlank: false,
            allowLoop: false,
            highlight: true,
            sourceAnchor: {
                name: 'bottom',
                args: {
                    dx: Platform.IS_SAFARI ? 5 : 0,
                },
            },
            targetAnchor: {
                name: 'center',
                args: {
                    dx: Platform.IS_SAFARI ? 5 : 0,
                },
            },
            connectionPoint: 'anchor',
            connector: 'algo-edge',
            createEdge() {
                return graph.createEdge({
                    attrs: {
                        line: {
                            strokeDasharray: '5 5',
                            stroke: '#808080',
                            strokeWidth: 1,
                            targetMarker: {
                                name: 'block',
                                args: {
                                    size: '6',
                                },
                            },
                        },
                    },
                });
            },
            validateMagnet({ magnet }) {
                return magnet.getAttribute('port-group') !== 'in';
            },
            validateConnection({
                sourceView,
                targetView,
                sourceMagnet,
                targetMagnet,
            }) {
                // 只能从输出链接桩创建连接
                if (
                    !sourceMagnet ||
                    sourceMagnet.getAttribute('port-group') === 'in'
                ) {
                    return false;
                }

                // 只能连接到输入链接桩
                if (
                    !targetMagnet ||
                    targetMagnet.getAttribute('port-group') !== 'in'
                ) {
                    return false;
                }

                // 判断目标链接桩是否可连接
                const portId = targetMagnet.getAttribute('port')!;
                const node = targetView?.cell as Node;
                const port = node.getPort(portId);
                if (port && port.connected) {
                    return false;
                }

                return true;
            },
        },
    });

    graph.on('edge:connected', (args: any) => {
        const edge = args.edge;
        const node = args.currentCell as Node;
        const elem = args.currentMagnet as HTMLElement;
        const portId = elem.getAttribute('port') as string;

        // 触发 port 重新渲染
        node.setPortProp(portId, 'connected', true);

        // 更新连线样式
        edge.attr({
            line: {
                strokeDasharray: '',
                targetMarker: '',
            },
        });
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

    const source = graph.addNode({
        x: 200,
        y: 50,
        width: 160,
        height: 30,
        shape: 'algo-node',
        label: 'SQL',
        ports: {
            items: [
                { group: 'in', id: 'in1' },
                { group: 'in', id: 'in2' },
                { group: 'out', id: 'out1' },
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

    const target = graph.addNode({
        x: 120,
        y: 260,
        width: 160,
        height: 30,
        shape: 'algo-node',
        label: '序列化',
        ports: {
            items: [
                { group: 'in', id: 'in1', connected: true },
                { group: 'in', id: 'in2' },
                { group: 'out', id: 'out1' },
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

    graph.addEdge({
        source: { cell: source, port: 'out1' },
        target: { cell: target, port: 'in1' },
        attrs: {
            line: {
                stroke: '#808080',
                strokeWidth: 1,
                targetMarker: '',
            },
        },
    });
}

export const TITLE = 'Flow for AI Model';
