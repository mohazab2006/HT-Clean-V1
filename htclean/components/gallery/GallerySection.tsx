'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { GalleryImage, GalleryImageGroup, ServiceCategory, SubCategory } from '@/types/gallery'
import GalleryGrid from './GalleryGrid'

interface GallerySectionProps {
  serviceCategory: ServiceCategory
  subCategory: SubCategory
}

export default function GallerySection({ serviceCategory, subCategory }: GallerySectionProps) {
  const [imageGroups, setImageGroups] = useState<GalleryImageGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchImages() {
      try {
        setLoading(true)
        setError(null)

        if (typeof window === 'undefined') return

        const { data: images, error: supabaseError } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('service_category', serviceCategory)
          .eq('sub_category', subCategory)
          .order('created_at', { ascending: false })

        if (supabaseError) throw supabaseError

        if (isMounted && images) {
          // Group images by job_id
          const jobGroups = new Map<string, GalleryImage[]>()
          
          images.forEach((image) => {
            const jobImages = jobGroups.get(image.job_id) || []
            jobImages.push(image)
            jobGroups.set(image.job_id, jobImages)
          })

          // Convert to GalleryImageGroup array
          const groups: GalleryImageGroup[] = []

          jobGroups.forEach((jobImages, jobId) => {
            // Validate and find before/after pair
            const beforeImages = jobImages.filter(img => img.is_before === true)
            const afterImages = jobImages.filter(img => img.is_before === false)
            
            // Check if we have a valid before/after pair
            const hasValidComparison = beforeImages.length === 1 && afterImages.length === 1

            // Get the before/after images if valid
            const beforeImage = hasValidComparison ? beforeImages[0] : undefined
            const afterImage = hasValidComparison ? afterImages[0] : undefined

            // Sort all images by sequence number or randomly
            const sortedImages = jobImages.sort((a, b) => {
              // If both have sequence numbers, use them
              if (a.sequence_number !== undefined && b.sequence_number !== undefined) {
                return a.sequence_number - b.sequence_number
              }
              // If only one has sequence number, prioritize it
              if (a.sequence_number !== undefined) return -1
              if (b.sequence_number !== undefined) return 1
              
              // If neither has sequence number, randomize
              return Math.random() - 0.5
            })

            // Get remaining images that aren't part of the before/after pair
            const additionalImages = hasValidComparison
              ? sortedImages.filter(img => img !== beforeImage && img !== afterImage)
              : sortedImages

            // Find the thumbnail image (sequence_number 1) for title and description
            const thumbnailImage = sortedImages.find(img => img.sequence_number === 1) || sortedImages[0]
            
            groups.push({
              id: jobId,
              title: thumbnailImage.title,
              description: thumbnailImage.description,
              before: beforeImage,
              after: afterImage,
              additionalImages,
              hasValidComparison,
              allImages: sortedImages
            })
          })

          // Sort groups by the most recent image in each group
          groups.sort((a, b) => {
            const aDate = Math.max(
              ...a.allImages.map(img => new Date(img.created_at).getTime())
            )
            const bDate = Math.max(
              ...b.allImages.map(img => new Date(img.created_at).getTime())
            )
            return bDate - aDate
          })

          setImageGroups(groups)
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load gallery at the moment. Please try again later.')
          console.error('Gallery loading error:', err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchImages()

    return () => {
      isMounted = false
    }
  }, [serviceCategory, subCategory])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-500">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
        <svg 
          className="w-12 h-12 text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (imageGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
        <svg 
          className="w-12 h-12 text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <p className="text-gray-600 font-medium">More Images Coming Soon!</p>
        <p className="text-gray-500 mt-2">We&apos;re currently working on adding our best work to this gallery.</p>
      </div>
    )
  }

  return <GalleryGrid imageGroups={imageGroups} />
} 