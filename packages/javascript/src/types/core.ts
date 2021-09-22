import type { AWSCognitoConfiguration } from '../types'

export interface ContextInitialize {
  shopId: string
  salesChannelId?: string
  cognito?: AWSCognitoConfiguration
}

export interface CognitoConfig {
  identityPoolId: string
  region: string
  userPoolId: string
  userPoolWebClientId: string
}
