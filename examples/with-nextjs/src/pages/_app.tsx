import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { BRIKLProvider } from '@brikl/react'

const NextApp: NextPage<AppProps> = props => {
  const { Component, pageProps } = props
  return (
    <BRIKLProvider>
      <Component {...pageProps} />
    </BRIKLProvider>
  )
}

export default NextApp
