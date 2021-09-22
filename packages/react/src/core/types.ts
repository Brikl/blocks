import type { FunctionComponent } from 'react'

import type { ContextInitialize, CognitoConfig } from '@brikl/storefront-js'

export interface StorefrontProviderProps {
  config: ContextInitialize
}

export type StorefrontProviderComponent =
  FunctionComponent<StorefrontProviderProps>
