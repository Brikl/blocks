import { Product } from '../types/Product'
import { SALESCHANNEL_ID } from './contants'
import { fakeGql } from './fakeGql'

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fakeGql(
    `
  query salesChannelProducts($salesChannelId: ID!) {
    salesChannelProducts(salesChannelId: $salesChannelId) {
      edges {
        cursor
        node {
          id
          title
          description
          media {
              id
              type
              source
              alt
              isThumbnail
          }
          price {
              amount
              currencyCode
          }
          options {
              id
              type
              values {
                id
              }
          }
        }
      }    
    }
  }
`,
    {
      salesChannelId: SALESCHANNEL_ID,
    }
  )

  const productList = res.data.salesChannelProducts.edges.map(edge => {
    const data = edge.node
    return data
  })

  return productList
}
