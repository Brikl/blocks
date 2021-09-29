import { useEffect, createContext, useState, useContext } from 'react'

import Storefront from '@brikl/storefront-js'

import type { StorefrontProviderComponent } from './types'

const storefrontContext = createContext(Storefront)

export const StorefrontProvider: StorefrontProviderComponent = ({
  children,
  config,
}) => {
  let [contextManager] = useState(Storefront)

  useEffect(() => {
    contextManager.initialize(config)
  }, [config, contextManager])

  return (
    <storefrontContext.Provider value={Storefront}>
      {children}
    </storefrontContext.Provider>
  )
}

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
  storefrontContext.Provider
export const StorefrontConsumer = storefrontContext.Consumer

export const useStorefront = () => useContext(storefrontContext)
