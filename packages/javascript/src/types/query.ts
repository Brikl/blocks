import type { Product, ProductConnection } from './typesRoot'

export interface ProductByIdQueryVariable {
  id: string
}

export interface ProductsQueryVariable {
  first: number
  after: number
}

export interface ReturnedData<Data extends any> {
  data: Data
  errors: unknown[]
}

export interface StorefrontQuery {
  product: (id: ProductByIdQueryVariable['id']) => Promise<ReturnedData<Product>>
  products: (
    varaibles: ProductsQueryVariable
  ) => Promise<ReturnedData<ProductConnection>>
}
