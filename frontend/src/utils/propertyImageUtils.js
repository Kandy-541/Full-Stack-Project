// Utility to get property images based on type
// Use remote image URLs as string constants instead of importing them as JS modules.
const apartmentImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop';
export const houseUrl = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop';
const studioImage = 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500&h=400&fit=crop';

export const propertyTypeImages = {
  Apartment: apartmentImage,
  House: houseUrl,
  Studio: studioImage,
};

/**
 * Get image URL for a property
 * @param {string} propertyType - The property type (Apartment, House, Studio)
 * @param {string[]} imageUrls - Array of image URLs from the property
 * @returns {string} The first image URL or a default placeholder
 */

export const getPropertyImage = (propertyType, imageUrls = []) => {
  // If property has custom images, use the first one
  if (imageUrls && imageUrls.length > 0) {
    return imageUrls[0];
  }
  
  // Otherwise, use default placeholder for the property type
  return propertyTypeImages[propertyType] || propertyTypeImages.Apartment;
};

/**
 * Get all images for a property
 * @param {string[]} imageUrls - Array of custom image URLs
 * @param {string} propertyType - The property type for the placeholder
 * @returns {string[]} Array of image URLs with placeholder as fallback
 */

export const getPropertyImages = (imageUrls = [], propertyType = 'Apartment') => {
  if (imageUrls && imageUrls.length > 0) {
    return imageUrls;
  }
  return [propertyTypeImages[propertyType] || propertyTypeImages.Apartment];
};
