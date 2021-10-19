export const ProductCard = ({
  title,
  price,
  image,
  href,
}: {
  title: string
  price: string
  image: string
  href: string
}) => {
  return (
    <a href={href} class="block w-1/4 h-full p-4">
      <div class="shadow-md rounded-md h-full">
        <image src={image} class="min-h-32" />
        <div class="p-2 ">
          <h4 class="text-xl bold">{title}</h4>
          <h5 class="text-lg">{price}</h5>
        </div>
      </div>
    </a>
  )
}
