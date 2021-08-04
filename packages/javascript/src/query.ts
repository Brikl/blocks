import { query } from './core'

import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from './constants'

import type {
  StorefrontQuery,
  ProductConnection,
  Product,
  ProductsQueryVariable,
  ProductByIdQueryVariable,
} from './types'

export const getProduct: StorefrontQuery['product'] = async id => {
  const product = await query<Product, ProductByIdQueryVariable>(
    GET_PRODUCT_BY_ID,
    {
      variables: {
        id,
      },
    }
  )

  return product
}

export const getProducts: StorefrontQuery['products'] = async ({
  first,
  after,
}) => {
  const product = await query<ProductConnection, ProductsQueryVariable>(
    GET_PRODUCTS,
    {
      variables: {
        first,
        after,
      },
    }
  )

  return product
}

// export const addToCart = async (
//   config: StorefrontConfig,
//   session: CognitoUserSession | Promise<CognitoUserSession>
// ) => {
//   const user = await session
// }
