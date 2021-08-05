import { useState, Fragment } from 'react'
import type { FunctionComponent } from 'react'

import type { GetServerSideProps } from 'next'

import {
  getProduct,
  ProductVariantOption,
  ProductVariantType,
} from '@brikl/storefront-js'
import type {
  ReturnedData,
  ProductQueryResult,
  ProductVariant,
} from '@brikl/storefront-js'

interface ProductProps {
  product: ReturnedData<ProductQueryResult>
}

const mockVariants: ProductVariant[] = [
  {
    id: 'flawke',
    title: 'Color',
    type: 'COLOR',
    options: [
      {
        id: 'c1',
        detail: '#007aff',
      },
      {
        id: 'c2',
        detail: '#EF4444',
      },
      {
        id: 'c3',
        detail: '#10B981',
      },
      {
        id: 'c4',
        detail: '#6366F1',
      },
      {
        id: 'c5',
        detail: '#F59E0B',
      },
      {
        id: 'c6',
        detail: '#EC4899',
      },
      {
        id: 'c7',
        detail: '#3730A3',
      },
      {
        id: 'c8',
        detail: '#FECACA',
      },
    ],
  },
  {
    id: 'awdged',
    title: 'Size',
    type: 'SIZE',
    options: [
      {
        id: 's1',
        detail: '29',
      },
      {
        id: 's2',
        detail: '30',
      },
      {
        id: 's3',
        detail: '31',
      },
      {
        id: 's4',
        detail: '32',
      },
      {
        id: 's5',
        detail: '33',
      },
      {
        id: 's6',
        detail: '34',
      },
      {
        id: 's7',
        detail: '35',
      },
      {
        id: 's8',
        detail: '36',
      },
    ],
  },
  {
    id: 'awadwjd',
    title: 'length',
    type: 'SIZE',
    options: [
      {
        id: 's1',
        detail: '26',
      },
      {
        id: 's2',
        detail: '27',
      },
      {
        id: 's3',
        detail: '28',
      },
    ],
  },
]

const ProductPage: FunctionComponent<ProductProps> = ({ product }) => {
  let [selection, updateSelection] = useState(0)
  let [selectedVariants, updateVariantSelection] = useState<
    Record<string, string>
  >({})

  // TODO: Resolve DateTime error
  // if (product.errors.length) return <h1>{JSON.stringify(product.errors)}</h1>

  let handleSelect = ({ id, value }: { id: string; value: string }) => {
    updateVariantSelection({
      ...selectedVariants,
      [id]: value,
    })
  }

  let {
    data: {
      product: productData,
      product: { title, description, attributes, media },
    },
  } = product
  let selectedProduct = attributes[selection]

  return (
    <main className="flex flex-row justify-center items-start w-full max-w-[1280px] mx-auto px-4 py-12">
      <section className="flex flex-[2]">
        <aside className="flex flex-col gap-2 min-w-[84px] w-[84px] pr-4 cursor-pointer">
          {media.map(({ id, source, alt }, index) => (
            <button
              type="button"
              className={`w-full ${index === selection ? '' : 'opacity-50'}`}
              onClick={() => {
                updateSelection(index)
              }}
            >
              <img key={id} src={source} alt={alt} />
            </button>
          ))}
        </aside>
        <div className="flex flex-row">
          <img
            src={selectedProduct.source}
            alt={selectedProduct.title}
            title={selectedProduct.title}
          />
        </div>
      </section>
      <article className="flex flex-1 flex-col pl-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
        <h2 className="text-base font-normal text-gray-500 mb-4">
          {description}
        </h2>

        {mockVariants.map(({ id, title, options, type }) => (
          <section key={id} className="flex flex-col w-full my-3">
            <h5 className="text-sm text-gray-800 capitalize">{title}</h5>
            <div className="flex flex-row flex-nowrap gap-1 mt-2">
              {options.map(option => (
                <Fragment key={option.id}>
                  {selectorMap[type]({
                    ...option,
                    handleSelect,
                    variantId: id,
                    active: selectedVariants[id] === option.id,
                  })}
                </Fragment>
              ))}
            </div>
          </section>
        ))}

        <div className="flex flex-row gap-2 my-4">
          <button className="text-lg text-white font-semibold py-2 w-full bg-black rounded-full">Add To Cart</button>
          <button className="text-lg text-gray-600 py-2 w-full bg-gray-200 rounded-full">Add To Wishlist</button>
        </div>
      </article>
    </main>
  )
}

interface SelectorProps extends ProductVariantOption {
  variantId: string
  active?: boolean
  handleSelect: (input: { id: string; value: string }) => void
}

const ColorSelector = ({
  id,
  detail,
  variantId,
  active = false,
  handleSelect,
}: SelectorProps) => {
  let handleClick = () => {
    handleSelect({ id: variantId, value: id })
  }

  return (
    <button
      type="button"
      className={`text-sm w-[24px] h-[24px] rounded-full cursor-pointe`}
      onClick={handleClick}
      style={{
        backgroundColor: detail,
        boxShadow: active
          ? `inset 0px 0px 0px 2px ${detail}, inset 0px 0px 0px 5px #fff`
          : '',
      }}
    />
  )
}

const GenderSelector = ({
  id,
  detail,
  active = false,
  variantId,
  handleSelect,
}: SelectorProps) => {
  let handleClick = () => {
    handleSelect({ id: variantId, value: id })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm px-3 py-1 rounded-full border border-gray-300 cursor-pointer"
    >
      {detail}
    </button>
  )
}

const SizeSelector = ({
  id,
  detail,
  active = false,
  variantId,
  handleSelect,
}: SelectorProps) => {
  let handleClick = () => {
    handleSelect({ id: variantId, value: id })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-xs text-black hover:text-white focus:text-white w-[36px] h-[36px] rounded-full border border-gray-300 hover:border-black focus:border-black bg-white hover:bg-black focus:bg-black transition-colors cursor-pointer ${
        active ? 'text-white bg-black border-black' : ''
      }`}
    >
      {detail}
    </button>
  )
}

const selectorMap: Record<ProductVariantType, typeof ColorSelector> = {
  COLOR: ColorSelector,
  GENDER: GenderSelector,
  SIZE: SizeSelector,
}

export const getServerSideProps: GetServerSideProps<ProductProps> =
  async () => {
    return {
      props: {
        product: await getProduct('eldridge'),
      },
    }
  }

export default ProductPage
