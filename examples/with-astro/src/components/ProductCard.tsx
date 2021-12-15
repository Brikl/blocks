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
    <a href={href} className="block w-1/2 lg:w-1/4 md:w-1/3 p-4 ">
      <div className="shadow-md rounded-md h-full flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center">
          <image src={image} className="min-h-32 margin" />
        </div>
        <div className="p-2 min-h-32 text-center">
          <h4 className="text-lg font-bold">{title}</h4>
          <h5 className="text-md">{price}</h5>
        </div>
      </div>
    </a>
  )
}
