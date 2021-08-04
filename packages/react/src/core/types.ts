import type { FunctionComponent } from 'react'

import type { ContextInitialize } from '@brikl/storefront-js'

export interface StorefrontProviderProps {
  context: ContextInitialize
}

export type StorefrontProviderComponent =
  FunctionComponent<StorefrontProviderProps>
