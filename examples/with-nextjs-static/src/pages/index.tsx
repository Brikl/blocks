import type { FunctionComponent } from 'react'

import Head from 'next/head'

import { useQuery } from '@brikl/blocks-react'

import { Card, LoadingIndicator } from '../components'
import { GET_PRODUCTS } from '../services'
import type { Product } from '../models'

import type { Edge, Edges } from '@brikl/blocks'

interface Props {
  products: Edge<Product>[]
}

const Layout = ({ children }) => (
  <>
    <Head>
      <title>BRIKL Shop</title>
    </Head>
    <header className="flex justify-center items-center my-16 px-4 py-16">
      <h1 className="text-3xl sm:text-4xl">BRIKL Custom Shop</h1>
    </header>
    {children}
  </>
)

const Page: FunctionComponent<Props> = ({ products = [] }) => {
  const {
    data = null,
    isLoading,
    errors,
    refetch,
  } = useQuery<
    'products',
    Edges<Product>,
    {
      first: number
      after: string
    }
  >(GET_PRODUCTS, {
    variables: {
      first: 20,
      after: products[19]?.cursor || '',
    },
  })

  if (isLoading)
    return (
      <Layout>
        <LoadingIndicator />
      </Layout>
    )

  if (errors)
    return (
      <main className="flex flex-col justify-center items-center w-full h-[80vh]">
        <h1 className="text-2xl mb-6">Something went wrong</h1>
        <button
          className="text-xl font-medium px-9 py-3 bg-gray-200 rounded"
          onClick={refetch}
        >
          Reload
        </button>
      </main>
    )

  return (
    <Layout>
      <main
        className="grid gap-x-6 gap-y-12 w-full max-w-[1280px] mx-auto p-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        }}
      >
        {products.map(({ node }) => (
          <Card key={node.id} {...node} />
        ))}
        {data !== null
          ? data.products.edges.map(({ node }) => (
              <Card key={node.id} {...node} />
            ))
          : null}
      </main>
    </Layout>
  )
}

export default Page
