import type { FunctionComponent } from 'react'

import type { ContextInitialize } from '@brikl/blocks'
import React from 'react'

export interface StorefrontProviderProps {
  config: ContextInitialize
  children?: React.ReactElement
}

export type StorefrontProviderComponent =
  FunctionComponent<StorefrontProviderProps>
