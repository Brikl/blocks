export interface Product {
  id: string
  media: {
    id: string
    type: string
    source: string
    alt: string
    isThumbnail: boolean
  }[]
  title: string
  description: string
  price: {
    amount: string
    currencyCode: string
  }
  attributes: {
    id: string
    title: string
    description: string
    source: string
    isFeatured: boolean
  }[]
  options: {
    id: string
    type: string
    title: string
    values: { id: string; title: string }[]
  }[]
}
