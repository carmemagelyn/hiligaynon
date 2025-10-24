# SpeechGen.io Philippine TTS Setup Guide

## Overview
The application now uses SpeechGen.io's Philippine Text-to-Speech API with **Blessica voice** for authentic Filipino/Hiligaynon pronunciation. This provides much better audio quality and authentic Philippine accent compared to browser's built-in speech synthesis.

## Setup Steps

### 1. Get Your SpeechGen.io Account
1. Visit [SpeechGen.io](https://speechgen.io/)
2. Sign up for an account
3. Fund your account (required for API access)
4. Get your API token from your profile

### 2. Configure the Application
1. Open `src/config/speechConfig.js`
2. Replace the credentials with your actual details:
   ```javascript
   SPEECHGEN_API_TOKEN: 'your-actual-api-token-here',
   SPEECHGEN_EMAIL: 'your-registered-email@gmail.com'
   ```

### 3. Restart the Development Server
```bash
npm run dev
```

## How It Works

### Speech Service Features
- **Authentic Philippine Accent**: Uses Blessica voice specifically trained for Philippine/Filipino pronunciation
- **Native Speaker Quality**: High-quality AI voice with natural Philippine accent patterns
- **Multiple Voice Options**: 8+ authentic Philippine voices available (Blessica, Angelo, Amihan, etc.)
- **Audio Caching**: Caches generated audio to reduce API calls and improve performance
- **Smart Fallback**: Automatically finds Philippine voices in browser if API fails
- **Optimized Settings**: Speed, pitch, and pauses optimized for language learning

### API Request Format
The service sends requests to SpeechGen.io in this format:
```javascript
{
  method: 'POST',
  url: 'https://speechgen.io/index.php?r=api/text',
  formData: {
    'token': 'your-api-token',
    'email': 'your-email@gmail.com',
    'voice': 'Blessica',              // Authentic Philippine female voice
    'text': 'Hiligaynon word or sentence',
    'format': 'mp3',
    'speed': '0.9',                   // Slightly slower for clear pronunciation
    'pitch': '0',                     // Natural pitch
    'emotion': 'good',                // Clear, positive tone
    'pause_sentence': '300',          // Natural pauses
    'bitrate': '48000'               // High quality audio
  }
}
```

### Components Updated
All pronunciation features have been updated to use the new speech service:
- ✅ VocabularyList.vue
- ✅ VocabularyCard.vue  
- ✅ PronunciationCard.vue
- ✅ WordDetailModal.vue
- ✅ Quiz.vue

## Configuration Options

### Voice Settings
You can modify these in `src/config/speechConfig.js`:
- **Primary Voice**: `Blessica` - Female voice with authentic Philippine accent (Default)
- **Alternative Female Voices**: `Amihan`, `Catriona`, `Sandara`
- **Male Voices**: `Angelo`, `Arnel`, `Jacinto`, `Zoren`
- **Speech Quality**: 
  - Speed: 0.9 (slightly slower for clearer pronunciation)
  - Pitch: 0 (natural Philippine pitch patterns)
  - Emotion: 'good' (clear, positive tone)
  - Bitrate: 48000 (high quality audio)
- **Fallback Settings**: 
  - Language: `fil-PH` (Philippine Filipino)
  - Rate: 0.8 (optimized for Philippine pronunciation)
  - Automatic Philippine voice detection

### Cache Settings
- `MAX_CACHE_SIZE`: Maximum number of cached audio files (default: 100)
- `PRELOAD_COUNT`: Number of words to preload on app start (default: 10)

## Troubleshooting

### API Credentials Not Set
If you see console warnings about credentials, make sure:
1. You've replaced 'YOUR_API_KEY' and 'YOUR_EMAIL' in speechConfig.js
2. You've funded your SpeechGen.io account (required for API access)
3. You've restarted the development server
4. Your API token is valid and email matches your registered account

### API Request Failing
If speech falls back to browser synthesis:
1. Check your internet connection
2. Verify your API token and email are correct
3. Ensure your SpeechGen.io account has sufficient balance
4. Check SpeechGen.io service status
5. Look at browser console for detailed error messages
6. Verify CORS settings are properly handled

### Performance Optimization
- The service automatically caches audio files
- Clear cache with `speechService.clearCache()` if needed
- Check cache size with `speechService.getCacheSize()`

## Cost Considerations
- Monitor your SpeechGen.io balance in their dashboard
- The caching system helps reduce unnecessary API calls
- Short texts (under 2000 chars) use the quick API endpoint
- Longer texts use the queued processing system
- Fallback to browser speech synthesis is free
- Consider the text length limit for cost optimization

## Testing
To test the SpeechGen.io integration:
1. Set your API token and email in the config
2. Ensure your account has sufficient balance
3. Click any pronunciation button in the app
4. Check browser console for detailed logs
5. Verify audio plays with authentic Philippine accent
6. Test fallback by temporarily disabling API credentials

## Support
- SpeechGen.io API Documentation: [https://speechgen.io/en/node/api/](https://speechgen.io/en/node/api/)
- SpeechGen.io Support: [https://t.me/speechgen](https://t.me/speechgen)
- Philippine TTS Voices: [https://speechgen.io/en/tts-philippine/](https://speechgen.io/en/tts-philippine/)
- For app-specific issues, check the browser console for detailed error messages

## Why Blessica Voice?
Blessica is specifically chosen because:
- **Authentic Philippine Accent**: Trained on native Philippine speakers
- **Clear Pronunciation**: Excellent for language learning applications
- **Natural Cadence**: Perfect rhythm for Hiligaynon word pronunciation
- **Female Voice**: Generally preferred for educational applications
- **High Quality**: Neural-generated voice with natural speech patterns