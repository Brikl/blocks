export { StorefrontContext, query, __Context } from './core'
export { getProduct, getProducts } from './query'

export { GET_PRODUCTS, GET_PRODUCT_BY_ID } from './constants'

export { Amplify, Auth } from 'aws-amplify'

export type {
  CognitoConfig,
  ContextInitialize,
  ProductByIdQueryVariable,
  ProductsQueryVariable,
  ReturnedData,
  StorefrontQuery,
  Product,
  ProductConnection,
  ProductEdge,
  ProductAttribute,
  ProductMedia,
  ProductVariantOption,
  PageInfo,
  ProductVariant,
  ProductVariantType,
  MediaType,
  LocalizedSlug,
  HeaderField,
  QueryOption,
  ProductQueryResult,
  ProductsQueryResult
} from './types'
