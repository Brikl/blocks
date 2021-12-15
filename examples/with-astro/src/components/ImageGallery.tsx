import { useState, useEffect } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  useEffect(() => {
    setSelectedImage(images[0])
  }, [images])

  return (
    <AnimateSharedLayout>
      <div className="flex flex-col">
        <motion.div className="h-72 mb-4" layout>
          <motion.img
            src={selectedImage}
            className="mx-auto max-w-full max-h-full"
          />
        </motion.div>
        <motion.div className="flex flex-grow-0 flex-wrap" layout>
          {images.map(image => {
            return (
              <motion.div
                className="w-1/4 p-2 h-32 relative"
                onClick={() => {
                  setSelectedImage(image)
                }}
                key={image}
              >
                {image === selectedImage && (
                  <motion.div
                    layoutId="outline"
                    className="bg-gray-200 absolute w-full h-full top-0 left-0 rounded"
                    initial={false}
                    transition={spring}
                  />
                )}
                <motion.div
                  className={`border h-full flex items-center justify-center relative z-5`}
                >
                  <motion.img src={image} className="max-w-full max-h-full " />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </AnimateSharedLayout>
  )
}

export default ImageGallery
