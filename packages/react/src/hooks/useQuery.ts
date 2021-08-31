import { useCallback, useEffect, useMemo, useState } from 'react'

import { query, StorefrontContext } from '@brikl/storefront-js'
import type { QueryOption } from '@brikl/storefront-js'

import { useStorefront } from '../core'

const isServer = typeof window === 'undefined'

const useQuery = <Type, Variable = Object>(
  queryString: string,
  options: QueryOption<Variable> = {}
) => {
  let [data, updateData] = useState<Type | null>(null)
  let [errors, updateErrors] = useState<unknown[] | null>(null)
  let [isLoading, updateLoading] = useState(false)

  let storefrontContext = useStorefront()

  let controller = useMemo(() => {
    if (isServer || !AbortController) return null

    return new AbortController()
  }, [isServer])

  useEffect(() => {
    fetchData()

    return () => {
      controller?.abort()
    }
  }, [])

  let fetchData = useCallback(async () => {
    updateLoading(true)

    try {
      let { data, errors } = await query<Type>(
        queryString,
        {
          ...options,
          headers: {
            ...(options.headers || {}),
            signal: controller?.signal,
          },
        },
        storefrontContext || StorefrontContext
      )

      updateData(data)

      if (errors) updateErrors(Array.isArray(errors) ? [...errors] : [errors])
      else updateErrors(null)
    } catch (error) {
      updateErrors(Array.isArray(error) ? [...error] : [error])
    } finally {
      updateLoading(false)
    }
  }, [queryString, options, storefrontContext])

  let refetch = useCallback(() => {
    controller?.abort()

    fetchData()
  }, [controller, fetchData])

  return {
    data,
    isLoading,
    errors,
    refetch,
    cancelFetch: controller?.abort,
  }
}

export default useQuery
