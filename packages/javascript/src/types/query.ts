export interface GatsbyShopQueryVariable {
  id: string
}

export interface AWSCognitoConfiguration {
  region: string
  identityPoolId: string
  userPoolId: string
  userPoolWebClientId: string
}

export interface GatsbyShopQueryResult {
  data: {
    shop: {
      awsConfiguration: {
        cognito: AWSCognitoConfiguration
      }
    }
  }
}

export interface StorefrontQuery {
  gatsbyShop: (
    id: GatsbyShopQueryVariable['id']
  ) => Promise<AWSCognitoConfiguration>
}
