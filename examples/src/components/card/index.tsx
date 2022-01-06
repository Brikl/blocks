import type { FunctionComponent } from 'react'

import Link from 'next/link'

import type { Product } from '../../models'

const ProductCard: FunctionComponent<Product> = ({
  id,
  title,
  media,
  description,
}) => {
  return (
    <Link href="/product/[product]" as={`/product/${id}`}>
      <article className="flex flex-col cursor-pointer">
        {media[0] && (
          <div className="bg-gray-100 mb-2">
            <img
              loading="lazy"
              src={media[0].source}
              alt={media[0].alt}
            />
          </div>
        )}
        <h3 className="text-3xl font-semibold my-2">{title}</h3>
        <h4 className="text-base text-gray-500">{description}</h4>
      </article>
    </Link>
  )
}

export default ProductCard
