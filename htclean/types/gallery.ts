export type ServiceCategory = 'car-detailing' | 'window-cleaning';
export type CarDetailingCategory = 'sedans' | 'suvs' | 'trucks';
export type WindowCleaningCategory = 'window-cleaning' | 'power-washing';
export type SubCategory = CarDetailingCategory | WindowCleaningCategory;

export interface GalleryImage {
  id: string;
  url: string;
  alt_text?: string;
  title?: string;
  description?: string;
  service_category: ServiceCategory;
  sub_category: SubCategory;
  created_at: string;
  job_id: string;  // Used to group all images from the same job
  is_before?: boolean; // Indicates if this is a "before" photo in a pair
  sequence_number?: number; // Optional ordering for gallery view
}

// Type for grouped images (before/after pairs or single images)
export interface GalleryImageGroup {
  id: string; // Will be job_id
  title?: string;
  description?: string;
  before?: GalleryImage;
  after?: GalleryImage;
  additionalImages: GalleryImage[]; // Additional images for the gallery view
  hasValidComparison: boolean; // Indicates if the group has a valid before/after pair
  allImages: GalleryImage[]; // All images in sequence order
} 