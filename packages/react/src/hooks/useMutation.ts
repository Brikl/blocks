import { useCallback, useEffect, useState, useRef } from 'react'

import Storefront, { gql } from '@brikl/blocks'
import type { QueryOption, QueryResult } from '@brikl/blocks'

import type { DocumentNode } from 'graphql'

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
const useMutation = <Type = unknown, Variable = Object>(
  queryString: string | DocumentNode,
  options: QueryOption<Variable> = {
    variables: {},
    skipSalesChannelId: false,
    storefront: null,
  }
) => {
  let [data, updateData] = useState<QueryResult<Type> | null>(null)
  let [errors, updateErrors] = useState<unknown[] | null>(null)
  let [isLoading, updateLoading] = useState(false)

  let controller = useRef<AbortController | null>(null)

  let ordinal = useStorefront()
  let storefront = options.storefront || ordinal

  useEffect(() => {
    return abort
  }, [JSON.stringify(options.variables)])

  let fetchData = useCallback(async () => {
    updateLoading(true)
    controller.current = new AbortController()

    try {
      await gql<Type>(queryString, {
        ...options,
        // headers: {
        //   ...(options.headers || {}),
        //   signal: controller.current.signal,
        // },
        variables: options.variables,
        storefront: storefront || Storefront,
      })
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

  let execute = useCallback(() => {
    if (isServer) return

    if (controller.current) abort()

    fetchData()
  }, [JSON.stringify(options.variables), options.skip])

  let abort = useCallback(() => {
    controller.current?.abort()
  }, [])

  return [
    execute,
    {
      data: data?.data,
      isLoading,
      errors: errors?.concat(data?.errors),
      abort,
    },
  ] as const
}

export default useMutation
