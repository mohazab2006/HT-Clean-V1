'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/types/gallery'
import { motion } from 'framer-motion'

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt_text}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt_text}
              fill
              className="object-contain"
              sizes="100vw"
            />
            {selectedImage.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-sm mt-1">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 