export interface Product {
  id: string
  title: string
  description: string
  media?: {
    source: string
    alt: string
  }[]
  slugs?: {
    url: string
  }[]
}

export type Products = Product[]

export interface DetailedProduct {
  title: string
  description: string
  media: {
    id: string
    type: string
    source: string
    alt?: string
    isThumbnail?: boolean
  }[]
  price: {
    amount: number
    currencyCode: string
  }
  slugs: {
    url: string
  }[]
  options: {
    id: string
    title: string
    type: string
    values: {
      id: string
      title: string
    }[]
  }[]
}
