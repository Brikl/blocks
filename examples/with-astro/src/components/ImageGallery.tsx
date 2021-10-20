import { useState, useEffect } from 'react'

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  useEffect(() => {
    setSelectedImage(images[0])
  }, [images])

  return (
    <div className="flex flex-col">
      <div className="h-72 mb-4">
        <img src={selectedImage} className="mx-auto max-w-full max-h-full" />
      </div>
      <div className="flex flex-grow-0 flex-wrap">
        {images.map(image => {
          return (
            <div
              className="w-1/4 p-2 h-32 "
              onClick={() => {
                setSelectedImage(image)
              }}
              key={image}
            >
              <div class="border h-full flex items-center justify-center">
                <img src={image} className="max-w-full max-h-full " />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
