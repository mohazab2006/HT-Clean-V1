'use client'

import { useState } from 'react'
import { GalleryImageGroup } from '@/types/gallery'
import Image from 'next/image'

interface GalleryTabsProps {
  group: GalleryImageGroup
  onClose: () => void
}

export default function GalleryTabs({ group, onClose }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState<'compare' | 'gallery'>(
    group.hasValidComparison ? 'compare' : 'gallery'
  )
  const [comparePosition, setComparePosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
    updateComparePosition(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    e.preventDefault()
    updateComparePosition(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateComparePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setComparePosition(Math.min(Math.max(percentage, 0), 100))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % group.allImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + group.allImages.length) % group.allImages.length)
  }

  const currentImage = group.allImages[currentImageIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
      <div className="relative w-full max-w-4xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
        {/* Tabs - Only show if there's a valid comparison */}
        {group.hasValidComparison && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex bg-black bg-opacity-50 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'compare'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('compare')}
            >
              Compare
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
          </div>
        )}

        {/* Content */}
        {activeTab === 'compare' && group.hasValidComparison && group.before && group.after ? (
          <div
            className="relative w-full h-full cursor-col-resize select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Before Image (Base layer) */}
            <div className="absolute inset-0">
              <Image
                src={group.before.url}
                alt={group.before.alt_text || 'Before'}
                fill
                className="object-contain"
                sizes="100vw"
                draggable={false}
              />
            </div>

            {/* After Image (Overlay layer) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - comparePosition}% 0 0)`,
                transition: isDragging ? 'none' : 'clip-path 0.1s ease-out',
              }}
            >
              <Image
                src={group.after.url}
                alt={group.after.alt_text || 'After'}
                fill
                className="object-contain"
                sizes="100vw"
                draggable={false}
              />
            </div>

            {/* Slider Line */}
            <div
              className={`absolute top-0 bottom-0 w-1 transition-colors ${
                isDragging ? 'bg-blue-400' : 'bg-blue-500'
              }`}
              style={{ left: `${comparePosition}%` }}
            >
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors ${
                  isDragging ? 'bg-blue-400' : 'bg-blue-500'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-16 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
              After
            </div>
            <div className="absolute top-16 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
              Before
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Current Image */}
            <div className="relative w-full h-full">
              <Image
                src={currentImage.url}
                alt={currentImage.alt_text || ''}
                fill
                className="object-contain"
                sizes="100vw"
                draggable={false}
              />
            </div>

            {/* Navigation Arrows */}
            {group.allImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  onClick={previousImage}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  onClick={nextImage}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {group.allImages.length}
            </div>
          </div>
        )}

        {/* Image Information */}
        {((activeTab === 'compare' && (group.title || group.description)) ||
          (activeTab === 'gallery' && (currentImage.title || currentImage.description))) && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            {activeTab === 'compare' ? (
              <>
                {group.title && <h3 className="text-lg font-semibold">{group.title}</h3>}
                {group.description && <p className="text-sm mt-1">{group.description}</p>}
              </>
            ) : (
              <>
                {currentImage.title && <h3 className="text-lg font-semibold">{currentImage.title}</h3>}
                {currentImage.description && <p className="text-sm mt-1">{currentImage.description}</p>}
              </>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
} 