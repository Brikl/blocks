import type { FC } from 'react'

import type { ContextInitialize } from '@brikl/blocks'

export interface StorefrontProviderProps {
  config: ContextInitialize
  children?: React.ReactElement
}

export type StorefrontProviderComponent = FC<StorefrontProviderProps>
