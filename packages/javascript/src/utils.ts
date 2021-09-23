import { gql } from './core'

import type {
  StorefrontQuery,
  GatsbyShopQueryResult,
  GatsbyShopQueryVariable,
} from './types'

export const appendSalesChannelToQuery = (query: string) => {
  const matcher = /(query|mutation|subscription)\ (.*?)\{(.*)/gs
  const [_, __, queryHeader, queries] = matcher.exec(query) || ['', '', '']

  if (!queries) return query

  let newQueries = query
  let newHeader = queryHeader

  if (queryHeader.includes('('))
    newHeader = queryHeader.replace('(', '($salesChannelId: ID!, ')
  else
    newHeader = queryHeader.trimRight() + '($salesChannelId: ID!) '

  newQueries = newQueries.replace(queryHeader, newHeader)

  queries
    .split(/\{/)
    .filter(q => /(.*)\(/.test(q))
    .map(q => [q, q.replace('(', '(salesChannelId: $salesChannelId, ')])
    .forEach(([original, appendedQuery]) => {
      newQueries = newQueries.replace(original, appendedQuery)
    })

  return newQueries
}

export const getCognitoConfig: StorefrontQuery['gatsbyShop'] = async id => {
  const {
    data: {
      shop: {
        awsConfiguration: { cognito },
      },
    },
  } = await gql<GatsbyShopQueryResult, GatsbyShopQueryVariable>(
    `query gatsbyShop($id: ID!) {
  shop(id: $id) {
    awsConfiguration {
      cognito {
        region
        identityPoolId
        userPoolId
        userPoolWebClientId
      }
    }
  }
}`,
    {
      endpoint: 'https://api.mybrikl.com/graphql',
      variables: {
        id,
      },
    }
  )

  return cognito
}

// export const addToCart = async (
//   config: StorefrontConfig,
//   session: CognitoUserSession | Promise<CognitoUserSession>
// ) => {
//   const user = await session
// }
