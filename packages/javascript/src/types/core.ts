import type { AWSCognitoConfiguration } from '../types'

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
}

export interface CognitoConfig {
  identityPoolId: string
  region: string
  userPoolId: string
  userPoolWebClientId: string
}
