<template>
  <div class="categories-container">
    <!-- Hero Section -->
    <section class="hero-section py-5">
      <div class="container text-center text-white">
        <h1 class="display-4 fw-bold mb-4">
          <Icon icon="mdi:library" width="48" height="48" class="me-3" />
          Learning Categories
        </h1>
        <p class="lead mb-4">
          Choose a category to start learning Hiligaynon vocabulary for daily living
        </p>
        <div class="current-language-display p-3 rounded" style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);">
          <span class="fs-5">Learning in: </span>
          <span class="fs-4 fw-bold">{{ languageDisplay }} {{ languageEmoji }}</span>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="category in categories" :key="category.id">
            <div class="category-card h-100" 
                 :class="getCategoryClass(category.id)"
                 @click="selectCategory(category.id)">
              <div class="card-body text-white p-4">
                <div class="text-center mb-4">
                  <div class="category-icon mb-3">
                    <Icon :icon="getCategoryIcon(category.id)" width="64" height="64" />
                  </div>
                  <h4 class="card-title fw-bold mb-2">{{ category.name }}</h4>
                  <p class="card-text mb-3">{{ category.description }}</p>
                  <div class="category-stats">
                    <span class="badge bg-light text-dark px-3 py-2">
                      {{ category.wordCount }} words
                    </span>
                  </div>
                </div>
                
                <!-- Quick Preview -->
                <div class="quick-preview mt-4">
                  <h6 class="fw-bold mb-2">Preview:</h6>
                  <div class="preview-words">
                    <div v-for="(word, index) in getPreviewWords(category.id)" :key="index" 
                         class="preview-word d-flex justify-content-between align-items-center mb-2 p-2 rounded"
                         style="background: rgba(255, 255, 255, 0.2);">
                      <span class="fw-bold">{{ word.hiligaynon }}</span>
                      <span class="small">{{ getTranslation(word) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Progress Indicator -->
                <div class="progress-section mt-4" v-if="getCategoryProgress(category.id) > 0">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="small">Your Progress:</span>
                    <span class="small fw-bold">{{ getCategoryProgress(category.id) }}%</span>
                  </div>
                  <div class="progress" style="height: 8px;">
                    <div class="progress-bar bg-warning" 
                         :style="`width: ${getCategoryProgress(category.id)}%`"></div>
                  </div>
                </div>
              </div>
              
              <!-- Action Button -->
              <div class="card-footer bg-transparent border-0 text-center p-3">
                <button class="btn btn-light btn-lg fw-bold px-4">
                  Start Learning →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Tips Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h3 class="mb-4">
              
              Learning Tips
            </h3>
            <div class="row">
              <div class="col-md-4 mb-3">
                <div class="tip-card p-4 bg-white rounded-3 shadow-sm h-100">
                  <div class="tip-icon mb-3">
                    <Icon icon="mdi:volume-high" width="48" height="48" class="text-rojo" />
                  </div>
                  <h5>Listen & Repeat</h5>
                  <p class="text-muted small">Click the pronunciation button to hear native pronunciation</p>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="tip-card p-4 bg-white rounded-3 shadow-sm h-100">
                  <div class="tip-icon mb-3">
                    <Icon icon="mdi:camera" width="48" height="48" class="text-rojo" />
                  </div>
                  <h5>Visual Learning</h5>
                  <p class="text-muted small">Study with pictures to remember words better</p>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="tip-card p-4 bg-white rounded-3 shadow-sm h-100">
                  <div class="tip-icon mb-3">
                    <Icon icon="mdi:message-text" width="48" height="48" class="text-rojo" />
                  </div>
                  <h5>Practice Daily</h5>
                  <p class="text-muted small">Use these phrases in real conversations with Filipino friends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Category Modal -->
    <div v-if="selectedCategory" class="modal d-block" style="background: rgba(0,0,0,0.8);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" :style="`background: ${selectedCategory.color}`">
            <h5 class="modal-title text-white fw-bold">
              {{ selectedCategory.icon }} {{ selectedCategory.name }}
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body p-4">
            <p class="mb-4">{{ selectedCategory.description }}</p>
            
            <div class="learning-options">
              <h6 class="fw-bold mb-3">Choose your learning mode:</h6>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="learning-mode-card p-3 border rounded cursor-pointer" 
                       @click="startLearningMode('flashcards')">
                    <div class="d-flex align-items-center">
                      <span class="fs-2 me-3">
                        <Icon icon="mdi:cards" width="32" height="32" />
                      </span>
                      <div>
                        <h6 class="mb-1">Flashcards</h6>
                        <small class="text-muted">Study with interactive cards</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="learning-mode-card p-3 border rounded cursor-pointer" 
                       @click="startLearningMode('list')">
                    <div class="d-flex align-items-center">
                      <span class="fs-2 me-3">
                        <Icon icon="mdi:format-list-bulleted" width="32" height="32" />
                      </span>
                      <div>
                        <h6 class="mb-1">List View</h6>
                        <small class="text-muted">Browse all vocabulary</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="learning-mode-card p-3 border rounded cursor-pointer" 
                       @click="startLearningMode('quiz')">
                    <div class="d-flex align-items-center">
                      <span class="fs-2 me-3">🎯</span>
                      <div>
                        <h6 class="mb-1">Quiz Mode</h6>
                        <small class="text-muted">Test your knowledge</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="learning-mode-card p-3 border rounded cursor-pointer" 
                       @click="startLearningMode('pronunciation')">
                    <div class="d-flex align-items-center">
                      <span class="fs-2 me-3">🔊</span>
                      <div>
                        <h6 class="mb-1">Pronunciation</h6>
                        <small class="text-muted">Focus on speaking</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategoriesList, getVocabularyByCategory } from '@/data/vocabulary.js'

export default {
  name: 'Categories',
  props: {
    selectedLanguage: {
      type: String,
      default: 'korean'
    }
  },
  setup(props) {
    const router = useRouter()
    const categories = ref([])
    const selectedCategory = ref(null)

    const languageDisplay = computed(() => {
      return props.selectedLanguage === 'korean' ? 'Korean (한국어)' : 'Chinese (中文)'
    })

    const languageEmoji = computed(() => {
      return props.selectedLanguage === 'korean' ? '🇰🇷' : '🇨🇳'
    })

    const getCategoryIcon = (categoryId) => {
      const iconMap = {
        greetings: 'mdi:hand-wave',
        food: 'mdi:food',
        school: 'mdi:school',
        transportation: 'mdi:car',
        shopping: 'mdi:shopping'
      }
      return iconMap[categoryId] || 'mdi:book-open-variant'
    }

    const selectCategory = (categoryId) => {
      const categoryData = getVocabularyByCategory(categoryId)
      if (categoryData) {
        selectedCategory.value = {
          id: categoryId,
          ...categories.value.find(cat => cat.id === categoryId),
          data: categoryData
        }
      }
    }

    const closeModal = () => {
      selectedCategory.value = null
    }

    const startLearningMode = (mode) => {
      const categoryId = selectedCategory.value.id
      closeModal()
      
      // Navigate to different learning modes
      switch (mode) {
        case 'flashcards':
          router.push(`/vocabulary?category=${categoryId}&mode=flashcards`)
          break
        case 'list':
          router.push(`/vocabulary?category=${categoryId}&mode=list`)
          break
        case 'quiz':
          router.push(`/quiz?category=${categoryId}`)
          break
        case 'pronunciation':
          router.push(`/vocabulary?category=${categoryId}&mode=pronunciation`)
          break
        default:
          router.push(`/vocabulary?category=${categoryId}`)
      }
    }

    const getPreviewWords = (categoryId) => {
      const categoryData = getVocabularyByCategory(categoryId)
      return categoryData ? categoryData.words.slice(0, 3) : []
    }

    const getTranslation = (word) => {
      return props.selectedLanguage === 'korean' ? word.korean : word.chinese
    }

    const getCategoryProgress = (categoryId) => {
      // Get progress from localStorage or return random for demo
      const saved = localStorage.getItem(`progress_${categoryId}`)
      return saved ? parseInt(saved) : Math.floor(Math.random() * 30)
    }

    const getCategoryClass = (categoryId) => {
      if (categoryId === 'food') return 'food'
      return ''
    }

    onMounted(() => {
      categories.value = getCategoriesList()
    })

    return {
      categories,
      selectedCategory,
      languageDisplay,
      languageEmoji,
      selectCategory,
      closeModal,
      startLearningMode,
      getPreviewWords,
      getTranslation,
      getCategoryProgress,
      getCategoryClass,
      getCategoryIcon
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 40vh;
  display: flex;
  align-items: center;
}

.category-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.category-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.preview-word {
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.preview-word:hover {
  background: rgba(255, 255, 255, 0.4) !important;
}

.tip-card {
  transition: transform 0.2s;
}

.tip-card:hover {
  transform: translateY(-5px);
}

.tip-icon {
  font-size: 2.5rem;
}

.learning-mode-card {
  transition: all 0.2s ease;
  cursor: pointer;
}

.learning-mode-card:hover {
  background-color: #f8f9fa !important;
  border-color: #007bff !important;
  transform: translateY(-2px);
}

.current-language-display {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.modal {
  z-index: 1060;
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 768px) {
  .category-icon {
    font-size: 3rem;
  }
  
  .category-card {
    margin-bottom: 1.5rem;
  }
  
  .preview-word {
    font-size: 0.8rem;
  }
}
</style>