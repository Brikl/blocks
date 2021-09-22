import { gql } from './core'

import type {
  StorefrontQuery,
  GatsbyShopQueryResult,
  GatsbyShopQueryVariable,
} from './types'

export const getGatsbyShop: StorefrontQuery['gatsbyShop'] = async id => {
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
