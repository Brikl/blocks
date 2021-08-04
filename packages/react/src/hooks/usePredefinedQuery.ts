import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from '@brikl/storefront-js'
import type {
  ProductByIdQueryVariable,
  Product,
  ProductConnection,
  ProductsQueryVariable,
} from '@brikl/storefront-js'

import useQuery from './useQuery'

export const useProductById = (id: ProductByIdQueryVariable['id']) =>
  useQuery<Product, ProductByIdQueryVariable>(GET_PRODUCT_BY_ID, {
    variables: {
      id,
    },
  })

export const useProducts = (variables: ProductsQueryVariable) =>
  useQuery<ProductConnection, ProductsQueryVariable>(GET_PRODUCTS, {
    variables,
  })
