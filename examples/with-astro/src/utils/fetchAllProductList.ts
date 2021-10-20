import { SALESCHANNEL_ID } from './contants'
import { fakeGql } from './fakeGql'

export const fetchAllProductList = async () => {
  const products = []
  let cursor
  let continueLoop
  const firstPage = await fakeGql(
    `query salesChannelProducts($salesChannelId: ID!) {
        salesChannelProducts(salesChannelId: $salesChannelId) {
            edges {
                node {
                    id
                    slugs {
                        url
                        langCode
                    }
                }
            }    
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
    `,
    {
      salesChannelId: SALESCHANNEL_ID,
    }
  )
  const res = firstPage.data.salesChannelProducts

  products.push(res.edges)
  cursor = res.pageInfo.endCursor
  continueLoop = res.pageInfo.hasNextPage
  while (res.pageInfo.hasNextPage) {
    const pageData = await fakeGql(
      `
        query salesChannelProducts($cursor: string, $salesChannelId: ID!) {
            salesChannelProducts(after: $cursor, salesChannelId: $salesChannelId) {
                edges {
                    node {
                        id
                        slugs {
                            url
                            langCode
                        }
                    }
                }    
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
        `,
      {
        salesChannelId: SALESCHANNEL_ID,
        cursor,
      }
    )
    const data = pageData.data?.salesChannelProducts
    if (data) {
      products.push(data.edges)
      cursor = data.pageInfo?.endCursor
      continueLoop = data.pageInfo.hasNextPage
    }
  }
  return products.flatMap(e => e.map(e => e.node))
}
