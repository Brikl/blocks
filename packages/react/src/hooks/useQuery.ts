import { useCallback, useEffect, useMemo, useState } from 'react'

import Storefront, { gql } from '@brikl/storefront-js'
import type { QueryOption, QueryResult } from '@brikl/storefront-js'

import { useStorefront } from '../core'

const isServer = typeof window === 'undefined'

/**
 * Query GraphQL from Brikl API using hooks
 *
 * @example
 * ```typescript
 * import { useQuery } from '@brikl/storefront-react'
 *
 * useQuery(`
 *   query getProducts {
 *     products(first: $first) {
 *       edges {
 *         cursor
 *         node {
 *           id
 *           title
 *         }
 *       }
 *     }
 *   }
 * `, {
 *  variables: {
 *    first: 5
 *  }
 * })
 * ```
 *
 * @param queryString - GraphQL query
 * @param config - Graphql config
 * @returns Result
 */
const useQuery = <
  Name extends string = string,
  Type = unknown,
  Variable = Object
>(
  queryString: string,
  options: QueryOption<Variable> = {}
) => {
  let [data, updateData] = useState<QueryResult<Type, Name> | null>(null)
  let [errors, updateErrors] = useState<unknown[] | null>(null)
  let [isLoading, updateLoading] = useState(false)

  let storefront = useStorefront()

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
      await gql<Name, Type>(
        queryString,
        {
          ...options,
          headers: {
            ...(options.headers || {}),
            signal: controller?.signal,
          },
        },
        storefront || Storefront
      )
        .then(data => {
          updateErrors(null)
          updateData(data)

          return data
        })
        .catch(errors => {
          updateErrors(Array.isArray(errors) ? [...errors] : [errors])
        })
    } catch (error) {
      updateErrors(Array.isArray(error) ? [...error] : [error])
    } finally {
      updateLoading(false)
    }
  }, [queryString, options, storefront])

  let refetch = useCallback(() => {
    controller?.abort()

    fetchData()
  }, [controller, fetchData])

  return {
    data: data?.data,
    isLoading,
    errors: data?.errors,
    refetch,
    cancelFetch: controller?.abort,
  }
}

export default useQuery
