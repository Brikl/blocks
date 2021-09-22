import type { FunctionComponent } from 'react'

import Link from 'next/link'
import type { GetServerSideProps } from 'next'

import { query, StorefrontContext } from '@brikl/storefront-js'

interface Props {
  // products: ReturnedData<ProductsQueryResult>
}

const Page: FunctionComponent<Props> = () => {
  return <h2>HI</h2>

  return (
    <main
      className="grid gap-4 w-full max-w-[1280px] mx-auto p-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      }}
    >
      {products.edges.map(
        ({
          node: {
            id,
            title,
            description,
            media: [{ source, alt }],
            slugs: [{ url }],
          },
        }) => (
          <Link key={id} href={`/product/${url}`}>
            <article className="flex flex-col cursor-pointer">
              <img className="mb-2" src={source} alt={alt} />
              <h3 className="text-3xl font-semibold my-2">{title}</h3>
              <h4 className="text-base text-gray-500">{description}</h4>
            </article>
          </Link>
        )
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  StorefrontContext.initialize({
    shopId: 'vermarc',
    salesChannelId: 'ff660213-ab56-4b7a-b2f1-3e0f74c2b28c',
  })
  
  const a = await query(`
    query {
      products(salesChannelId: "ff660213-ab56-4b7a-b2f1-3e0f74c2b28c", first: 5) {
        edges {
          cursor
          node {
            id
            title
          }
        }    
      }
    }
  `)

  console.log(a)

  return {
    props: {
      products: [],
    },
  }
}

export default Page
