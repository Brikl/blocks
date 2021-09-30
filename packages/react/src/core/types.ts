import type { FunctionComponent } from 'react'

import type { ContextInitialize, CognitoConfig } from '@brikl/blocks'

export interface StorefrontProviderProps {
  config: ContextInitialize
}

export type StorefrontProviderComponent =
  FunctionComponent<StorefrontProviderProps>
