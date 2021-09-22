import { useEffect, createContext, useState, useContext } from 'react'

import { StorefrontContext, Auth } from '@brikl/storefront-js'

import type { StorefrontProviderComponent } from './types'

const storefrontContext = createContext(StorefrontContext)

export const StorefrontProvider: StorefrontProviderComponent = ({
  children,
  config,
}) => {
  let [contextManager] = useState(StorefrontContext)

  useEffect(() => {
    contextManager.initialize(config)

    if (config.cognito) {
      Auth.configure(config.cognito)
      contextManager.reloadToken()
    } else contextManager.getUserToken()
  }, [config, contextManager])

  return (
    <storefrontContext.Provider value={StorefrontContext}>
      {children}
    </storefrontContext.Provider>
  )
}

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
  storefrontContext.Provider
export const StorefrontConsumer = storefrontContext.Consumer

export const useStorefront = () => useContext(storefrontContext)
