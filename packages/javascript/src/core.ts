import { Auth } from 'aws-amplify'

import type { ContextInitialize, ReturnedData, QueryOption } from './types'

/**
 * ! __SECRET_INTERNAL_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
 *
 * ? Must be export for declaration map generation.
 * If not export, `@brikl/storefront-react` build with declaration map will be failed
 */
export class __Context {
  // Private field by # is not implemented on Terser yet
  private shopId: string = ''
  private token: string = ''
  private endpoint: string = 'http://localhost:4200/api/storefront-mock-api'

  // TODO: Query congnito function from Backend
  initialize({ shopId }: ContextInitialize) {
    this.shopId = shopId
  }

  async reloadToken() {
    try {
      if (typeof Auth.Credentials.Auth === 'undefined') return

      const session = await Auth.currentSession()
      const token = session.getIdToken().getJwtToken()

      this.token = token
    } catch (error) {}
  }

  get context() {
    return {
      shopId: this.shopId,
      token: this.token,
      endpoint: this.endpoint,
    }
  }
}

export const StorefrontContext = new __Context()

export const query = async <Result extends unknown, Variable = Object>(
  queryString: string,
  config?: QueryOption<Variable>,
  shop = StorefrontContext
) => {
  const {
    context: { shopId, token, endpoint },
  } = shop

  let headers: Record<string, any> = {
    'content-type': 'application/json',
    'x-brikl-shop-id': shopId,
  }

  if (token)
    headers = {
      ...headers,
      authorization: `Bearer ${token}`,
    }

  const result: Promise<ReturnedData<Result>> = await fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    ...config?.fetcher,
    headers,
    body: JSON.stringify({
      query: queryString,
      variables: config?.variables || {},
    }),
  }).then(res => res.json())

  return result
}
