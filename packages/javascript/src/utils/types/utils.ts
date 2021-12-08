export type HeaderField = Record<string, string | number | boolean>
/**
 * Valid fetch header field
 */
export type Header = Omit<RequestInit, 'body'> | Record<string, unknown>

export interface StorefrontConfig {
  headers?: Header
  endpoint?: string
}

/**
 * Graphql config
 */
export interface QueryOption<Variable = Object> {
  /**
   * HTTP headers to append to fetch
   */
  // headers?: Header
  /**
   * GraphQL variables to include
   */
  variables?: Variable | {}
  /**
   * Custom endpoint
   */
  // endpoint?: string
  skipSalesChannelId?: boolean
  /**
   * Pause the query until ready
   */
  skip?: boolean
}
