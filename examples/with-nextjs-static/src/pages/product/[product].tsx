import { Fragment, useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useQuery } from '@brikl/blocks-react'
import type { Edge, Edges } from '@brikl/blocks'

import { Card, LoadingIndicator } from '../../components'
import { GET_PRODUCTS, GET_DETAILED_PRODUCT } from '../../services'
import type { Product, DetailedProduct } from '../../models/products'

interface ProductProps {
  notFound: boolean
  isLoading: boolean
  errors?: unknown[]
  data: {
    product?: DetailedProduct
    moreProducts?: Edge<Product>[]
  }
}

const ProductPage = () => {
  const {
    isLoading,
    notFound,
    data: { product, moreProducts },
  } = useProduct()

  let [viewing, updateViewing] = useState(null)
  let [selectedVariant, updateSelectedVariant] = useState<string>(null)

  useEffect(() => {
    if (notFound) return

    updateViewing(
      product.media.find(({ isThumbnail }) => isThumbnail || product.media[0])
    )
  }, [notFound, product])

  if (isLoading) return <LoadingIndicator />

  if (notFound)
    return (
      <main className="flex justify-center items-center w-full h-[80vh]">
        <h1>Not Found</h1>
      </main>
    )

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <main className="flex flex-col sm:flex-row w-full max-w-[840px] mx-auto gap-10 px-4 py-12">
        <div className="flex flex-1 flex-col">
          <div className="bg-gray-100">
            <img key={viewing?.id} src={viewing?.source} alt={viewing?.alt} />
          </div>
          <section
            className="grid gap-1 mt-1"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
            }}
          >
            {product.media.map(media => (
              <button
                className="w-full max-h-full bg-gray-100"
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

export const useProduct = (): ProductProps => {
  const {
    query: { product: id },
  } = useRouter()

  const { data, errors, isLoading } = useQuery<'product', DetailedProduct>(
    GET_DETAILED_PRODUCT,
    {
      endpoint: 'https://dev.api.brikl.com/v1/graphql',
      skip: !id,
      variables: {
        id,
      },
    }
  )

  const {
    data: moreProducts,
    errors: moreProductsError,
    isLoading: moreProductIsLoading,
  } = useQuery<'products', Edges<Product>>(GET_PRODUCTS, {
    variables: {
      first: 12,
    },
  })

  console.log(errors)

  if (errors || moreProductsError || !data || isLoading || moreProductIsLoading)
    return {
      notFound: true,
      isLoading: isLoading || moreProductIsLoading,
      errors: [...(errors || []), ...(moreProductsError || [])],
      data: {},
    }

  console.log(data, isLoading, errors)

  return {
    notFound: false,
    isLoading: isLoading || moreProductIsLoading,
    data: {
      product: data?.product,
      moreProducts: moreProducts?.products?.edges || [],
    },
  }
}

export default ProductPage
