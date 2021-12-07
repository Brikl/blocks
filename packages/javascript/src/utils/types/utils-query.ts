import type { AWSCognitoConfiguration } from '../../core'
import { __StorefrontContext, ContextInitialize } from '../../core'

export interface GatsbyShopQueryVariable {
  id: string
  context: __StorefrontContext
}

export interface GatsbyShopQueryResult {
  awsConfiguration: {
    cognito: AWSCognitoConfiguration
  }
}

export interface StorefrontQuery {
  gatsbyShop: (
    id: GatsbyShopQueryVariable['id'],
    context: GatsbyShopQueryVariable['context']
  ) => Promise<AWSCognitoConfiguration>
}
