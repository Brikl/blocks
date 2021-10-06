import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { LoadingIndicator } from '../../components'

const ProductFallback = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(router.asPath)
  }, [])

  return <LoadingIndicator />
}

export default ProductFallback
