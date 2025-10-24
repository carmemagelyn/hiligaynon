// Google Custom Search API Configuration
// To get these credentials:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing
// 3. Enable Custom Search API
// 4. Create credentials (API Key)
// 5. Create a Custom Search Engine at https://cse.google.com/
// 6. Get the Search Engine ID (cx parameter)

export const imageSearchConfig = {
  // Replace with your Google Custom Search API key
  apiKey: process.env.VITE_GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY_HERE',
  
  // Replace with your Custom Search Engine ID
  searchEngineId: process.env.VITE_GOOGLE_CSE_ID || 'YOUR_SEARCH_ENGINE_ID_HERE',
  
  // API endpoint
  baseUrl: 'https://www.googleapis.com/customsearch/v1',
  
  // Default search parameters for images
  defaultParams: {
    searchType: 'image',
    num: 5, // Number of results per request
    safe: 'active', // Safe search
    imgSize: 'medium', // Image size preference
    imgType: 'photo', // Prefer photos over graphics
    fileType: 'jpg,png', // Preferred file types
    rights: 'cc_publicdomain,cc_attribute,cc_sharealike', // Creative Commons images
  }
}

// Environment variable names for easy reference
export const ENV_VARS = {
  API_KEY: 'VITE_GOOGLE_API_KEY',
  SEARCH_ENGINE_ID: 'VITE_GOOGLE_CSE_ID'
}