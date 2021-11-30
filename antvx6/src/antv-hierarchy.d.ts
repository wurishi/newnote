declare module '@antv/hierarchy' {
    const mindmap: (
        data: any,
        config: {
            direction?: string;
            getHeight?(): number;
            getWidth?(): number;
            getHGap?(): number;
            getVGap?(): number;
            getSide?(): string;
        }
    ) => any & { x: number; y: number };
}
