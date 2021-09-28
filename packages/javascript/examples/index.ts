import Storefront, { gql } from '../src'

const main = async () => {
  Storefront.initialize({
    shopId: '630d0cbc-a125-4537-9258-ca830009765a',
    salesChannelId: '772f078e-df33-4c69-af40-44eef5c51b9c',
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
