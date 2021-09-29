import type { AWSCognitoConfiguration } from '../../core'

export interface GatsbyShopQueryVariable {
  id: string
}

export interface GatsbyShopQueryResult {
  awsConfiguration: {
    cognito: AWSCognitoConfiguration
  }
}

export interface StorefrontQuery {
  gatsbyShop: (
    id: GatsbyShopQueryVariable['id']
  ) => Promise<AWSCognitoConfiguration>
}
