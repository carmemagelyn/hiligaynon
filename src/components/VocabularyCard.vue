<template>
  <div class="vocabulary-card-container">
    <div class="vocabulary-card" :class="{ flipped: isFlipped, learned: isLearned }">
      <!-- Front Side -->
      <div class="card-face card-front">
        <div class="card">
          <!-- Card Header -->
          <div class="card-header">
            <h6 class="card-title">{{ word.hiligaynon || 'Loading...' }}</h6>
            <button class="pronunciation-btn" @click.stop="playPronunciation" title="Play pronunciation">
              🔊
            </button>
          </div>
          
          <!-- Card Body -->
          <div class="card-body">
            <!-- Image Section -->
            <div class="image-section" v-if="word.hasImage && word.image">
              <img 
                :src="word.image.thumbnailUrl || word.image.url" 
                :alt="word.image.title || word.english"
                class="card-image"
                @error="handleImageError"
              />
            </div>
            
            <!-- Content Section -->
            <div class="content-section">
              <!-- Pronunciation -->
              <div class="pronunciation" v-if="word.pronunciation">
                <small>Pronunciation:</small>
                <code class="pronunciation-text">{{ word.pronunciation }}</code>
              </div>
              
              <!-- Translation -->
              <div class="translation">
                <div class="translation-primary">{{ getTranslation() || 'Loading...' }}</div>
                <div class="translation-secondary">{{ word.english || 'Loading English...' }}</div>
              </div>
            </div>
          </div>
          
          <!-- Card Footer -->
          <div class="card-footer">
            <button class="btn btn-example" @click.stop="flipCard">
              <Icon icon="mdi:book-open-variant" width="14" height="14" />
              Example
            </button>
            <button 
              class="btn btn-learn" 
              :class="{ learned: isLearned }"
              @click.stop="toggleLearned">
              <Icon :icon="isLearned ? 'mdi:check' : 'mdi:plus'" width="14" height="14" />
              {{ isLearned ? 'Learned' : 'Learn' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Back Side -->
      <div class="card-face card-back">
        <div class="card">
          <!-- Card Header -->
          <div class="card-header">
            <h6 class="card-title">Example Sentence</h6>
            <button class="back-btn" @click.stop="flipCard">
              <Icon icon="mdi:arrow-left" width="14" height="14" />
              Back
            </button>
          </div>
          
          <!-- Card Body -->
          <div class="card-body">
            <div class="examples">
              <!-- Hiligaynon Example -->
              <div class="example-item">
                <div class="example-header">
                  <small>HILIGAYNON:</small>
                  <button class="pronunciation-btn small" @click.stop="playSentence(word.example_sentence.hiligaynon)">
                    🔊
                  </button>
                </div>
                <div class="example-text">"{{ word.example_sentence.hiligaynon }}"</div>
              </div>
              
              <!-- Translation Example -->
              <div class="example-item">
                <small>{{ selectedLanguage === 'korean' ? 'KOREAN' : 'CHINESE' }}:</small>
                <div class="example-text">"{{ getSentenceTranslation() }}"</div>
              </div>
              
              <!-- English Example -->
              <div class="example-item">
                <small>ENGLISH:</small>
                <div class="example-text">"{{ word.example_sentence.english }}"</div>
              </div>
              
              <!-- Usage -->
              <div class="usage-item">
                <small>USAGE:</small>
                <div class="usage-text">{{ word.usage }}</div>
              </div>
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
      console.log('Card flipped:', isFlipped.value)
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
/* ===== BASE STYLES ===== */

/* Container with perspective for 3D flip */
.vocabulary-card-container {
  width: 100%;
  height: 550px;
  perspective: 1000px;
  animation: fadeInUp 0.6s ease-out;
}

/* Vocabulary Card - Main flip container */
.vocabulary-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  cursor: pointer;
}

.vocabulary-card.flipped {
  transform: rotateY(180deg);
}

/* Card Faces - Front and Back */
.card-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 12px;
}

.card-front {
  z-index: 2;
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

/* Card Structure */
.card {
  width: 100%;
  height: 100%;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #007bff;
}

/* ===== CARD HEADER ===== */

.card-header {
  flex-shrink: 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  padding: 0.75rem 1rem;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.card-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pronunciation-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #007bff;
  background: white;
  color: #007bff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pronunciation-btn:hover {
  background: #007bff;
  color: white;
  transform: scale(1.1);
}

.pronunciation-btn.small {
  width: 28px;
  height: 28px;
  font-size: 12px;
}

.back-btn {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #e5e7eb;
}

/* ===== CARD BODY ===== */

.card-body {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
}

/* Image Section */
.image-section {
  flex-shrink: 0;
}

.card-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: block;
}

/* Content Section */
.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 0.75rem;
}

.pronunciation {
  margin-bottom: 0.5rem;
}

.pronunciation small {
  display: block;
  color: #6b7280;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.pronunciation-text {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
}

.translation {
  text-align: center;
}

.translation-primary {
  font-size: 1.25rem;
  font-weight: 600;
  color: #059669;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.translation-secondary {
  font-size: 1rem;
  color: #6b7280;
  font-style: italic;
}

/* ===== CARD FOOTER ===== */

.card-footer {
  flex-shrink: 0;
  border-top: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  min-height: 60px;
  background: white;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.5rem 1rem;
  min-height: 40px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
}

.btn-example {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-example:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.btn-learn {
  background: #10b981;
  color: white;
  border: 1px solid #10b981;
}

.btn-learn:hover {
  background: #059669;
  border-color: #059669;
}

.btn-learn.learned {
  background: #059669;
  border-color: #059669;
}

/* ===== EXAMPLES (BACK SIDE) ===== */

.examples {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
}

.example-item {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.example-item:last-child {
  border-bottom: none;
}

.example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
}

.example-item small {
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.example-text {
  color: #374151;
  font-style: italic;
  line-height: 1.4;
  margin-top: 0.25rem;
}

.usage-item {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 2px solid #e5e7eb;
}

.usage-text {
  color: #6b7280;
  line-height: 1.4;
  margin-top: 0.25rem;
}

/* ===== LEARNED STATE ===== */

.vocabulary-card.learned .card {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

/* ===== RESPONSIVE DESIGN ===== */

/* Small Mobile (≤480px) - Use show/hide instead of 3D flip */
@media (max-width: 480px) {
  .vocabulary-card-container {
    height: 540px;
  }
  
  .vocabulary-card {
    transform-style: flat;
    transition: none;
  }
  
  .vocabulary-card.flipped {
    transform: none;
  }
  
  .card-face {
    backface-visibility: visible;
    -webkit-backface-visibility: visible;
    transform: none;
  }
  
  .card-front {
    position: relative;
    display: block;
  }
  
  .card-back {
    position: absolute;
    display: none;
  }
  
  .vocabulary-card.flipped .card-front {
    display: none;
  }
  
  .vocabulary-card.flipped .card-back {
    display: block;
    position: relative;
  }
  
  .card-header {
    padding: 0.5rem 0.75rem;
    min-height: 50px;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .pronunciation-btn {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
  
  .card-body {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .card-image {
    height: 200px;
  }
  
  .translation-primary {
    font-size: 1.1rem;
  }
  
  .translation-secondary {
    font-size: 0.9rem;
  }
  
  .card-footer {
    padding: 0.5rem 0.75rem;
    min-height: 50px;
    gap: 0.5rem;
  }
  
  .btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
    min-height: 36px;
    gap: 0.25rem;
  }
}

/* Tablet (481px - 767px) - Inherits all base 3D flip styles */
@media (min-width: 481px) and (max-width: 767px) {
  .vocabulary-card-container {
    height: 500px;
    perspective: 1000px;
    display: block;
    visibility: visible;
  }
  
  .vocabulary-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    display: block;
    visibility: visible;
  }
  
  .vocabulary-card.flipped {
    transform: rotateY(180deg);
  }
  
  .card-face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: block;
    visibility: visible;
  }
  
  .card-front {
    z-index: 2;
    transform: rotateY(0deg);
  }
  
  .card-back {
    transform: rotateY(180deg);
  }
  
  .card {
    width: 100%;
    height: 100%;
    display: flex;
    visibility: visible;
  }
  
  .card-image {
    height: 220px;
  }
}

/* Tablet Landscape (768px - 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .vocabulary-card-container {
    height: 550px;
  }
  
  .card-image {
    height: 240px;
  }
}

/* Desktop (992px - 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .vocabulary-card-container {
    height: 580px;
  }
  
  .card-image {
    height: 260px;
  }
}

/* Large Desktop (≥1200px) */
@media (min-width: 1200px) {
  .vocabulary-card-container {
    height: 580px;
  }
  
  .card-image {
    height: 280px;
  }
}

/* ===== ANIMATIONS ===== */

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
</style>