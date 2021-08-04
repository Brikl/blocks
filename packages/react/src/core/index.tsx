import { useEffect, createContext, useState, useContext } from 'react'

import { StorefrontContext } from '@brikl/storefront-js'

import type { StorefrontProviderComponent } from './types'

const storefrontContext = createContext(StorefrontContext)

export const StorefrontProvider: StorefrontProviderComponent = ({
  children,
  context,
}) => {
  let [contextManager] = useState(StorefrontContext)

  useEffect(() => {
    contextManager.initialize(context)
  }, [context])

  return (
    <storefrontContext.Provider value={StorefrontContext}>
      {children}
    </storefrontContext.Provider>
  )
}

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = storefrontContext.Provider
export const StorefrontConsumer = storefrontContext.Consumer

export const useStorefront = () => useContext(storefrontContext)
