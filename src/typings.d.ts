/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
  selectpicker(opts?: any): void
  selectpicker(method: string, ...args: Array<string | Array<string>>): void
}
interface Array<T> {
  sortBy(property: string, direction?: string): T[];
}