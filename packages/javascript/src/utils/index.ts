import { gql } from '../core'

import type {
  StorefrontQuery,
  GatsbyShopQueryResult,
  GatsbyShopQueryVariable,
} from './types'

export const appendSalesChannelToQuery = (query: string) => {
  const matcher = /(query)\ (.*?)\{(.*)/gs
  const [_, __, queryHeader, queries] = matcher.exec(query) || ['', '', '']

  if (!queries) return query

  let newQueries = query
  let newHeader = queryHeader

  if (queryHeader.includes('('))
    newHeader = queryHeader.replace('(', '($salesChannelId: ID!, ')
  else newHeader = queryHeader.trimRight() + '($salesChannelId: ID!) '

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
      // @ts-ignore
      shop: {
        awsConfiguration: { cognito },
      },
    },
  } = await gql<'shop', GatsbyShopQueryResult, GatsbyShopQueryVariable>(
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
      skipSalesChannelId: true,
    }
  )

  return cognito
}

// export const addToCart = async (
//   config = Storefront
// ) => {
//   const session = config.context.token

//   const a = await gql(`
//     mutation createMutation {
//       createOrder(input: {
//         cartId: "",
//         billingAddressId: ""
//         comment: ""
//         currencyCode: ""
//         languageCode: ""
//         notifyToEmail:""
//         shippingAddressId: ""
//         meta: {}
//       }) {
//         orderId
//       }
//     }
//   `)
// }

export type {
  QueryResult,
  Edge,
  Edges,
  HeaderField,
  Header,
  QueryOption,
  GatsbyShopQueryResult,
  GatsbyShopQueryVariable,
  StorefrontQuery,
} from './types'
