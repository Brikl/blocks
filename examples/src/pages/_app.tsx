import { NextPage } from 'next'
import { AppProps } from 'next/app'

import Storefront from '@brikl/blocks'
import { StorefrontProvider } from '@brikl/blocks-react'

import 'tailwindcss/tailwind.css'
import { AppLayout } from '../layouts'

Storefront.initialize({
  shopId: '667674bf-c3f8-4444-8127-29c77c7e6530',
  salesChannelId: 'd905fcce-fa90-4197-ac9c-d90e0c0cdc5a'
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
