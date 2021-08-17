import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { StorefrontProvider } from '@brikl/storefront-react'

import 'tailwindcss/tailwind.css'

const NextApp: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <StorefrontProvider
      context={{
        shopId: 'miku-dayo',
      }}
      cognito={{
        identityPoolId: 'ap-southeast-1:5de69033-45cf-4c82-bc7e-bcbb1e4931e9',
        region: 'ap_southeast_1',
        userPoolId: 'ap-southeast-1_QHOvxpil2',
        userPoolWebClientId: '2450tjiacsraekagtg3qi739de',
      }}
    >
      <Component {...pageProps} />
    </StorefrontProvider>
  )
}

export default NextApp
