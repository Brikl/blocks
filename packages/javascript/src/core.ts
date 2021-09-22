import { Auth } from 'aws-amplify'

import fetch from 'isomorphic-unfetch'
import { nanoid } from 'nanoid'

import { getGatsbyShop } from './query'
import type {
  ContextInitialize,
  QueryOption,
  AWSCognitoConfiguration,
} from './types'

const isServer = typeof window === 'undefined'

/**
 * __SECRET_INTERNAL_DO_NOT_USE_OR_YOU_WILL_BE_FIRED (not really be fired tho)
 *
 * ? Must be export for declaration map generation.
 * If not export, `@brikl/storefront-react` build with declaration map will be failed
 */
export class __Context {
  // Private field by # is not implemented on Terser yet
  private shopId: string = ''
  private token: string = ''
  private salesChannelId: string = 'MYBRIKL'
  private endpoint: string = 'https://dev.internal-api.brikl.com/v1/graphql'
  private cognito: AWSCognitoConfiguration | null = null

  async initialize({ shopId, salesChannelId, cognito }: ContextInitialize) {
    this.shopId = shopId
    if (salesChannelId) this.salesChannelId = salesChannelId
    if (cognito) this.cognito = cognito

    return await this.getUserToken()
  }

  async getUserToken() {
    if (!isServer) {
      let cognito = this.cognito
      if (!cognito) cognito = await getGatsbyShop(this.shopId)

      Auth.Credentials.configure(cognito)

      return await this.reloadToken()
    }
  }

  async reloadToken() {
    if (typeof Auth.Credentials.Auth === 'undefined') return

    const session = await Auth.currentSession()
    const token = session.getIdToken().getJwtToken()

    this.token = token

    return token
  }

  get context() {
    return {
      shopId: this.shopId,
      token: this.token,
      endpoint: this.endpoint,
      salesChannelId: this.salesChannelId,
    }
  }
}

export const StorefrontContext = new __Context()

export const gql = async <Result extends unknown, Variable = Object>(
  queryString: string,
  config?: QueryOption<Variable>,
  shop = StorefrontContext
) => {
  const {
    context: { shopId, token, endpoint, salesChannelId },
  } = shop

  let headers: Record<string, any> = {
    ...config?.headers,
    'content-type': 'application/json',
    'x-brikl-shop-id': shopId,
    authorization: isServer
      ? `${shopId}-GUESTORG-${nanoid(8)}`
      : token
      ? `Bearer ${token}`
      : '',
  }

  const result: Promise<Result> = await fetch(config?.endpoint || endpoint, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      query: queryString,
      variables: {
        ...config?.variables,
        salesChannelId,
      },
    }),
  }).then(res => res.json())

  return result
}
