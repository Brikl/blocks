import fetch from 'isomorphic-unfetch'
import { nanoid } from 'nanoid'

import { appendSalesChannelToQuery, getCognitoConfig } from '../utils'
import type { QueryOption, StorefrontConfig, QueryResult } from '../utils'

import type { ContextInitialize, AWSCognitoConfiguration } from './types'

import type { Auth } from 'aws-amplify'

const isServer = typeof window === 'undefined'

/** *
 * For the most case, you don't import this directly.
 * Please use `Storefront` instead.
 *
 * @example
 * ```typescript
 * import { StorefrontContext } from '@brikl/blocks'
 *
 * const main = async () => {
 *   StorefrontContext.initialize({
 *     shopId: <Your shop ID>,
 *     salesChannelId: <Your Sales Channel Id>,
 *   })
 * }
 *
 * main()
 * ```
 */
export class __StorefrontContext {
  // Private field by # is not implemented on Terser yet
  private shopId: string = ''
  private token: string = ''
  private salesChannelId: string = 'MYBRIKL'
  private cognito: AWSCognitoConfiguration | null = null
  private guestId = nanoid(8)
  private Auth: typeof Auth | null = null
  private config: StorefrontConfig = {}

  endpoint: string = 'https://api.brikl.com/v1/graphql'

  /**
   * Initialize BRIKL Storefront SDK
   *
   * @example
   * ```typescript
   * import { StorefrontContext } from '@brikl/blocks'
   *
   * const main = async () => {
   *   StorefrontContext.initialize({
   *     shopId: <Your shop ID>,
   *     salesChannelId: <Your Sales Channel Id>,
   *   })
   * }
   *
   * main()
   * ```
   */
  async initialize({
    shopId,
    salesChannelId,
    cognito,
    setupCognito = false,
    endpoint,
    config,
  }: ContextInitialize) {
    this.shopId = shopId

    if (endpoint) this.endpoint = endpoint

    if (salesChannelId) this.salesChannelId = salesChannelId

    if (cognito) this.cognito = cognito
    if (config) this.config = config
    else if (setupCognito) await this.setupCognito()
  }

  /**
   * Set Cognito token manually
   *
   * @param token AWS Cognito user token
   */
  async setToken(token: string) {
    this.token = token
  }

  /**
   * Setup AWS Cognito config automatically from `shopId`
   *
   * @returns AWS Cognito user's token
   */
  async setupCognito() {
    if (isServer) return

    let cognito = this.cognito || (await getCognitoConfig(this.shopId, this))
    const Auth = await this.importAuth()

    Auth.Credentials.configure(cognito)

    return await this.reloadToken()
  }

  /**
   * Reload AWS Cognito user's token
   *
   * @returns AWS Cognito user's token
   */
  async reloadToken() {
    const Auth = await this.importAuth()

    const session = await Auth.currentSession()
    const token = session.getIdToken().getJwtToken()

    this.token = token

    return token
  }

  private async importAuth() {
    if (this.Auth) return this.Auth

    const { Auth } = await import('aws-amplify')
    this.Auth = Auth

    return Auth
  }

  /**
   * Get meta context
   */
  get context() {
    return {
      shopId: this.shopId,
      token: this.token,
      endpoint: this.endpoint,
      salesChannelId: this.salesChannelId,
      guestId: this.guestId,
      config: this.config,
    }
  }
}

/**
 * Storefront Object
 *
 * You can setup and config your Storefront from here
 */
export const Storefront = new __StorefrontContext()

/**
 * Query GraphQL from Brikl API
 *
 * @example
 * ```typescript
 * import Storefront, { gql } from '@brikl/blocks'
 *
 * const main = async () => {
 *   Storefront.initialize({
 *     shopId: 'vermarc',
 *     salesChannelId: 'ff660213-ab56-4b7a-b2f1-3e0f74c2b28c',
 *   })
 *
 *   await Storefront.setupCognito()
 *
 *   const { data, errors } = await gql<'products', Products>(`
 *     query getProducts {
 *       products(first: $first) {
 *         edges {
 *           cursor
 *           node {
 *             id
 *             title
 *           }
 *         }
 *       }
 *     }
 * `, {
 *    variables: {
 *      first: 5
 *    }
 *  })
 *
 *   if (errors) console.log(errors)
 *   else console.dir(data, { depth: null })
 * }
 *
 * main()
 * ```
 *
 * @param queryString - GraphQL query
 * @param config - Graphql config
 * @param storefront - Specified custom Storefront. (You don't usually need this)
 * @returns Result
 */
export const gql = async <Result extends unknown = unknown, Variable = Object>(
  queryString: string,
  config?: QueryOption<Variable>,
  storefront = Storefront
): Promise<QueryResult<Result>> => {
  const {
    context: {
      shopId,
      endpoint,
      salesChannelId,
      guestId,
      config: storefrontConfig,
    },
  } = storefront

  let headers: Record<string, any> = {
    ...((storefrontConfig?.headers || {}) as Object),
    'content-type': 'application/json',
    'x-brikl-shop-id': shopId,
    authorization: `${shopId}-GUESTORG-${guestId}`,
    // authorization: isServer
    //   ? `${shopId}-GUESTORG-${guestId}`
    //   : token
    //   ? token
    //   : await storefront.reloadToken(),
  }

  const result: Promise<QueryResult<Result>> = await fetch(
    storefrontConfig?.endpoint || endpoint,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: config?.skipSalesChannelId
          ? queryString
          : appendSalesChannelToQuery(queryString),
        variables: {
          ...config?.variables,
          salesChannelId,
        },
      }),
    }
  ).then(res => res.json())

  return result
}

export {
  ContextInitialize,
  CognitoConfig,
  AWSCognitoConfiguration,
} from './types'
