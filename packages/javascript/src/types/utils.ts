export type HeaderField = Record<string, string | number | boolean>
export type Header = Omit<RequestInit, 'body'> | Record<string, unknown>
export interface QueryOption<Variable = Object> {
  headers?: Header
  variables?: Variable
  endpoint?: string
}
