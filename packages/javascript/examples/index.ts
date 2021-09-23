import Storefront, { gql } from '../src'

const main = async () => {
  Storefront.initialize({
    shopId: 'vermarc',
    salesChannelId: 'ff660213-ab56-4b7a-b2f1-3e0f74c2b28c',
  })

  await Storefront.setupCognito()

  const { data, errors } = await gql(`
    query example($first: Int!) {
      products(first: $first) {
        edges {
          cursor
          node {
            id
            title
          }
        }    
      }
    }
`, {
  variables: {
    first: 5
  }
})

  if (errors) console.log(errors)
  else console.dir(data, { depth: null })
}

main()
