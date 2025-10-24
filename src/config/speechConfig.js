// Speech API Configuration - AWS Polly (Free Tier)
export const SPEECH_CONFIG = {
  // AWS Credentials - Use environment variables for security
  AWS_ACCESS_KEY_ID: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  AWS_REGION: import.meta.env.VITE_AWS_REGION || 'us-east-1', // AWS region
  
  // AWS Polly settings
  VOICE_ID: 'Joanna', // US English female voice - clear pronunciation for learning
  
  // Available voices from AWS Polly good for language learning
  AVAILABLE_VOICES: {
    PRIMARY: 'Joanna',     // Female, US English - very clear pronunciation
    MALE: 'Matthew',       // Male, US English - alternative option  
    BRITISH: 'Amy',        // Female, British English - another clear option
    // Note: While these aren't Filipino voices, they provide clear pronunciation
    // that's excellent for language learning applications
  },
  
  // AWS Polly speech quality settings
  OUTPUT_FORMAT: 'mp3',    // MP3 format for broad compatibility
  SAMPLE_RATE: '22050',    // 22.05 kHz - good quality for speech
  TEXT_TYPE: 'text',       // Plain text input (not SSML)
  
  // Audio processing settings
  AUDIO_SETTINGS: {
    volume: 0.8,           // Default volume (80%)
    playback_rate: 1.0,    // Normal speed
    pitch: 1.0             // Normal pitch
  },
  
  // Language learning optimizations
  LEARNING_CONFIG: {
    // Pause between words for pronunciation practice
    word_pause_ms: 500,    // 0.5 second pause
    
    // Repeat settings for practice mode
    repeat_count: 2,       // Say each word/phrase twice
    repeat_pause_ms: 1000, // 1 second pause between repeats
    
    // Speed settings for beginners
    slow_speed: 0.75,      // 75% speed for learning mode
    normal_speed: 1.0      // Normal speed for advanced learners
  },
  
  // Cost optimization (AWS Free Tier: 5 million characters/month)
  USAGE_LIMITS: {
    max_text_length: 3000,     // Max characters per request
    daily_character_limit: 50000, // Conservative daily limit
    cache_duration_hours: 24    // Cache audio files for 24 hours
  }
};

// Voice configuration for different use cases
export const VOICE_PROFILES = {
  DEFAULT: {
    VoiceId: 'Joanna',
    Engine: 'standard'
  },
  MALE_VOICE: {
    VoiceId: 'Matthew', 
    Engine: 'standard'
  },
  BRITISH_ACCENT: {
    VoiceId: 'Amy',
    Engine: 'standard'
  }
};