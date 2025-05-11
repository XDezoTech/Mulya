/**
 * Format currency values with specified options
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {number} minimumFractionDigits - Minimum fraction digits (default: 0)
 * @returns {string} Formatted price
 */
export const formatPrice = (
  price,
  currency = 'USD',
  minimumFractionDigits = 0,
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
  }).format(price || 0);
};

/**
 * Calculate days remaining until a date
 * @param {Date|string} endTimeDate - End date to compare against
 * @returns {string} Formatted string showing days remaining
 */
export const getDaysRemaining = (endTimeDate) => {
  if (!endTimeDate) return 'No end date';

  const now = new Date();
  const end = new Date(endTimeDate);

  // Calculate the difference in milliseconds
  const diffMs = end - now;

  // If auction has ended
  if (diffMs < 0) return 'Ended';

  // Convert to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Ends today';
  if (diffDays === 1) return '1 day left';
  return `${diffDays} days left`;
};

/**
 * Get image URL with fallback
 * @param {object} item - Item with potential image sources
 * @param {string} fallbackUrl - Fallback URL if no images found
 * @returns {string} Image URL
 */
export const getImageUrl = (
  item,
  fallbackUrl = 'https://via.placeholder.com/60',
) => {
  return (
    (item.auctionImages && item.auctionImages[0]) ||
    (item.images && item.images[0]) ||
    fallbackUrl
  );
};

/**
 * Get display title from object with potential title fields
 * @param {object} item - Item with potential title fields
 * @returns {string} Title to display
 */
export const getDisplayTitle = (item) => {
  return item.auctionTitle || item.title || 'Unnamed Item';
};

/**
 * Get ID from object with potential ID fields
 * @param {object} item - Item with potential ID fields
 * @param {number|string} index - Fallback index if no ID found
 * @returns {string|number} ID to use
 */
export const getItemId = (item, index) => {
  return item.auctionId || item.id || `item-${index}`;
};
