export interface ProductConnection {
  totalCount: number
  edges: ProductEdge[]
  pageInfo: PageInfo
}

export interface ProductEdge {
  cursor: string
  node: Product
}

export interface Product {
  id: string
  slugs: LocalizedSlug[]

  title: string
  description: string

  media: ProductMedia[]
  attributes: ProductAttribute[]
  variants: ProductVariant[]

  createdAt: Date
}

export interface LocalizedSlug {
  url: String
  langCode: string
}

export type MediaType = 'Image' | 'Video' | 'Interactive'

export interface ProductMedia {
  id: string
  /**
   * Which type of component should be use to render the media?
   */
  type: MediaType
  /**
   * Source URL of the media (iamge, video, interactive)
   */
  source: string
  /**
   * Alternative text to display for accessibility. Optional.
   */
  alt?: string
  /**
   * Link media to display as default product images
   */
  isThumbnail?: boolean
}

export interface ProductAttribute {
  id: string
  title: string
  description: string
  source: string
  isFeatured?: boolean
}

export type ProductVariantType = 'SIZE' | 'COLOR' | 'GENDER'

export interface ProductVariant {
  id: string
  title: string
  options: ProductVariantOption[]
  type: ProductVariantType
}

export interface ProductVariantOption {
  id: string
  detail: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string
}
