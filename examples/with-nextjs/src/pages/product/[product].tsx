import { Fragment, useEffect, useState } from 'react'
import type { FunctionComponent } from 'react'

import Head from 'next/head'
import type { GetServerSideProps } from 'next'

import { gql } from '@brikl/storefront-js'
import type { Edge, Edges } from '@brikl/storefront-js'

import { Card } from '../../components'
import { GET_PRODUCTS, GET_DETAILED_PRODUCT } from '../../services'
import type { Product, DetailedProduct } from '../../models/products'

interface ProductProps {
  product: DetailedProduct
  moreProducts: Edge<Product>[]
}

const ProductPage: FunctionComponent<ProductProps> = ({
  product,
  moreProducts,
}) => {
  let [viewing, updateViewing] = useState(
    product.media.find(({ isThumbnail }) => isThumbnail || product.media[0])
  )
  let [selectedVariant, updateSelectedVariant] = useState<string>(null)

  useEffect(() => {
    updateViewing(
      product.media.find(({ isThumbnail }) => isThumbnail || product.media[0])
    )
  }, [product])

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <main className="flex flex-col sm:flex-row w-full max-w-[840px] mx-auto gap-10 px-4 py-12">
        <div className="flex flex-1 flex-col">
          <img key={viewing.id} src={viewing.source} alt={viewing.alt} />
          <section
            className="grid gap-1 mt-1"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
            }}
          >
            {product.media.map(media => (
              <button
                className="w-full max-h-full"
                key={media.id}
                onClick={() => updateViewing(media)}
              >
                <img src={media.source} alt={media.alt} />
              </button>
            ))}
          </section>
        </div>
        <article className="flex flex-col flex-1">
          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 text-lg font-semibold">
            {product.price.amount} {product.price.currencyCode}
          </p>
          <h2 className="text-lg my-6 text-gray-600">{product.description}</h2>

          <section className="flex flex-col">
            {product.options.map(({ title, values }) => (
              <Fragment key={title}>
                <p className="mb-2">{title}</p>
                <form
                  className="flex flex-row flex-wrap w-full gap-x-1 gap-y-2"
                  onClick={e => {
                    e.preventDefault()
                  }}
                >
                  {values.map(({ id, title }) => (
                    <button
                      key={title}
                      className={`text-sm px-4 py-2 border ${
                        selectedVariant === id
                          ? 'text-white border-black bg-black'
                          : 'text-gray-800 border-gray-300'
                      } rounded-full transition-colors`}
                      onClick={() => {
                        updateSelectedVariant(id)
                      }}
                    >
                      {title}
                    </button>
                  ))}
                </form>
              </Fragment>
            ))}
          </section>
        </article>
      </main>
      <section className="flex flex-col w-full max-w-[840px] my-8 px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-4">You might also like</h2>
        <section
          className="grid gap-x-6 gap-y-12"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          }}
        >
          {moreProducts.map(({ node }) => (
            <Card key={node.id} {...node} />
          ))}
        </section>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ProductProps> =
  async ctx => {
    const { data, errors } = await gql<'product', DetailedProduct>(
      GET_DETAILED_PRODUCT,
      {
        variables: {
          id: ctx.params.product,
        },
      }
    )

    const { data: moreProducts, errors: moreProductsError } = await gql<
      'products',
      Edges<Product>
    >(GET_PRODUCTS, {
      variables: {
        first: 12,
      },
    })

    if (errors || moreProductsError || data === null)
      return {
        notFound: true,
      }

    return {
      props: {
        product: data.product,
        moreProducts: moreProducts.products.edges || [],
      },
    }
  }

export default ProductPage
