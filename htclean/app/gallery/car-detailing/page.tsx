'use client'

import { useState } from 'react'
import GallerySection from '@/components/gallery/GallerySection'
import { CarDetailingCategory } from '@/types/gallery'

const categories: { title: string; value: CarDetailingCategory }[] = [
  { title: 'Sedans', value: 'sedans' },
  { title: 'SUVs', value: 'suvs' },
  { title: 'Trucks', value: 'trucks' },
]

export default function CarDetailingGallery() {
  const [activeCategory, setActiveCategory] = useState<CarDetailingCategory>('sedans')

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold text-center mb-8">Car Detailing Gallery</h1>
      
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === category.value
                ? 'bg-white text-gray-900 shadow-md'
                : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <GallerySection
        serviceCategory="car-detailing"
        subCategory={activeCategory}
      />
    </div>
  )
} 