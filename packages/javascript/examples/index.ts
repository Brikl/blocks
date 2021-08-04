import { StorefrontContext, getProduct, getProducts } from '../src'

StorefrontContext.initialize({
  shopId: 'hi',
})

const main = async () => {
  await StorefrontContext.reloadToken()

  console.log('getProduct', await getProduct('hi'))

  console.log(
    'getProducts',
    await getProducts({
      first: 4,
      after: 2,
    })
  )
}

main()
