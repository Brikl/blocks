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
    id: number
    slugs: string
  
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
    id: number
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
    id: number
    title: string
    description: string
    source: string
    isFeatured?: boolean
  }
  
  export type ProductVariantType = 'SIZE' | 'COLOR' | 'GENDER'
  
  export interface ProductVariant {
    id: number
    title: string
    options: ProductVariantOption[]
    type: ProductVariantType
    color: ProductVariantColor
  }
  
  export interface ProductVariantOption {
    id: string
  }
  
  export interface PageInfo {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
    endCursor: string
  }
  
  export interface ProductVariantColor {
    id: string
    title: string
    hex: string
  }
  