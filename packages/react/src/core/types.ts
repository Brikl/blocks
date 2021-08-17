import type { FunctionComponent } from 'react'

import type { ContextInitialize, CognitoConfig } from '@brikl/storefront-js'

export interface StorefrontProviderProps {
  context: ContextInitialize
  cognito: CognitoConfig
}

export type StorefrontProviderComponent =
  FunctionComponent<StorefrontProviderProps>
