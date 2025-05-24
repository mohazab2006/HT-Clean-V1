'use client'

import { useState } from 'react'
import GallerySection from '@/components/gallery/GallerySection'
import { WindowCleaningCategory } from '@/types/gallery'

const categories: { title: string; value: WindowCleaningCategory }[] = [
  { title: 'Window Cleaning', value: 'window-cleaning' },
  { title: 'Power Washing', value: 'power-washing' },
]

export default function WindowCleaningGallery() {
  const [activeCategory, setActiveCategory] = useState<WindowCleaningCategory>('window-cleaning')

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold text-center mb-8">Window Cleaning Gallery</h1>
      
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === category.value
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <GallerySection
        serviceCategory="window-cleaning"
        subCategory={activeCategory}
      />
    </div>
  )
} 