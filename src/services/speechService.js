// Speech Service using AWS Polly v3 (Free Tier)
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'

class SpeechService {
  constructor() {
    this.awsRegion = 'us-east-1' // AWS region
    this.voiceId = 'Joanna' // US English female voice (clear and good for learning)
    this.audioCache = new Map() // Cache audio files
    this.pollyClient = null
    
    // Available voices from AWS Polly that work well for Filipino/English learning
    this.availableVoices = [
      'Joanna',  // Female, US English - Clear pronunciation, good for learning
      'Matthew', // Male, US English - Alternative option
      'Amy',     // Female, British English - Another clear option
    ]
    
    // AWS Polly configuration will be set when credentials are provided
    this.awsConfigured = false
  }

  // Set AWS credentials (call this in main.js or when the app initializes)
  setAwsCredentials(accessKeyId, secretAccessKey, region = 'us-east-1') {
    try {
      // Create Polly client with v3 SDK
      this.pollyClient = new PollyClient({
        region: region,
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey
        }
      })
      
      this.awsRegion = region
      this.awsConfigured = true
      
      console.log('AWS Polly v3 configured successfully with clear pronunciation voices')
    } catch (error) {
      console.error('Failed to configure AWS Polly v3:', error)
      this.awsConfigured = false
    }
  }

  // Set voice for clear pronunciation
  setVoice(voiceId = 'Joanna') {
    if (this.availableVoices.includes(voiceId)) {
      this.voiceId = voiceId
    } else {
      console.warn('Voice not available, using default Joanna voice')
      this.voiceId = 'Joanna'
    }
  }



  // Generate speech audio using AWS Polly (Free Tier)
  async generateSpeech(text) {
    try {
      // Check cache first
      const cacheKey = `${this.voiceId}_${text}`
      if (this.audioCache.has(cacheKey)) {
        // Return a fresh URL from cached blob
        const cachedBlob = this.audioCache.get(cacheKey)
        return URL.createObjectURL(cachedBlob)
      }

      // Check if AWS is configured
      if (!this.awsConfigured || !this.pollyClient) {
        console.log('AWS Polly not configured, using browser fallback')
        return null
      }

      // Prepare command for AWS Polly v3
      const command = new SynthesizeSpeechCommand({
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: this.voiceId,
        // Note: Lea voice uses en-US language code in AWS Polly
        LanguageCode: 'en-US',
        Engine: 'standard' // Use standard engine (neural may not be available for Lea)
      })

      // Make request to AWS Polly v3
      const result = await this.pollyClient.send(command)
      
      if (result.AudioStream) {
        try {
          // Use the built-in transformToByteArray method
          const audioBytes = await result.AudioStream.transformToByteArray()
          
          // Create blob with correct MIME type
          const audioBlob = new Blob([audioBytes], { 
            type: 'audio/mp3' 
          })
          
          // Create object URL
          const audioUrl = URL.createObjectURL(audioBlob)
          
          // Cache the blob for reuse
          this.audioCache.set(cacheKey, audioBlob)
          
          console.log(`Generated clear speech with AWS Polly v3 voice: ${this.voiceId} (${audioBytes.length} bytes)`)
          return audioUrl
        } catch (streamError) {
          console.error('Error processing audio stream:', streamError)
          throw streamError
        }
      } else {
        throw new Error('No audio stream received from AWS Polly v3')
      }
    } catch (error) {
      console.error('AWS Polly v3 generation failed:', error)
      // Check if it's a free tier limit error
      if (error.name === 'ThrottlingException' || error.name === 'LimitExceededException') {
        console.warn('AWS Polly v3 free tier limit reached, using browser fallback')
      }
      return null // Will use fallback
    }
  }

  // Play speech audio with Filipino accent using AWS Polly
  async playPronunciation(text) {
    try {
      // If AWS is not configured, use fallback
      if (!this.awsConfigured) {
        console.log('AWS Polly not configured, using browser fallback')
        return this.fallbackToWebSpeech(text)
      }

      const audioUrl = await this.generateSpeech(text)
      
      if (audioUrl) {
        console.log(`Loading AWS Polly v3 audio (${this.voiceId})...`)
        
        const audio = new Audio(audioUrl)
        
        // Simple event handlers
        audio.addEventListener('canplay', () => {
          console.log('AWS Polly v3 audio ready')
        })
        
        audio.addEventListener('ended', () => {
          console.log(`Played pronunciation: "${text}" with AWS Polly v3 voice ${this.voiceId}`)
          URL.revokeObjectURL(audioUrl)
        })
        
        audio.addEventListener('error', (e) => {
          console.error('AWS Polly v3 audio playback error:', e)
          URL.revokeObjectURL(audioUrl)
          this.fallbackToWebSpeech(text)
        })
        
        // Try to play
        try {
          await audio.play()
        } catch (playError) {
          console.error('Failed to play AWS Polly audio:', playError)
          URL.revokeObjectURL(audioUrl)
          this.fallbackToWebSpeech(text)
        }
      } else {
        // Fallback to Web Speech API
        this.fallbackToWebSpeech(text)
      }
    } catch (error) {
      console.error('Error playing AWS Polly v3 pronunciation:', error)
      // Fallback to Web Speech API
      this.fallbackToWebSpeech(text)
    }
  }

  // Fallback to Web Speech API with Philippine accent settings
  fallbackToWebSpeech(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Load voices if not already loaded
      let voices = speechSynthesis.getVoices()
      if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          voices = speechSynthesis.getVoices()
          this.speakWithBestVoice(utterance, voices, text)
        })
        return
      }
      
      this.speakWithBestVoice(utterance, voices, text)
    } else {
      console.warn('Speech synthesis not supported in this browser')
    }
  }

  // Helper method to find and use the best Philippine voice
  speakWithBestVoice(utterance, voices, text) {
    // Priority order for finding Philippine/Filipino voices
    const philippineVoice = voices.find(voice => 
      voice.lang.includes('fil-PH') || 
      voice.lang.includes('tl-PH') ||
      voice.name.toLowerCase().includes('blessica') ||
      voice.name.toLowerCase().includes('filipino') ||
      voice.name.toLowerCase().includes('tagalog') ||
      voice.name.toLowerCase().includes('philippine')
    )
    
    if (philippineVoice) {
      utterance.voice = philippineVoice
      utterance.lang = philippineVoice.lang
      console.log(`Using Philippine voice: ${philippineVoice.name} (${philippineVoice.lang})`)
    } else {
      utterance.lang = 'fil-PH' // Filipino fallback
      console.log('Using fallback Filipino language code: fil-PH')
    }
    
    // Optimize for Philippine/Hiligaynon pronunciation
    utterance.rate = 0.8   // Slower rate for clearer Filipino pronunciation
    utterance.pitch = 1.0  // Natural pitch for Philippine accent
    utterance.volume = 1.0 // Full volume
    
    speechSynthesis.speak(utterance)
  }

  // Preload common words for better performance
  async preloadCommonWords(wordList) {
    const promises = wordList.slice(0, 10).map(word => 
      this.generateSpeech(word.hiligaynon)
    )
    
    try {
      await Promise.all(promises)
      console.log('Preloaded common pronunciations')
    } catch (error) {
      console.warn('Failed to preload some pronunciations:', error)
    }
  }

  // Clear cache (useful for memory management)
  clearCache() {
    this.audioCache.clear()
  }

  // Get cache size
  getCacheSize() {
    return this.audioCache.size
  }
}

// Create singleton instance
const speechService = new SpeechService()

export default speechService