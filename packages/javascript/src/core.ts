import { Auth } from 'aws-amplify'

import type { ContextInitialize, ReturnedData, QueryOption } from './types'

class Context {
  #shopId: string = ''
  #token: string = ''

  constructor() {
    this.#shopId = 'localhost:4200/api/storefront-mock-api'
  }

  // TODO: Query congnito function from Backend
  initialize({ shopId }: ContextInitialize) {
    this.#shopId = shopId
  }

  async reloadToken() {
    try {
      if (typeof Auth.Credentials.Auth === 'undefined') return

      const session = await Auth.currentSession()
      const token = session.getIdToken().getJwtToken()

      this.#token = token
    } catch (error) {}
  }

  get context() {
    return {
      shopId: this.#shopId,
      token: this.#token,
    }
  }
}

export const StorefrontContext = new Context()

export const query = async <Result extends unknown, Variable = Object>(
  queryString: string,
  config?: QueryOption<Variable>,
  shop = StorefrontContext
) => {
  const {
    context: { shopId, token },
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

  const result: Promise<ReturnedData<Result>> = await fetch(
    'http://localhost:4200/api/storefront-mock-api',
    {
      method: 'POST',
      ...config?.fetcher,
      headers,
      body: JSON.stringify({
        query: queryString,
        variables: config?.variables || {},
      }),
      // @ts-ignore
    }
  ).then(res => res.json())

  return result
}
