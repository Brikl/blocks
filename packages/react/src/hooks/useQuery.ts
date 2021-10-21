import { useCallback, useEffect, useMemo, useState, useRef } from 'react'

import Storefront, { gql } from '@brikl/blocks'
import type { QueryOption, QueryResult } from '@brikl/blocks'

import { useStorefront } from '../core'

const isServer = typeof window === 'undefined'

/**
 * Query GraphQL from Brikl API using hooks
 *
 * @example
 * ```typescript
 * import { useQuery } from '@brikl/blocks-react'
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
  options: QueryOption<Variable> = {
    skip: false,
    variables: {},
    headers: {},
    skipSalesChannelId: false,
  }
) => {
  let [data, updateData] = useState<QueryResult<Type, Name> | null>(null)
  let [errors, updateErrors] = useState<unknown[] | null>(null)
  let [isLoading, updateLoading] = useState(false)

  let controller = useRef<AbortController | null>(null)

  let storefront = useStorefront()

  useEffect(() => {
    refetch()

    return abort
  }, [JSON.stringify(options.variables), options.skip])

  let fetchData = useCallback(async () => {
    updateLoading(true)
    controller.current = new AbortController()

    try {
      await gql<Name, Type>(
        queryString,
        {
          ...options,
          headers: {
            ...(options.headers || {}),
            signal: controller.current.signal,
          },
          variables: options.variables,
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
        .finally(() => {
          controller.current = null
        })
    } catch (error) {
      updateErrors(Array.isArray(error) ? [...error] : [error])
    } finally {
      updateLoading(false)
    }
  }, [queryString, options, storefront])

  let refetch = useCallback(() => {
    if (isServer) return

    if (controller.current) abort()

    if (options.skip) updateLoading(false)
    else fetchData()
  }, [JSON.stringify(options.variables), options.skip])

  let abort = useCallback(() => {
    controller.current?.abort()
  }, [])

  return {
    data: data?.data,
    isLoading,
    errors: errors?.concat(data?.errors),
    refetch,
    abort,
  }
}

export default useQuery
