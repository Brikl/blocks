export interface QueryResult<T extends unknown> {
  data?: T
  errors?: Error[]
}

export interface Edge<T extends unknown> {
  cursor: string
  node: T
}

export interface Edges<T extends unknown> {
  edges: Edge<T>[]
}
