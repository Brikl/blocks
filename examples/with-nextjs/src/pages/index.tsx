import type { FunctionComponent } from 'react'

import Head from 'next/head'
import type { GetServerSideProps } from 'next'

import { gql } from '@brikl/storefront-js'
import { useQuery } from '@brikl/storefront-react'

import { Card } from '../components'
import { GET_PRODUCTS } from '../services'
import type { Product } from '../models'

import type { Edge, Edges } from '@brikl/storefront-js'

interface Props {
  products: Edge<Product>[]
}

const Page: FunctionComponent<Props> = ({ products = [] }) => {
  const { data = null } = useQuery<
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

  return (
    <>
      <Head>
        <title>BRIKL Shop</title>
      </Head>
      <header className="flex justify-center items-center my-16 px-4 py-16">
        <h1 className="text-3xl sm:text-4xl">BRIKL Custom Shop</h1>
      </header>
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data, errors } = await gql<'products', Edges<Product>>(GET_PRODUCTS, {
    variables: {
      first: 40,
    },
  })

  if (errors)
    return {
      props: {
        products: [],
      },
    }

  const {
    products: { edges: products },
  } = data

  data.products

  return {
    props: {
      products,
    },
  }
}

export default Page
