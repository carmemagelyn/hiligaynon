# Google Custom Search API Setup Guide

This guide will help you set up Google Custom Search API for image integration in your Hiligaynon Vocabulary Learning App.

## Prerequisites
- Google Account
- Google Cloud Platform project

## Step 1: Enable Google Custom Search API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Library**
4. Search for "Custom Search API"
5. Click on "Custom Search API" and enable it

## Step 2: Create API Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS**
3. Select **API key**
4. Copy the generated API key
5. (Optional) Restrict the API key:
   - Click on the API key to edit
   - Under **API restrictions**, select "Restrict key"
   - Choose "Custom Search API"

## Step 3: Create Custom Search Engine

1. Visit [Google Custom Search Engine](https://cse.google.com/)
2. Click **Add** to create a new search engine
3. In **Sites to search**, enter: `*` (to search the entire web)
4. Give your search engine a name (e.g., "Hiligaynon Vocabulary Images")
5. Click **Create**
6. Click on your newly created search engine
7. In the sidebar, click **Setup** > **Basics**
8. Copy the **Search engine ID** (cx parameter)

## Step 4: Configure Your Application

### Option A: Using Environment Variables (Recommended)

1. Create a `.env.local` file in your project root:
```bash
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_GOOGLE_CSE_ID=your_search_engine_id_here
```

2. Add `.env.local` to your `.gitignore` file to keep credentials secure

### Option B: Direct Configuration

1. Open `src/config/imageSearchConfig.js`
2. Replace the placeholder values:
```javascript
export const imageSearchConfig = {
  apiKey: 'your_api_key_here',
  searchEngineId: 'your_search_engine_id_here',
  // ... rest of config
}
```

## Step 5: Configure Search Engine Settings (Optional)

1. In your Custom Search Engine settings:
   - **Image Search**: Turn ON
   - **SafeSearch**: Turn ON (recommended for educational content)
   - **Sites to search**: You can add specific sites like:
     - `unsplash.com`
     - `pexels.com` 
     - `pixabay.com`
     - `commons.wikimedia.org`

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the vocabulary section
3. Check browser console for any API errors
4. Images should load automatically for vocabulary words

## Usage Limits

### Free Tier
- **100 queries per day**
- **10,000 queries per month**
- **100 queries per 100 seconds per user**

### Paid Tier
- $5 per 1,000 queries after free tier
- Higher rate limits available

## Troubleshooting

### Common Issues

1. **API Key Invalid**
   - Verify API key is correct
   - Ensure Custom Search API is enabled
   - Check API key restrictions

2. **Search Engine ID Invalid**
   - Verify CSE ID is correct
   - Ensure search engine is public

3. **No Images Loading**
   - Check browser console for errors
   - Verify network connectivity
   - Check API quota limits

4. **Rate Limiting**
   - Images are cached to reduce API calls
   - Consider implementing request batching
   - Monitor usage in Google Cloud Console

### Debug Mode

You can check if the API is properly configured by looking at the browser console. The app will automatically fall back to placeholder images if the API is not configured.

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive data
3. **Restrict API keys** to specific APIs and domains
4. **Monitor usage** regularly in Google Cloud Console
5. **Rotate API keys** periodically

## Alternative Image Sources

If you prefer not to use Google Custom Search API, you can:

1. **Use placeholder services**: Unsplash Source, Lorem Picsum
2. **Use local images**: Store images in `public/images/`
3. **Use other APIs**: Unsplash API, Pexels API (free tiers available)

## Support

For issues with:
- **Google Cloud Setup**: [Google Cloud Support](https://cloud.google.com/support)
- **Custom Search API**: [Google Custom Search Documentation](https://developers.google.com/custom-search/v1/introduction)
- **This Application**: Check the console logs for error messages