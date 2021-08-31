import { query } from './core'

import { GET_PRODUCTS, GET_PRODUCT_BY_ID, GATSBY_SHOP } from './constants'

import type {
  StorefrontQuery,
  ProductQueryResult,
  ProductsQueryResult,
  ProductsQueryVariable,
  ProductByIdQueryVariable,
  GatsbyShopQueryResult,
  GatsbyShopQueryVariable
} from './types'

export const getProduct: StorefrontQuery['product'] = async id => {
  const product = await query<ProductQueryResult, ProductByIdQueryVariable>(
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
  const product = await query<ProductsQueryResult, ProductsQueryVariable>(
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

export const getGatsbyShop: StorefrontQuery['gatsbyShop'] = async id => {
  const gatsbyShop = await query<
    GatsbyShopQueryResult,
    GatsbyShopQueryVariable
  >(GATSBY_SHOP, {
    endpoint: 'https://api.mybrikl.com/graphql',
    variables: {
      id,
    },
  })

  return gatsbyShop
}

// export const addToCart = async (
//   config: StorefrontConfig,
//   session: CognitoUserSession | Promise<CognitoUserSession>
// ) => {
//   const user = await session
// }
