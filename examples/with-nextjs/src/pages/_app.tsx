import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { StorefrontProvider } from '@brikl/storefront-react'

import 'tailwindcss/tailwind.css'

const NextApp: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <StorefrontProvider context={{
      shopId: "miku-dayo"
    }}>
      <Component {...pageProps} />
    </StorefrontProvider>
  )
}

export default NextApp
