export type HeaderField = Record<string, string | number | boolean>

export interface QueryOption<Variable = Object> {
  headers?: HeaderField
  variables?: Variable
  fetcher?: Object
}
