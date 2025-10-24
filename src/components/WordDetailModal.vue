<template>
  <div class="modal d-block" style="background: rgba(0,0,0,0.8);" @click.self="closeModal">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-rojo text-white">
          <h4 class="modal-title fw-bold">
            📖 {{ word.hiligaynon }}
          </h4>
          <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
        </div>
        
        <div class="modal-body p-4">
          <!-- Word Header -->
          <div class="word-header text-center mb-4">
            <h2 class="display-4 fw-bold text-rojo mb-2">{{ word.hiligaynon }}</h2>
            <div class="pronunciation-section mb-3">
              <code class="pronunciation-badge">{{ word.pronunciation }}</code>
              <button class="btn btn-outline-rojo btn-sm ms-2" @click="playPronunciation">
                <Icon icon="mdi:volume-high" width="16" height="16" class="me-1" />
                Listen
              </button>
            </div>
          </div>

          <!-- Image Placeholder -->
          <div class="image-section mb-4">
            <div class="vocabulary-image-display">
              <div class="image-placeholder d-flex align-items-center justify-content-center">
                <div class="text-center p-4">
                  <div class="image-icon mb-3">🖼️</div>
                  <h6 class="fw-bold mb-2">Visual Context</h6>
                  <p class="text-muted mb-0">{{ word.image_description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Translations -->
          <div class="translations-section mb-4">
            <h5 class="section-title mb-3">
              <span class="title-icon">🌍</span>
              Translations
            </h5>
            <div class="row">
              <div class="col-md-4 mb-3">
                <div class="translation-card h-100">
                  <div class="card card-hua-siong h-100">
                    <div class="card-body text-center">
                      <div class="language-flag mb-2">🇺🇸</div>
                      <h6 class="fw-bold">English</h6>
                      <p class="mb-0">{{ word.english }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="translation-card h-100">
                  <div class="card h-100" :class="selectedLanguage === 'korean' ? 'card-selected' : 'card-hua-siong'">
                    <div class="card-body text-center">
                      <div class="language-flag mb-2">🇰🇷</div>
                      <h6 class="fw-bold">Korean</h6>
                      <p class="mb-0">{{ word.korean }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="translation-card h-100">
                  <div class="card h-100" :class="selectedLanguage === 'chinese' ? 'card-selected' : 'card-hua-siong'">
                    <div class="card-body text-center">
                      <div class="language-flag mb-2">🇨🇳</div>
                      <h6 class="fw-bold">Chinese</h6>
                      <p class="mb-0">{{ word.chinese }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Example Sentences -->
          <div class="examples-section mb-4">
            <h5 class="section-title mb-3">
              <span class="title-icon">💬</span>
              Example Sentences
            </h5>
            
            <div class="example-card mb-3">
              <div class="card card-hua-siong">
                <div class="card-header card-header-hua-siong d-flex justify-content-between align-items-center">
                  <strong class="text-white">Hiligaynon</strong>
                  <button class="btn btn-sm btn-outline-light" 
                          @click="playSentence(word.example_sentence.hiligaynon)">
                    <Icon icon="mdi:play" width="16" height="16" class="me-1" />
                    Play
                  </button>
                </div>
                <div class="card-body">
                  <blockquote class="blockquote mb-0">
                    <p class="fs-5 text-rojo fw-bold">"{{ word.example_sentence.hiligaynon }}"</p>
                  </blockquote>
                </div>
              </div>
            </div>

            <div class="example-card mb-3">
              <div class="card bg-light">
                <div class="card-header">
                  <strong>{{ selectedLanguage === 'korean' ? 'Korean' : 'Chinese' }}</strong>
                </div>
                <div class="card-body">
                  <p class="mb-0">"{{ getSentenceTranslation() }}"</p>
                </div>
              </div>
            </div>

            <div class="example-card mb-3">
              <div class="card bg-light">
                <div class="card-header">
                  <strong>English</strong>
                </div>
                <div class="card-body">
                  <p class="mb-0">"{{ word.example_sentence.english }}"</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Usage Context -->
          <div class="usage-section mb-4">
            <h5 class="section-title mb-3">
              <span class="title-icon">💡</span>
              Usage & Context
            </h5>
            <div class="usage-card">
              <div class="alert alert-info">
                <div class="d-flex align-items-start">
                  <span class="usage-icon me-3">ℹ️</span>
                  <div>
                    <h6 class="fw-bold mb-2">When to use this word:</h6>
                    <p class="mb-0">{{ word.usage }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Categories/Tags -->
          <div class="tags-section mb-4">
            <h5 class="section-title mb-3">
              <span class="title-icon">🏷️</span>
              Categories
            </h5>
            <div class="tags-container">
              <span v-for="tag in word.category_tags" :key="tag" 
                    class="badge bg-secondary me-2 mb-2 p-2">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Practice Actions -->
          <div class="practice-section">
            <h5 class="section-title mb-3">
              <span class="title-icon">
                <Icon icon="mdi:target" width="20" height="20" />
              </span>
              Practice
            </h5>
            <div class="row">
              <div class="col-md-6 mb-2">
                <button class="btn btn-rojo btn-lg w-100" @click="markAsLearned">
                  <span v-if="!isLearned">
                    <Icon icon="mdi:check" width="16" height="16" class="me-1" />
                    Mark as Learned
                  </span>
                  <span v-else>
                    <Icon icon="mdi:check-circle" width="16" height="16" class="me-1" />
                    Learned!
                  </span>
                </button>
              </div>
              <div class="col-md-6 mb-2">
                <button class="btn btn-yinmn-blue btn-lg w-100" @click="addToFavorites">
                  <span v-if="!isFavorite">
                    <Icon icon="mdi:star-outline" width="16" height="16" class="me-1" />
                    Add to Favorites
                  </span>
                  <span v-else>
                    <Icon icon="mdi:star" width="16" height="16" class="me-1" />
                    Favorited!
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer bg-light">
          <div class="d-flex justify-content-between align-items-center w-100">
            <small class="text-muted">
              ID: {{ word.id }} | Category: {{ getCategoryName() }}
            </small>
            <div>
              <button class="btn btn-outline-yinmn-blue me-2" @click="closeModal">
                Close
              </button>
              <button class="btn btn-rojo" @click="startPractice">
                <Icon icon="mdi:target" width="16" height="16" class="me-1" />
                Practice This Word
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'WordDetailModal',
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
  emits: ['close', 'play-pronunciation'],
  setup(props, { emit }) {
    const isLearned = ref(false)
    const isFavorite = ref(false)

    const getSentenceTranslation = () => {
      return props.selectedLanguage === 'korean' 
        ? props.word.example_sentence.korean 
        : props.word.example_sentence.chinese
    }

    const getCategoryName = () => {
      // This would ideally come from the category data
      const categoryMap = {
        greetings: 'Greetings & Politeness',
        food: 'Food & Dining',
        school: 'School Life',
        transportation: 'Transportation',
        shopping: 'Shopping & Market'
      }
      
      // Find category based on word ID ranges or tags
      if (props.word.id <= 5) return 'Greetings & Politeness'
      if (props.word.id <= 10) return 'Food & Dining'
      if (props.word.id <= 15) return 'School Life'
      if (props.word.id <= 20) return 'Transportation'
      return 'Shopping & Market'
    }

    const closeModal = () => {
      emit('close')
    }

    const playPronunciation = () => {
      emit('play-pronunciation', props.word)
    }

    const playSentence = (text) => {
      // Use Aivoov API speech service
      import('@/services/speechService.js').then(({ default: speechService }) => {
        speechService.playPronunciation(text)
      })
    }

    const markAsLearned = () => {
      isLearned.value = !isLearned.value
      // Save to localStorage
      const learnedWords = JSON.parse(localStorage.getItem('learned_words') || '[]')
      if (isLearned.value) {
        if (!learnedWords.includes(props.word.id)) {
          learnedWords.push(props.word.id)
        }
      } else {
        const index = learnedWords.indexOf(props.word.id)
        if (index > -1) {
          learnedWords.splice(index, 1)
        }
      }
      localStorage.setItem('learned_words', JSON.stringify(learnedWords))
    }

    const addToFavorites = () => {
      isFavorite.value = !isFavorite.value
      // Save to localStorage
      const favoriteWords = JSON.parse(localStorage.getItem('favorite_words') || '[]')
      if (isFavorite.value) {
        if (!favoriteWords.includes(props.word.id)) {
          favoriteWords.push(props.word.id)
        }
      } else {
        const index = favoriteWords.indexOf(props.word.id)
        if (index > -1) {
          favoriteWords.splice(index, 1)
        }
      }
      localStorage.setItem('favorite_words', JSON.stringify(favoriteWords))
    }

    const startPractice = () => {
      // This could navigate to a specific practice mode
      closeModal()
    }

    // Load saved states
    const loadSavedStates = () => {
      const learnedWords = JSON.parse(localStorage.getItem('learned_words') || '[]')
      const favoriteWords = JSON.parse(localStorage.getItem('favorite_words') || '[]')
      
      isLearned.value = learnedWords.includes(props.word.id)
      isFavorite.value = favoriteWords.includes(props.word.id)
    }

    // Initialize saved states
    loadSavedStates()

    return {
      isLearned,
      isFavorite,
      getSentenceTranslation,
      getCategoryName,
      closeModal,
      playPronunciation,
      playSentence,
      markAsLearned,
      addToFavorites,
      startPractice
    }
  }
}
</script>

<style scoped>
.modal {
  z-index: 1060;
}

.word-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem;
  border-radius: 15px;
  margin: -1rem -1rem 2rem -1rem;
}

.pronunciation-badge {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1565c0;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid #2196f3;
}

.image-placeholder {
  height: 200px;
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
  border: 2px dashed #cccccc;
  border-radius: 15px;
}

.image-icon {
  font-size: 3rem;
  opacity: 0.7;
}

.section-title {
  color: var(--rojo);
  border-bottom: 2px solid var(--rojo);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem !important;
  font-weight: 600;
}

.title-icon {
  font-size: 1.3rem;
  margin-right: 0.5rem;
}

.translation-card .card {
  transition: all 0.2s ease;
  border: 1px solid #dee2e6;
}

.translation-card .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.example-card .card {
  border-left: 4px solid #007bff;
}

.language-flag {
  font-size: 1.5rem;
}

.usage-icon {
  font-size: 1.5rem;
}

.tags-container .badge {
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.tags-container .badge:hover {
  transform: scale(1.1);
  cursor: default;
}

.practice-section .btn {
  transition: all 0.3s ease;
}

.practice-section .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.vocabulary-image-display {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

@media (max-width: 768px) {
  .word-header {
    padding: 1.5rem;
    margin: -1rem -0.5rem 1.5rem -0.5rem;
  }
  
  .image-placeholder {
    height: 150px;
  }
  
  .image-icon {
    font-size: 2rem;
  }
  
  .practice-section .btn {
    margin-bottom: 0.5rem;
  }
}

/* Animation for modal appearance */
.modal-dialog {
  animation: modalSlideIn 0.4s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>