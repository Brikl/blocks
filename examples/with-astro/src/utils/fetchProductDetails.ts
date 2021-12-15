import { Product } from '../types/Product'
import { SALESCHANNEL_ID } from './contants'
import { fakeGql } from './fakeGql'

export const fetchProductDetails = async (
  productId: string
): Promise<Product> => {
  let res
  try {
    res = await fakeGql(
      `
    query salesChannelProductWithVariants($productId: ID!, $salesChannelId: ID!) {
      salesChannelProduct(id: $productId, salesChannelId: $salesChannelId) {
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
              title
              values {
                  title
                  id
              }
          } 
      }
    }
    `,
      {
        salesChannelId: SALESCHANNEL_ID,
        productId,
      }
    )
  } catch (error) {
    res = await fakeGql(
      `
    query salesChannelProduct($productId: ID!, $salesChannelId: ID!) {
      salesChannelProduct(id: $productId, salesChannelId: $salesChannelId) {
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
              title
              values {
                  title
                  id
              }
          } 
      }
    }
    `,
      {
        salesChannelId: SALESCHANNEL_ID,
        productId,
      }
    )
  }

  const productData = res.data.salesChannelProduct
  return productData
}
