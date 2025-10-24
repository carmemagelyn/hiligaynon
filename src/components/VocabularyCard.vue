<template>
  <div class="vocabulary-card-container">
    <div class="vocabulary-card" :class="{ flipped: isFlipped, learned: isLearned }">
      <!-- Front Side -->
      <div class="card-face card-front">
        <div class="card h-100 card-hua-siong">
          <div class="card-header card-header-hua-siong d-flex justify-content-between align-items-center">
            <span class="fw-bold">{{ word.hiligaynon }}</span>
                        <button class="pronunciation-btn" 
                    @click.stop="playPronunciation">
              <Icon icon="mdi:volume-high" width="16" height="16" />
            </button>
          </div>
          
          <div class="card-body p-3">
            <!-- Image Section -->
            <div class="vocabulary-image-container mb-3">
              <!-- Actual Image -->
              <div v-if="word.hasImage && word.image" class="vocabulary-image">
                <img 
                  :src="word.image.thumbnailUrl || word.image.url" 
                  :alt="word.image.title || word.english"
                  class="vocabulary-img"
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
                <div class="image-overlay d-flex align-items-end">
                  <small class="text-white bg-dark bg-opacity-75 px-2 py-1 rounded">
                    {{ word.english }}
                  </small>
                </div>
              </div>
              
              <!-- Loading State -->
              <div v-else-if="isLoadingImage" class="vocabulary-image-placeholder d-flex align-items-center justify-content-center">
                <div class="text-center">
                  <div class="spinner-border spinner-border-sm text-primary mb-2" role="status">
                    <span class="visually-hidden">Loading image...</span>
                  </div>
                  <small class="text-muted d-block">Loading image...</small>
                </div>
              </div>
              
              <!-- Placeholder -->
              <div v-else class="vocabulary-image-placeholder d-flex align-items-center justify-content-center">
                <div class="text-center">
                  <div class="image-icon mb-2">
                    <Icon icon="mdi:image" width="32" height="32" class="text-muted" />
                  </div>
                  <small class="text-muted">{{ word.image_description || 'No image available' }}</small>
                </div>
              </div>
            </div>
            
            <!-- Pronunciation Guide -->
            <div class="pronunciation-guide mb-3">
              <small class="text-muted d-block mb-1">Pronunciation:</small>
              <code class="pronunciation-text">{{ word.pronunciation }}</code>
            </div>
            
            <!-- Translation -->
            <div class="translation mb-3">
              <h6 class="translation-text">{{ getTranslation() }}</h6>
              <small class="text-muted">{{ word.english }}</small>
            </div>
          </div>
          
          <div class="card-footer bg-white border-top d-flex justify-content-between align-items-center p-3">
            <button class="btn btn-yinmn-blue btn-sm text-white fw-bold" @click.stop="flipCard">
              <Icon icon="mdi:book-open-variant" width="16" height="16" class="me-1" />
              Example
            </button>
            <button class="btn btn-sm fw-bold" 
                    :class="isLearned ? 'btn-rojo text-white' : 'btn-outline-rojo'"
                    @click.stop="toggleLearned">
              <Icon :icon="isLearned ? 'mdi:check' : 'mdi:plus'" width="16" height="16" class="me-1" />
              {{ isLearned ? 'Learned' : 'Learn' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Back Side -->
      <div class="card-face card-back">
        <div class="card h-100 card-hua-siong">
          <div class="card-header card-header-hua-siong d-flex justify-content-between align-items-center">
            <span class="fw-bold">Example Sentence</span>
            <button class="btn btn-sm btn-hua-siong-outline-primary" @click.stop="flipCard">
              <Icon icon="mdi:arrow-left" width="16" height="16" class="me-1" />
              Back
            </button>
          </div>
          
          <div class="card-body p-3">
            <!-- Hiligaynon Example -->
            <div class="example-section mb-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="small text-muted fw-bold">HILIGAYNON:</label>
                <button class="pronunciation-btn" 
                        @click.stop="playSentence(word.example_sentence.hiligaynon)">
                  <Icon icon="mdi:volume-high" width="16" height="16" />
                </button>
              </div>
              <p class="example-text fw-bold text-primary mb-3">
                "{{ word.example_sentence.hiligaynon }}"
              </p>
            </div>
            
            <!-- Translation Example -->
            <div class="example-section mb-4">
              <label class="small text-muted fw-bold">{{ selectedLanguage.toUpperCase() }}:</label>
              <p class="example-text mb-2">
                "{{ getSentenceTranslation() }}"
              </p>
            </div>
            
            <!-- English Example -->
            <div class="example-section mb-3">
              <label class="small text-muted fw-bold">ENGLISH:</label>
              <p class="example-text mb-2">
                "{{ word.example_sentence.english }}"
              </p>
            </div>
            
            <!-- Usage Context -->
            <div class="usage-context">
              <label class="small text-muted fw-bold">USAGE:</label>
              <p class="small text-muted mb-0">{{ word.usage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'VocabularyCard',
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
  emits: ['word-learned', 'play-pronunciation'],
  setup(props, { emit }) {
    const isFlipped = ref(false)
    const isLearned = ref(false)
    const isLoadingImage = ref(false)

    const getTranslation = () => {
      return props.selectedLanguage === 'korean' ? props.word.korean : props.word.chinese
    }

    const getSentenceTranslation = () => {
      return props.selectedLanguage === 'korean' 
        ? props.word.example_sentence.korean 
        : props.word.example_sentence.chinese
    }

    const flipCard = () => {
      isFlipped.value = !isFlipped.value
    }

    const toggleLearned = () => {
      isLearned.value = !isLearned.value
      emit('word-learned', props.word)
    }

    const playPronunciation = () => {
      emit('play-pronunciation', props.word)
    }

    const playSentence = (text) => {
      // Use globally available speech service
      if (window.speechService) {
        window.speechService.playPronunciation(text)
      } else {
        // Fallback to importing if global not available
        import('@/services/speechService.js').then(({ default: speechService }) => {
          speechService.playPronunciation(text)
        })
      }
    }

    // Image handling methods
    const handleImageLoad = () => {
      isLoadingImage.value = false
    }

    const handleImageError = (event) => {
      console.warn(`Failed to load image for ${props.word.hiligaynon}:`, event.target.src)
      isLoadingImage.value = false
      
      // Hide the broken image by setting display to none
      event.target.style.display = 'none'
      
      // You could also emit an event to parent to handle fallback
      // emit('image-error', props.word)
    }

    return {
      isFlipped,
      isLearned,
      isLoadingImage,
      getTranslation,
      getSentenceTranslation,
      flipCard,
      toggleLearned,
      playPronunciation,
      playSentence,
      handleImageLoad,
      handleImageError
    }
  }
}
</script>

<style scoped>
.vocabulary-card-container {
  perspective: 1000px;
  height: 450px;
}

.vocabulary-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.vocabulary-card.flipped {
  transform: rotateY(180deg);
}

.vocabulary-card.learned {
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.3);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.vocabulary-image-container {
  height: 120px;
}

.vocabulary-image {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.vocabulary-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.vocabulary-img:hover {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}

.vocabulary-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  border: 2px dashed #dee2e6;
}

.image-icon {
  font-size: 2rem;
  opacity: 0.7;
}

.pronunciation-text {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.translation-text {
  color: #2e7d32;
  margin-bottom: 0.5rem;
}

.example-text {
  font-size: 1rem;
  line-height: 1.4;
  padding: 10px;
  background: #f8f9fa;
  border-left: 4px solid #007bff;
  border-radius: 0 4px 4px 0;
}

.example-section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 0.75rem;
}

.example-section:last-child {
  border-bottom: none;
}

.pronunciation-btn:hover {
  transform: scale(1.1);
}

.vocabulary-card:hover {
  transform: translateY(-5px) scale(1.02);
}

.vocabulary-card.flipped:hover {
  transform: rotateY(180deg) translateY(-5px) scale(1.02);
}

.usage-context {
  background: #fff3cd;
  padding: 10px;
  border-radius: 6px;
  border-left: 4px solid #ffc107;
}

@media (max-width: 768px) {
  .vocabulary-card-container {
    height: 350px;
  }
  
  .vocabulary-image-container {
    height: 80px;
  }
  
  .example-text {
    font-size: 0.9rem;
    padding: 8px;
  }
}

/* Animation for card appearance */
.vocabulary-card-container {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>