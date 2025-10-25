<template>
  <div class="vocabulary-container">
    <!-- Header Section -->
    <section class="vocabulary-header py-3 py-md-4 bg-yinmn-blue">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-lg-6 mb-3 mb-lg-0">
            <h1 class="text-white fw-bold mb-2 fs-3 fs-md-1">
              <template v-if="currentCategory">
                {{ currentCategory.icon }} 
                <span class="d-inline d-sm-inline">{{ currentCategory.category }}</span>
              </template>
              <template v-else>
                <Icon icon="mdi:book-open-page-variant" width="28" height="28" class="me-2" />
                <span class="d-none d-sm-inline">All </span>Vocabulary
              </template>
            </h1>
            <p class="text-white-50 mb-0 small">
              Learning in: {{ languageDisplay }} {{ languageEmoji }}
            </p>
          </div>
          <div class="col-12 col-lg-6">
            <div class="vocabulary-controls d-flex gap-2 gap-md-3 justify-content-start justify-content-lg-end flex-wrap">
              <!-- View Mode Toggle -->
              <div class="btn-group btn-group-sm btn-group-md-normal" role="group">
                <button type="button" 
                        :class="['btn', 'btn-sm', 'btn-md-normal', viewMode === 'cards' ? 'btn-rojo' : 'btn-outline-light']"
                        @click="setViewMode('cards')">
                  <Icon icon="mdi:card-multiple-outline" width="16" height="16" class="me-1 me-md-2" />
                  <span class="d-none d-sm-inline">Cards</span>
                </button>
                <button type="button" 
                        :class="['btn', 'btn-sm', 'btn-md-normal', viewMode === 'list' ? 'btn-rojo' : 'btn-outline-light']"
                        @click="setViewMode('list')">
                  <Icon icon="mdi:format-list-bulleted" width="16" height="16" class="me-1 me-md-2" />
                  <span class="d-none d-sm-inline">List</span>
                </button>
                <button type="button" 
                        :class="['btn', 'btn-sm', 'btn-md-normal', viewMode === 'pronunciation' ? 'btn-rojo' : 'btn-outline-light']"
                        @click="setViewMode('pronunciation')">
                  <Icon icon="mdi:volume-high" width="16" height="16" class="me-1 me-md-2" />
                  <span class="d-none d-sm-inline">Audio</span>
                </button>
              </div>
              
              <!-- Shuffle Button -->
              <button class="btn btn-outline-light btn-sm btn-md-normal" @click="shuffleVocabulary">
                <Icon icon="mdi:shuffle-variant" width="16" height="16" class="me-1 me-md-2" />
                <span class="d-none d-sm-inline">Shuffle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-3 bg-light">
      <div class="container">
        <div class="row g-3">
          <div class="col-12 col-lg-8">
            <div class="search-box position-relative">
              <input type="text" 
                     v-model="searchTerm" 
                     class="form-control"
                     placeholder="Search vocabulary..." />
              <span class="search-icon">
                <Icon icon="mdi:magnify" width="20" height="20" />
              </span>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <select v-model="selectedCategoryFilter" class="form-select">
              <option value="">All Categories</option>
              <option v-for="category in allCategories" :key="category.id" :value="category.id">
                {{ category.icon }} {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Vocabulary Content -->
    <section class="py-4">
      <div class="container">
        <!-- Progress Info -->
        <div class="progress-info mb-4 text-center">
          <div class="d-inline-flex align-items-center gap-2 gap-md-3 p-2 p-md-3 bg-white rounded-3 shadow-sm flex-wrap justify-content-center">
            <span class="badge bg-primary">{{ filteredVocabulary.length }} words</span>
            <span class="text-muted d-none d-md-inline">|</span>
            <span class="small text-muted">Progress: {{ overallProgress }}%</span>
            <div class="progress" style="width: 80px; height: 6px;">
              <div class="progress-bar bg-success" :style="`width: ${overallProgress}%`"></div>
            </div>
          </div>
        </div>

        <!-- Cards View -->
        <div v-if="viewMode === 'cards'" class="vocabulary-cards">
          <div class="row g-1">
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-1" v-for="word in paginatedVocabulary" :key="word.id">
              <VocabularyCard 
                :word="word" 
                :selected-language="selectedLanguage"
                @word-learned="markWordLearned"
                @play-pronunciation="playPronunciation"
              />
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else-if="viewMode === 'list'" class="vocabulary-list">
          <div class="card shadow-sm">
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th>Hiligaynon</th>
                      <th>{{ selectedLanguage === 'korean' ? 'Korean' : 'Chinese' }}</th>
                      <th>English</th>
                      <th>Usage</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="word in paginatedVocabulary" :key="word.id" 
                        class="vocabulary-row" 
                        @click="showWordDetail(word)">
                      <td class="fw-bold text-primary">{{ word.hiligaynon }}</td>
                      <td>{{ getTranslation(word) }}</td>
                      <td>{{ word.english }}</td>
                      <td class="small text-muted">{{ word.usage }}</td>
                      <td>
                        <div class="action-buttons">
                          <button class="btn btn-sm btn-outline-primary me-1" 
                                  @click.stop="playPronunciation(word)">
                            <Icon icon="mdi:volume-high" width="16" height="16" />
                          </button>
                          <button class="btn btn-sm btn-outline-success" 
                                  @click.stop="markWordLearned(word)">
                            <Icon :icon="isWordLearned(word.id) ? 'mdi:check-circle' : 'mdi:circle-outline'" width="16" height="16" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Pronunciation Focus View -->
        <div v-else-if="viewMode === 'pronunciation'" class="pronunciation-view">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <PronunciationCard 
                :word="currentPronunciationWord" 
                :selected-language="selectedLanguage"
                @next-word="nextPronunciationWord"
                @previous-word="previousPronunciationWord" />
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-container mt-4" v-if="totalPages > 1">
          <nav>
            <ul class="pagination pagination-sm justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="setPage(currentPage - 1)">
                  <Icon icon="mdi:chevron-left" width="16" height="16" class="d-md-none" />
                  <span class="d-none d-md-inline">Previous</span>
                </button>
              </li>
              <li class="page-item" 
                  v-for="page in visiblePages" 
                  :key="page" 
                  :class="{ active: page === currentPage }">
                <button class="page-link" @click="setPage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="setPage(currentPage + 1)">
                  <Icon icon="mdi:chevron-right" width="16" height="16" class="d-md-none" />
                  <span class="d-none d-md-inline">Next</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <!-- Word Detail Modal -->
    <WordDetailModal 
      v-if="selectedWordDetail"
      :word="selectedWordDetail"
      :selected-language="selectedLanguage"
      @close="closeWordDetail"
      @play-pronunciation="playPronunciation" />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getAllVocabulary, getVocabularyByCategory, getCategoriesList, searchVocabulary } from '@/data/vocabulary.js'
import VocabularyCard from './VocabularyCard.vue'
import PronunciationCard from './PronunciationCard.vue'
import WordDetailModal from './WordDetailModal.vue'

export default {
  name: 'VocabularyList',
  components: {
    VocabularyCard,
    PronunciationCard,
    WordDetailModal
  },
  props: {
    selectedLanguage: {
      type: String,
      default: 'korean'
    }
  },
  setup(props) {
    const route = useRoute()
    
    // Reactive state
    const allVocabulary = ref([])
    const currentCategory = ref(null)
    const allCategories = ref([])
    const viewMode = ref('cards')
    const searchTerm = ref('')
    const selectedCategoryFilter = ref('')
    const currentPage = ref(1)
    const itemsPerPage = ref(12)
    const selectedWordDetail = ref(null)
    const learnedWords = ref(new Set())
    const currentPronunciationIndex = ref(0)

    // Computed properties
    const languageDisplay = computed(() => {
      return props.selectedLanguage === 'korean' ? 'Korean (한국어)' : 'Chinese (中文)'
    })

    const languageEmoji = computed(() => {
      return props.selectedLanguage === 'korean' ? '🇰🇷' : '🇨🇳'
    })

    const filteredVocabulary = computed(() => {
      let filtered = allVocabulary.value

      // Filter by category
      if (selectedCategoryFilter.value) {
        filtered = filtered.filter(word => {
          const categoryData = getVocabularyByCategory(selectedCategoryFilter.value)
          return categoryData && categoryData.words.some(w => w.id === word.id)
        })
      }

      // Filter by search term
      if (searchTerm.value) {
        filtered = searchVocabulary(searchTerm.value, props.selectedLanguage)
      }

      return filtered
    })

    const paginatedVocabulary = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredVocabulary.value.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredVocabulary.value.length / itemsPerPage.value)
    })

    const visiblePages = computed(() => {
      const pages = []
      const start = Math.max(1, currentPage.value - 2)
      const end = Math.min(totalPages.value, currentPage.value + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })

    const overallProgress = computed(() => {
      if (filteredVocabulary.value.length === 0) return 0
      const learnedCount = filteredVocabulary.value.filter(word => 
        learnedWords.value.has(word.id)
      ).length
      return Math.round((learnedCount / filteredVocabulary.value.length) * 100)
    })

    const currentPronunciationWord = computed(() => {
      return filteredVocabulary.value[currentPronunciationIndex.value] || null
    })

    // Methods
    const loadVocabulary = () => {
      const categoryParam = route.query.category
      const modeParam = route.query.mode

      if (categoryParam) {
        const categoryData = getVocabularyByCategory(categoryParam)
        if (categoryData) {
          currentCategory.value = categoryData
          allVocabulary.value = categoryData.words
          selectedCategoryFilter.value = categoryParam
        }
      } else {
        allVocabulary.value = getAllVocabulary()
        currentCategory.value = null
      }

      if (modeParam) {
        viewMode.value = modeParam
      }
    }

    const setViewMode = (mode) => {
      viewMode.value = mode
      if (mode === 'pronunciation' && filteredVocabulary.value.length > 0) {
        currentPronunciationIndex.value = 0
      }
    }

    const shuffleVocabulary = () => {
      allVocabulary.value = [...allVocabulary.value].sort(() => 0.5 - Math.random())
      currentPage.value = 1
    }

    const setPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const getTranslation = (word) => {
      return props.selectedLanguage === 'korean' ? word.korean : word.chinese
    }

    const markWordLearned = (word) => {
      const wordId = word.id
      if (learnedWords.value.has(wordId)) {
        learnedWords.value.delete(wordId)
      } else {
        learnedWords.value.add(wordId)
      }
      
      // Save to localStorage
      localStorage.setItem('learned_words', JSON.stringify([...learnedWords.value]))
    }

    const isWordLearned = (wordId) => {
      return learnedWords.value.has(wordId)
    }

    const playPronunciation = (word) => {
      // Use globally available speech service from main.js
      if (window.speechService) {
        window.speechService.playPronunciation(word.hiligaynon)
      } else {
        // Fallback to importing if global not available
        import('@/services/speechService.js').then(({ default: speechService }) => {
          speechService.playPronunciation(word.hiligaynon)
        })
      }
    }

    const showWordDetail = (word) => {
      selectedWordDetail.value = word
    }

    const closeWordDetail = () => {
      selectedWordDetail.value = null
    }

    const nextPronunciationWord = () => {
      if (currentPronunciationIndex.value < filteredVocabulary.value.length - 1) {
        currentPronunciationIndex.value++
      } else {
        currentPronunciationIndex.value = 0 // Loop back to start
      }
    }

    const previousPronunciationWord = () => {
      if (currentPronunciationIndex.value > 0) {
        currentPronunciationIndex.value--
      } else {
        currentPronunciationIndex.value = filteredVocabulary.value.length - 1 // Loop to end
      }
    }

    const loadLearnedWords = () => {
      const saved = localStorage.getItem('learned_words')
      if (saved) {
        learnedWords.value = new Set(JSON.parse(saved))
      }
    }

    // Watchers
    watch([searchTerm, selectedCategoryFilter], () => {
      currentPage.value = 1
    })

    // Lifecycle
    onMounted(() => {
      allCategories.value = getCategoriesList()
      loadVocabulary()
      loadLearnedWords()
    })

    return {
      // Data
      allVocabulary,
      currentCategory,
      allCategories,
      viewMode,
      searchTerm,
      selectedCategoryFilter,
      currentPage,
      itemsPerPage,
      selectedWordDetail,
      
      // Computed
      languageDisplay,
      languageEmoji,
      filteredVocabulary,
      paginatedVocabulary,
      totalPages,
      visiblePages,
      overallProgress,
      currentPronunciationWord,
      
      // Methods
      setViewMode,
      shuffleVocabulary,
      setPage,
      getTranslation,
      markWordLearned,
      isWordLearned,
      playPronunciation,
      showWordDetail,
      closeWordDetail,
      nextPronunciationWord,
      previousPronunciationWord
    }
  }
}
</script>

<style scoped>
.vocabulary-header {
  border-radius: 0 0 20px 20px;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.vocabulary-row {
  cursor: pointer;
  transition: all 0.2s ease;
}

.vocabulary-row:hover {
  background-color: #f8f9fa;
  transform: translateX(5px);
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.progress-info {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.vocabulary-controls .btn {
  transition: all 0.2s ease;
}

.vocabulary-controls .btn:hover {
  transform: translateY(-2px);
}

.pagination .page-link {
  border-color: #dee2e6;
  color: #007bff;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .vocabulary-header {
    padding: 1rem 0 !important;
  }
  
  .vocabulary-header h1 {
    font-size: 1.5rem !important;
  }
  
  .vocabulary-controls {
    justify-content: flex-start !important;
    gap: 0.5rem !important;
  }
  
  /* Remove gaps on mobile */
  .vocabulary-cards .row {
    margin: 0 !important;
    --bs-gutter-x: 0.25rem !important;
    --bs-gutter-y: 0.25rem !important;
  }
  
  .vocabulary-cards [class*="col-"] {
    margin-bottom: 0.25rem !important;
    padding-left: 0.125rem !important;
    padding-right: 0.125rem !important;
  }
  
  .vocabulary-controls .btn-group .btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
  }
  
  .vocabulary-controls button {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
  }
  
  /* Search section mobile */
  .search-box input {
    font-size: 1rem;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
  }
  
  .search-icon {
    right: 0.75rem;
  }
  
  /* Progress info mobile */
  .progress-info .badge {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
  
  /* Ensure vocabulary content is visible on mobile */
  .vocabulary-cards, .vocabulary-list {
    width: 100% !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  .vocabulary-cards .row {
    margin: 0 -0.5rem;
  }
  
  .vocabulary-cards [class*="col-"] {
    padding: 0 0.5rem;
    margin-bottom: 1rem !important;
  }
  
  /* Mobile vocabulary display fixes */
  .vocabulary-cards {
    width: 100% !important;
    display: block !important;
  }
  
  .vocabulary-cards .row {
    width: 100% !important;
    display: flex !important;
    flex-wrap: wrap !important;
  }
  
  /* Force vocabulary card container to show */
  .vocabulary-card-container {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    min-height: 240px !important;
  }
  
  /* Pagination mobile */
  .pagination {
    margin-bottom: 0;
  }
  
  .pagination .page-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .vocabulary-header h1 {
    font-size: 1.25rem !important;
  }
  
  .vocabulary-controls .btn-group .btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
  
  .vocabulary-controls .btn-group .btn span {
    display: none !important;
  }
  
  .vocabulary-controls button {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
  
  .progress-info {
    margin-bottom: 1rem !important;
  }
  
  .vocabulary-cards [class*="col-"] {
    padding: 0 0.25rem;
    margin-bottom: 0.75rem !important;
  }
  
  .vocabulary-card-container {
    min-height: 200px !important;
  }
}

/* Extra small devices (390px and below) */
@media (max-width: 390px) {
  .vocabulary-header {
    padding: 0.75rem 0 !important;
  }
  
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .vocabulary-controls {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.5rem !important;
  }
  
  /* Ultra-tight spacing on very small screens */
  .vocabulary-cards .row {
    margin: 0 !important;
    --bs-gutter-x: 0.125rem !important;
    --bs-gutter-y: 0.125rem !important;
  }
  
  .vocabulary-cards [class*="col-"] {
    margin-bottom: 0.125rem !important;
    padding-left: 0.0625rem !important;
    padding-right: 0.0625rem !important;
  }
  
  .vocabulary-controls .btn-group {
    width: 100%;
    justify-content: space-between;
  }
  
  .vocabulary-controls .btn-group .btn {
    flex: 1;
    padding: 0.5rem 0.25rem;
  }
  
  .progress-info .d-inline-flex {
    flex-direction: column !important;
    gap: 0.5rem !important;
  }
  
  .vocabulary-cards .row {
    margin: 0 -0.25rem;
  }
  
  .vocabulary-cards [class*="col-"] {
    padding: 0 0.25rem;
    margin-bottom: 0.5rem !important;
  }
  
  .vocabulary-card-container {
    min-height: 220px !important;
  }
}
</style>