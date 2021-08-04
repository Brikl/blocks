import { useCallback, useEffect, useMemo, useState } from 'react'

import { query, StorefrontContext } from '@brikl/storefront-js'
import type { QueryOption } from '@brikl/storefront-js'

import { useStorefront } from '../core'

const useQuery = <Type, Variable = Object>(
  queryString: string,
  options: QueryOption<Variable>
) => {
  let [data, updateData] = useState<Type | null>(null)
  let [error, updateError] = useState<unknown[] | null>(null)
  let [isLoading, updateLoading] = useState(false)

  let storefrontContext = useStorefront()

  let controller = useMemo(() => new AbortController(), [])

  useEffect(() => {
    fetchData()

    return () => {
      controller.abort()
    }
  }, [])

  let fetchData = useCallback(async () => {
    controller.abort()
    updateLoading(true)

    try {
      let { data, errors } = await query<Type>(
        queryString,
        {
          ...options,
          fetcher: {
            ...(options.fetcher || {}),
            signal: controller,
          },
        },
        storefrontContext || StorefrontContext
      )

      updateData(data)
      updateError([...errors])
    } catch (error) {
      updateError([...error])
    } finally {
      updateLoading(false)
    }
  }, [queryString, options, storefrontContext])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    cancelFetch: controller.abort,
  }
}

export default useQuery
