import axios from 'axios'
import { imageSearchConfig } from '@/config/imageSearchConfig.js'

class ImageSearchService {
  constructor() {
    this.cache = new Map() // Cache search results to avoid repeated API calls
    this.isConfigured = this.checkConfiguration()
  }

  checkConfiguration() {
    const hasApiKey = imageSearchConfig.apiKey && imageSearchConfig.apiKey !== 'YOUR_GOOGLE_API_KEY_HERE'
    const hasSearchEngineId = imageSearchConfig.searchEngineId && imageSearchConfig.searchEngineId !== 'YOUR_SEARCH_ENGINE_ID_HERE'
    
    if (!hasApiKey || !hasSearchEngineId) {
      console.warn('Google Custom Search API not configured. Using placeholder images.')
      return false
    }
    
    return true
  }

  /**
   * Search for images related to a vocabulary word
   * @param {Object} word - Vocabulary word object
   * @param {string} word.hiligaynon - Hiligaynon word
   * @param {string} word.english - English translation
   * @param {string} [word.category] - Word category for context
   * @returns {Promise<Array>} Array of image objects
   */
  async searchImages(word) {
    const cacheKey = `${word.hiligaynon}_${word.english}`
    
    // Return cached result if available
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    // Return placeholder if API not configured
    if (!this.isConfigured) {
      return this.getPlaceholderImages(word)
    }

    try {
      // Create search query combining English and Hiligaynon terms
      const searchQuery = this.buildSearchQuery(word)
      
      const response = await axios.get(imageSearchConfig.baseUrl, {
        params: {
          key: imageSearchConfig.apiKey,
          cx: imageSearchConfig.searchEngineId,
          q: searchQuery,
          ...imageSearchConfig.defaultParams
        },
        timeout: 5000 // 5 second timeout
      })

      const images = this.processSearchResults(response.data)
      
      // Cache the results
      this.cache.set(cacheKey, images)
      
      return images
    } catch (error) {
      console.error('Image search failed:', error.message)
      
      // Return placeholder images on error
      return this.getPlaceholderImages(word)
    }
  }

  /**
   * Build search query from vocabulary word
   */
  buildSearchQuery(word) {
    const terms = []
    
    // Add English translation (primary search term)
    terms.push(word.english)
    
    // Add category context if available
    if (word.category) {
      terms.push(word.category)
    }
    
    // Add contextual terms based on word usage
    if (word.usage) {
      // Extract meaningful terms from usage description
      const usageTerms = word.usage
        .toLowerCase()
        .split(/[,\s]+/)
        .filter(term => term.length > 3 && !['the', 'and', 'for', 'with'].includes(term))
        .slice(0, 2) // Limit to 2 additional terms
      
      terms.push(...usageTerms)
    }
    
    return terms.join(' ')
  }

  /**
   * Process Google Custom Search API results
   */
  processSearchResults(data) {
    if (!data.items || data.items.length === 0) {
      return []
    }

    return data.items.map(item => ({
      url: item.link,
      thumbnailUrl: item.image?.thumbnailLink || item.link,
      title: item.title || '',
      width: item.image?.width || 0,
      height: item.image?.height || 0,
      size: item.image?.byteSize || 0,
      source: item.displayLink || '',
      contextUrl: item.image?.contextLink || ''
    })).filter(image => 
      // Filter out very small images or invalid URLs
      image.width >= 150 && 
      image.height >= 150 && 
      image.url.match(/\.(jpg|jpeg|png|webp)$/i)
    )
  }

  /**
   * Get placeholder images when API is not available
   */
  getPlaceholderImages(word) {
    const category = word.category || 'general'
    const placeholders = this.getPlaceholdersByCategory(category)
    
    return placeholders.map((placeholder, index) => ({
      url: placeholder.url,
      thumbnailUrl: placeholder.url,
      title: `${word.english} - ${placeholder.description}`,
      width: 300,
      height: 200,
      size: 0,
      source: 'placeholder',
      contextUrl: '#',
      isPlaceholder: true
    }))
  }

  /**
   * Category-based placeholder images using free image services
   */
  getPlaceholdersByCategory(category) {
    const baseUrl = 'https://picsum.photos'
    const unsplashUrl = 'https://source.unsplash.com/300x200'
    
    const categoryMap = {
      greetings: [
        { url: `${unsplashUrl}/?handshake,greeting`, description: 'Greeting gesture' },
        { url: `${unsplashUrl}/?hello,welcome`, description: 'Welcome scene' }
      ],
      food: [
        { url: `${unsplashUrl}/?food,meal`, description: 'Food and meal' },
        { url: `${unsplashUrl}/?restaurant,dining`, description: 'Dining scene' }
      ],
      school: [
        { url: `${unsplashUrl}/?school,education`, description: 'School environment' },
        { url: `${unsplashUrl}/?classroom,learning`, description: 'Learning scene' }
      ],
      transportation: [
        { url: `${unsplashUrl}/?transport,vehicle`, description: 'Transportation' },
        { url: `${unsplashUrl}/?car,travel`, description: 'Travel scene' }
      ],
      shopping: [
        { url: `${unsplashUrl}/?shopping,market`, description: 'Shopping scene' },
        { url: `${unsplashUrl}/?store,retail`, description: 'Retail environment' }
      ]
    }

    return categoryMap[category] || [
      { url: `${baseUrl}/300/200?random=1`, description: 'General image 1' },
      { url: `${baseUrl}/300/200?random=2`, description: 'General image 2' }
    ]
  }

  /**
   * Get the best image for a word (first result)
   */
  async getBestImage(word) {
    const images = await this.searchImages(word)
    return images.length > 0 ? images[0] : null
  }

  /**
   * Clear cache (useful for development)
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Get cache size for debugging
   */
  getCacheSize() {
    return this.cache.size
  }
}

// Create singleton instance
const imageSearchService = new ImageSearchService()

export default imageSearchService