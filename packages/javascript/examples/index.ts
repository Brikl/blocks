import { gql, StorefrontContext } from '../src'

StorefrontContext.initialize({
  shopId: 'vermarc',
  salesChannelId: 'ff660213-ab56-4b7a-b2f1-3e0f74c2b28c',
})

const main = async () => {
  await StorefrontContext.getUserToken()

  console.dir(
    await gql(`
      query {
        products(salesChannelId: "ff660213-ab56-4b7a-b2f1-3e0f74c2b28c", first: 5) {
          edges {
            cursor
            node {
              id
              titl
            }
          }    
        }
      }
    `),
    {
      depth: null
    }
  )
}

main()
