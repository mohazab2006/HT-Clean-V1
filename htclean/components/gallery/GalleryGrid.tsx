'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalleryImageGroup } from '@/types/gallery'
import { motion } from 'framer-motion'
import GalleryTabs from './GalleryTabs'

interface GalleryGridProps {
  imageGroups: GalleryImageGroup[]
}

export default function GalleryGrid({ imageGroups }: GalleryGridProps) {
  const [selectedGroup, setSelectedGroup] = useState<GalleryImageGroup | null>(null)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageGroups.map((group) => {
          // Find the image with sequence_number 1 for the thumbnail
          const thumbnailImage = group.allImages.find(img => img.sequence_number === 1) || 
                               group.allImages[0] // Fallback to first image if no sequence_number 1

          return (
            <div key={group.id} className="space-y-2">
              <motion.div
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedGroup(group)}
              >
                {/* Show the image with sequence_number 1 as thumbnail */}
                <Image
                  src={thumbnailImage?.url || ''}
                  alt={thumbnailImage?.alt_text || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  draggable={false}
                />
                
                {/* Badge for before/after pairs */}
                {group.hasValidComparison && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Before & After
                  </div>
                )}

                {/* Badge for number of additional images */}
                {group.additionalImages.length > 0 && (
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {group.hasValidComparison ? '+' : ''}{group.additionalImages.length} Photos
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
              </motion.div>

              {/* Title */}
              {group.title && (
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 px-1">
                  {group.title}
                </h3>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal with Tabs */}
      {selectedGroup && (
        <GalleryTabs
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  )
} 