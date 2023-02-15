declare module 'markdown' {
  export function parse(source: string, dialect?: any): any
  export const markdown: {
    Markdown(dialect: any): void
    parse(source: string, dialect?: any): any
    renderJsonML(jsonml: any, options?: any): string
    toHTML(source: string, dialect?: any, options?: any): string
    toHTMLTree(input, dialect?: any, options?: any): any
  }
}
