import { NextPage } from 'next'
import { AppProps } from 'next/app'

import Storefront from '@brikl/storefront-js'
import { StorefrontProvider } from '@brikl/storefront-react'

import 'tailwindcss/tailwind.css'
import { AppLayout } from '../layouts'

Storefront.initialize({
  shopId: '630d0cbc-a125-4537-9258-ca830009765a',
  salesChannelId: '772f078e-df33-4c69-af40-44eef5c51b9c',
})

const NextApp: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <StorefrontProvider config={Storefront.context}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </StorefrontProvider>
  )
}

export default NextApp
