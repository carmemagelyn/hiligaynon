<template>
  <div class="pronunciation-card" v-if="word">
    <div class="card shadow-lg">
      <div class="card-header bg-gradient-primary text-white text-center py-4">
        <h3 class="mb-0">
          <Icon icon="mdi:volume-high" width="28" height="28" class="me-2" />
          Pronunciation Practice
        </h3>
        <small>Listen, Learn, Repeat</small>
      </div>
      
      <div class="card-body p-5 text-center">
        <!-- Main Word Display -->
        <div class="main-word-display mb-4">
          <h1 class="display-3 fw-bold text-primary mb-2">{{ word.hiligaynon }}</h1>
          <div class="pronunciation-guide mb-3">
            <code class="fs-4 pronunciation-text">{{ word.pronunciation }}</code>
          </div>
        </div>
        
        <!-- Translation Display -->
        <div class="translation-display mb-4">
          <h4 class="text-success mb-2">{{ getTranslation() }}</h4>
          <p class="text-muted fs-5">{{ word.english }}</p>
        </div>
        
        <!-- Audio Controls -->
        <div class="audio-controls mb-4">
          <div class="row justify-content-center">
            <div class="col-auto">
              <button class="btn btn-primary btn-lg px-4 py-3 me-3" 
                      @click="playWordPronunciation"
                      :disabled="isPlaying">
                <span v-if="!isPlaying">
                  <Icon icon="mdi:play-circle" width="20" height="20" class="me-2" />
                  Play Word
                </span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Playing...
                </span>
              </button>
            </div>
            <div class="col-auto">
              <button class="btn btn-success btn-lg px-4 py-3" 
                      @click="playSentencePronunciation"
                      :disabled="isPlaying">
                <Icon icon="mdi:account-voice" width="20" height="20" class="me-2" />
                Play Sentence
              </button>
            </div>
          </div>
        </div>
        
        <!-- Example Sentence -->
        <div class="example-sentence-display mb-4">
          <div class="card bg-light">
            <div class="card-body">
              <h6 class="card-title text-muted">Example Sentence:</h6>
              <blockquote class="blockquote mb-3">
                <p class="fs-5 fw-bold text-primary">"{{ word.example_sentence.hiligaynon }}"</p>
              </blockquote>
              <div class="translations">
                <p class="mb-2">
                  <span class="badge bg-secondary me-2">{{ selectedLanguage.toUpperCase() }}</span>
                  {{ getSentenceTranslation() }}
                </p>
                <p class="mb-0">
                  <span class="badge bg-secondary me-2">ENGLISH</span>
                  {{ word.example_sentence.english }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Practice Stats -->
        <div class="practice-stats mb-4">
          <div class="row text-center">
            <div class="col-4">
              <div class="stat-item">
                <div class="stat-number fs-3 fw-bold text-info">{{ practiceCount }}</div>
                <div class="stat-label small text-muted">Times Practiced</div>
              </div>
            </div>
            <div class="col-4">
              <div class="stat-item">
                <div class="stat-number fs-3 fw-bold text-warning">{{ Math.round(confidence) }}%</div>
                <div class="stat-label small text-muted">Confidence</div>
              </div>
            </div>
            <div class="col-4">
              <div class="stat-item">
                <div class="stat-number fs-3 fw-bold text-success">{{ streak }}</div>
                <div class="stat-label small text-muted">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Practice Actions -->
        <div class="practice-actions mb-4">
          <div class="btn-group w-100" role="group">
            <button class="btn btn-outline-success" @click="markAsKnown">
              <Icon icon="mdi:check-circle" width="16" height="16" class="me-1" />
              I Know This
            </button>
            <button class="btn btn-outline-warning" @click="needMorePractice">
              <Icon icon="mdi:alert-circle" width="16" height="16" class="me-1" />
              Need Practice
            </button>
            <button class="btn btn-outline-danger" @click="markAsDifficult">
              <Icon icon="mdi:exclamation-thick" width="16" height="16" class="me-1" />
              Difficult
            </button>
          </div>
        </div>
      </div>
      
      <div class="card-footer bg-light">
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-outline-secondary" @click="previousWord">
            ← Previous
          </button>
          
          <div class="usage-info text-center">
            <small class="text-muted d-block">Usage Context:</small>
            <strong class="small">{{ word.usage }}</strong>
          </div>
          
          <button class="btn btn-outline-secondary" @click="nextWord">
            Next →
          </button>
        </div>
      </div>
    </div>
    
    <!-- Visual Feedback -->
    <div class="visual-feedback" v-if="feedbackMessage">
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ feedbackMessage }}
        <button type="button" class="btn-close" @click="clearFeedback"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'PronunciationCard',
  props: {
    word: {
      type: Object,
      required: true
    },
    selectedLanguage: {
      type: String,
      default: 'korean'
    }
  },
  emits: ['next-word', 'previous-word'],
  setup(props, { emit }) {
    const isPlaying = ref(false)
    const practiceCount = ref(0)
    const confidence = ref(0)
    const streak = ref(1)
    const feedbackMessage = ref('')

    const getTranslation = () => {
      return props.selectedLanguage === 'korean' ? props.word.korean : props.word.chinese
    }

    const getSentenceTranslation = () => {
      return props.selectedLanguage === 'korean' 
        ? props.word.example_sentence.korean 
        : props.word.example_sentence.chinese
    }

    const playWordPronunciation = async () => {
      isPlaying.value = true
      
      try {
        // Use Aivoov API speech service
        const { default: speechService } = await import('@/services/speechService.js')
        await speechService.playPronunciation(props.word.hiligaynon)
        
        isPlaying.value = false
        practiceCount.value++
        updateConfidence(10)
      } catch (error) {
        isPlaying.value = false
        console.error('Speech synthesis error:', error)
        feedbackMessage.value = 'Speech synthesis error occurred'
      }
    }

    const playSentencePronunciation = async () => {
      isPlaying.value = true
      
      try {
        // Use Aivoov API speech service
        const { default: speechService } = await import('@/services/speechService.js')
        await speechService.playPronunciation(props.word.example_sentence.hiligaynon)
        
        isPlaying.value = false
        practiceCount.value++
        updateConfidence(15)
      } catch (error) {
        isPlaying.value = false
        console.error('Speech synthesis error:', error)
      }
    }

    const updateConfidence = (increment) => {
      confidence.value = Math.min(100, confidence.value + increment)
      savePracticeData()
    }

    const markAsKnown = () => {
      confidence.value = Math.min(100, confidence.value + 25)
      feedbackMessage.value = 'Great! Word marked as known'
      savePracticeData()
      setTimeout(clearFeedback, 2000)
    }

    const needMorePractice = () => {
      confidence.value = Math.max(0, confidence.value - 10)
      feedbackMessage.value = 'Added to practice list for review'
      savePracticeData()
      setTimeout(clearFeedback, 2000)
    }

    const markAsDifficult = () => {
      confidence.value = Math.max(0, confidence.value - 20)
      feedbackMessage.value = 'Marked as difficult - will appear more often'
      savePracticeData()
      setTimeout(clearFeedback, 2000)
    }

    const nextWord = () => {
      emit('next-word')
    }

    const previousWord = () => {
      emit('previous-word')
    }

    const clearFeedback = () => {
      feedbackMessage.value = ''
    }

    const savePracticeData = () => {
      if (props.word) {
        const data = {
          practiceCount: practiceCount.value,
          confidence: confidence.value,
          streak: streak.value,
          lastPracticed: new Date().toISOString()
        }
        localStorage.setItem(`practice_${props.word.id}`, JSON.stringify(data))
      }
    }

    const loadPracticeData = () => {
      if (props.word) {
        const saved = localStorage.getItem(`practice_${props.word.id}`)
        if (saved) {
          const data = JSON.parse(saved)
          practiceCount.value = data.practiceCount || 0
          confidence.value = data.confidence || 0
          streak.value = data.streak || 1
        } else {
          // Reset for new word
          practiceCount.value = 0
          confidence.value = 0
          streak.value = 1
        }
      }
    }

    // Watch for word changes to load practice data
    watch(() => props.word, () => {
      if (props.word) {
        loadPracticeData()
      }
    }, { immediate: true })

    return {
      isPlaying,
      practiceCount,
      confidence,
      streak,
      feedbackMessage,
      getTranslation,
      getSentenceTranslation,
      playWordPronunciation,
      playSentencePronunciation,
      markAsKnown,
      needMorePractice,
      markAsDifficult,
      nextWord,
      previousWord,
      clearFeedback
    }
  }
}
</script>

<style scoped>
.pronunciation-card {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease-out;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-word-display {
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  margin-bottom: 2rem;
}

.pronunciation-text {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1565c0;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1.2rem !important;
  font-weight: 600;
  border: 2px solid #2196f3;
}

.translation-display {
  padding: 1.5rem;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border-radius: 12px;
  border-left: 5px solid #4caf50;
}

.audio-controls button {
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.audio-controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.stat-item {
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 0.25rem;
}

.stat-number {
  display: block;
  margin-bottom: 0.25rem;
}

.practice-actions .btn {
  transition: all 0.2s ease;
}

.practice-actions .btn:hover {
  transform: translateY(-1px);
}

.example-sentence-display .card {
  border: 2px solid #e9ecef;
}

.visual-feedback {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  min-width: 300px;
}

.usage-info {
  flex: 1;
  padding: 0 1rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.audio-controls button:active {
  animation: pulse 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .main-word-display {
    padding: 1rem;
  }
  
  .pronunciation-text {
    font-size: 1rem !important;
  }
  
  .audio-controls .btn {
    padding: 0.75rem 1.5rem;
    margin: 0.25rem;
  }
  
  .stat-item {
    margin-bottom: 0.5rem;
  }
  
  .practice-actions .btn-group {
    flex-direction: column;
  }
  
  .practice-actions .btn {
    margin-bottom: 0.25rem;
  }
}
</style>