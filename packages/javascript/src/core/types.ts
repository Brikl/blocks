import { StorefrontConfig } from '../utils'

export interface ContextInitialize {
  /**
   * Your shop id
   */
  shopId: string
  /**
   * Your custom Sales Channel.
   * If you are not using Sales Channel, you can leave this as blank
   *
   * @default `MYBRIKL`
   */
  salesChannelId?: string
  /**
   * [Optional]
   * If you know your AWS cognito configuration, you can set one here.
   *
   * This is not required as the SDK will fetch one for you if none is provided.
   */
  cognito?: AWSCognitoConfiguration
  /**
   * [Optional]
   * @default false
   *
   * Setup AWS Cognito service for using with client account function, eg. `addToCart`
   *
   * If you're running on server side only, you can skip this.
   */
  setupCognito?: boolean
  /**
   * [Optional]
   * @default https://api.brikl.com/v1/graphql
   *
   * Change to default endpoint for graphql
   */
   endpoint?: string
   config?: StorefrontConfig
}

export interface AWSCognitoConfiguration {
  region: string
  identityPoolId: string
  userPoolId: string
  userPoolWebClientId: string
}

export interface CognitoConfig {
  identityPoolId: string
  region: string
  userPoolId: string
  userPoolWebClientId: string
}
