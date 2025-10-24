<template>
  <div class="progress-container">
    <!-- Progress Header -->
    <section class="progress-header py-4 bg-yinmn-blue">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="text-white fw-bold mb-2">
              <Icon icon="mdi:chart-donut" width="36" height="36" class="me-2" />
              Your Learning Progress
            </h1>
            <p class="text-white mb-0 opacity-75">
              Track your Hiligaynon learning journey • {{ languageDisplay }} {{ languageEmoji }}
            </p>
          </div>
          <div class="col-lg-4 text-end">
            <div class="overall-score bg-rojo rounded-3 p-3 shadow-sm d-inline-block">
              <div class="text-center">
                <div class="overall-percentage display-6 fw-bold text-white">{{ overallProgress }}%</div>
                <small class="text-white">Overall Progress</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container py-4">
      <!-- Quick Stats Overview -->
      <div class="stats-overview mb-5">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card h-100">
              <div class="card bg-rojo text-white h-100">
                <div class="card-body text-center p-4">
                  <div class="stat-icon mb-3 text-white">
                    <Icon icon="mdi:book-open-variant" width="48" height="48" />
                  </div>
                  <h3 class="stat-number text-white">{{ learnedWords.length }}</h3>
                  <p class="stat-label mb-0 text-white">Words Learned</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card h-100">
              <div class="card bg-yinmn-blue text-white h-100">
                <div class="card-body text-center p-4">
                  <div class="stat-icon mb-3 text-white">
                    <Icon icon="mdi:target" width="48" height="48" />
                  </div>
                  <h3 class="stat-number text-white">{{ quizResults.length }}</h3>
                  <p class="stat-label mb-0 text-white">Quizzes Taken</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card h-100">
              <div class="card bg-rojo text-white h-100">
                <div class="card-body text-center p-4">
                  <div class="stat-icon mb-3 text-white">
                    <Icon icon="mdi:fire" width="48" height="48" />
                  </div>
                  <h3 class="stat-number text-white">{{ currentStreak }}</h3>
                  <p class="stat-label mb-0 text-white">Day Streak</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card h-100">
              <div class="card bg-yinmn-blue text-white h-100">
                <div class="card-body text-center p-4">
                  <div class="stat-icon mb-3 text-white">
                    <Icon icon="mdi:star" width="48" height="48" />
                  </div>
                  <h3 class="stat-number text-white">{{ favoriteWords.length }}</h3>
                  <p class="stat-label mb-0 text-white">Favorites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Progress -->
      <div class="category-progress mb-5">
        <h3 class="section-title mb-4">
          <span class="title-icon">
            <Icon icon="mdi:chart-line" width="24" height="24" />
          </span>
          Progress by Category
        </h3>
        <div class="row">
          <div class="col-lg-6 col-md-12 mb-4" v-for="category in categoryProgress" :key="category.id">
            <div class="progress-card">
              <div class="card card-hua-siong h-100">
                <div class="card-body p-4">
                  <div class="d-flex align-items-center mb-3">
                    <span class="category-icon me-3">
                      <Icon :icon="getCategoryIcon(category.id)" width="32" height="32" />
                    </span>
                    <div class="flex-grow-1">
                      <h5 class="mb-1">{{ category.name }}</h5>
                      <small class="text-muted">{{ category.learned }} / {{ category.total }} words</small>
                    </div>
                    <span class="progress-percentage fw-bold text-rojo">{{ category.percentage }}%</span>
                  </div>
                  
                  <div class="progress mb-3" style="height: 8px;">
                    <div class="progress-bar" 
                         :class="getProgressBarClass(category.percentage)"
                         :style="`width: ${category.percentage}%`"></div>
                  </div>
                  
                  <div class="category-actions d-flex gap-2">
                    <router-link :to="`/vocabulary?category=${category.id}`" 
                                 class="btn btn-sm btn-outline-primary flex-grow-1">
                      <Icon icon="mdi:book-open-variant" width="16" height="16" class="me-1" />
                      Study
                    </router-link>
                    <router-link :to="`/quiz?category=${category.id}`" 
                                 class="btn btn-sm btn-outline-success flex-grow-1">
                      <Icon icon="mdi:target" width="16" height="16" class="me-1" />
                      Quiz
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="recent-activity mb-5">
        <h3 class="section-title mb-4">
          <span class="title-icon">
            <Icon icon="mdi:clock-outline" width="24" height="24" />
          </span>
          Recent Activity
        </h3>
        <div class="activity-timeline">
          <div class="timeline-item" v-for="activity in recentActivities" :key="activity.id">
            <div class="timeline-marker" :class="activity.type"></div>
            <div class="timeline-content">
              <div class="card card-hua-siong">
                <div class="card-body p-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1">{{ activity.title }}</h6>
                      <p class="text-muted small mb-0">{{ activity.description }}</p>
                    </div>
                    <small class="text-muted">{{ formatDate(activity.date) }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quiz Performance -->
      <div class="quiz-performance mb-5">
        <h3 class="section-title mb-4">
          <span class="title-icon">
            <Icon icon="mdi:chart-bar" width="24" height="24" />
          </span>
          Quiz Performance
        </h3>
        
        <div class="row">
          <div class="col-lg-8 mb-4">
            <!-- Quiz Results Chart Placeholder -->
            <div class="card card-hua-siong">
              <div class="card-body p-4">
                <h5 class="card-title mb-4">Quiz Scores Over Time</h5>
                <div class="chart-container" style="height: 300px;">
                  <div class="chart-placeholder d-flex align-items-center justify-content-center h-100 bg-light rounded">
                    <div class="text-center">
                      <div class="chart-icon mb-3">
                        <Icon icon="mdi:chart-line" width="48" height="48" />
                      </div>
                      <p class="text-muted mb-2">Quiz Performance Chart</p>
                      <small class="text-muted">Your quiz scores and improvement trends</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body p-4">
                <h5 class="card-title mb-4">Quiz Stats</h5>
                
                <div class="quiz-stat-item mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span>Average Score</span>
                    <span class="fw-bold text-success">{{ averageQuizScore }}%</span>
                  </div>
                </div>
                
                <div class="quiz-stat-item mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span>Best Score</span>
                    <span class="fw-bold text-primary">{{ bestQuizScore }}%</span>
                  </div>
                </div>
                
                <div class="quiz-stat-item mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span>Total Questions</span>
                    <span class="fw-bold">{{ totalQuestionsAnswered }}</span>
                  </div>
                </div>
                
                <div class="quiz-stat-item mb-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <span>Accuracy Rate</span>
                    <span class="fw-bold text-info">{{ accuracyRate }}%</span>
                  </div>
                </div>
                
                <router-link to="/quiz" class="btn btn-rojo w-100">
                  <Icon icon="mdi:target" width="16" height="16" class="me-1" />
                  Take New Quiz
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Goals -->
      <div class="learning-goals mb-5">
        <h3 class="section-title mb-4">
          <span class="title-icon">
            <Icon icon="mdi:bullseye-arrow" width="24" height="24" />
          </span>
          Learning Goals
        </h3>
        
        <div class="row">
          <div class="col-lg-6 mb-4">
            <div class="goal-card">
              <div class="card">
                <div class="card-body p-4">
                  <h5 class="card-title mb-3">Weekly Goal</h5>
                  <div class="goal-progress mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <span>Learn 20 new words</span>
                      <span class="fw-bold">{{ weeklyProgress }} / 20</span>
                    </div>
                    <div class="progress" style="height: 8px;">
                      <div class="progress-bar bg-success" 
                           :style="`width: ${(weeklyProgress / 20) * 100}%`"></div>
                    </div>
                  </div>
                  <small class="text-muted">{{ 20 - weeklyProgress }} words remaining</small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6 mb-4">
            <div class="goal-card">
              <div class="card">
                <div class="card-body p-4">
                  <h5 class="card-title mb-3">Daily Streak</h5>
                  <div class="streak-display text-center">
                    <div class="streak-number display-5 fw-bold text-warning">{{ currentStreak }}</div>
                    <p class="text-muted mb-3">{{ currentStreak === 1 ? 'day' : 'days' }} in a row!</p>
                    <small class="text-muted">Keep it up! Study daily to maintain your streak.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div class="achievements mb-5">
        <h3 class="section-title mb-4">
          <span class="title-icon">
            <Icon icon="mdi:trophy" width="24" height="24" />
          </span>
          Achievements
        </h3>
        
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4" v-for="achievement in achievements" :key="achievement.id">
            <div class="achievement-card">
              <div class="card h-100" :class="achievement.unlocked ? 'achievement-unlocked' : 'achievement-locked'">
                <div class="card-body text-center p-4">
                  <div class="achievement-icon mb-3">
                    <Icon :icon="getAchievementIcon(achievement.icon)" width="48" height="48" />
                  </div>
                  <h6 class="fw-bold mb-2">{{ achievement.name }}</h6>
                  <p class="small text-muted mb-0">{{ achievement.description }}</p>
                  <div v-if="achievement.unlocked" class="achievement-date mt-2">
                    <small class="text-success">
                      <Icon icon="mdi:check-circle" width="16" height="16" class="me-1" />
                      Unlocked
                    </small>
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
import { getCategoriesList, getAllVocabulary } from '@/data/vocabulary.js'

export default {
  name: 'Progress',
  props: {
    selectedLanguage: {
      type: String,
      default: 'korean'
    }
  },
  setup(props) {
    // Reactive state
    const learnedWords = ref([])
    const favoriteWords = ref([])
    const quizResults = ref([])
    const categories = ref([])
    const currentStreak = ref(1)
    const weeklyProgress = ref(0)

    // Computed properties
    const languageDisplay = computed(() => {
      return props.selectedLanguage === 'korean' ? 'Korean (한국어)' : 'Chinese (中文)'
    })

    const languageEmoji = computed(() => {
      return props.selectedLanguage === 'korean' ? '🇰🇷' : '🇨🇳'
    })

    const overallProgress = computed(() => {
      const totalWords = getAllVocabulary().length
      return totalWords > 0 ? Math.round((learnedWords.value.length / totalWords) * 100) : 0
    })

    const categoryProgress = computed(() => {
      return categories.value.map(category => {
        const categoryWords = getAllVocabulary().filter(word => {
          // This is a simplified way to categorize - in a real app, you'd have proper category mapping
          if (category.id === 'greetings') return word.id >= 1 && word.id <= 5
          if (category.id === 'food') return word.id >= 6 && word.id <= 10
          if (category.id === 'school') return word.id >= 11 && word.id <= 15
          if (category.id === 'transportation') return word.id >= 16 && word.id <= 20
          if (category.id === 'shopping') return word.id >= 21 && word.id <= 25
          return false
        })
        
        const learned = categoryWords.filter(word => learnedWords.value.includes(word.id)).length
        const total = categoryWords.length
        const percentage = total > 0 ? Math.round((learned / total) * 100) : 0

        return {
          ...category,
          learned,
          total,
          percentage
        }
      })
    })

    const averageQuizScore = computed(() => {
      if (quizResults.value.length === 0) return 0
      const total = quizResults.value.reduce((sum, result) => sum + result.percentage, 0)
      return Math.round(total / quizResults.value.length)
    })

    const bestQuizScore = computed(() => {
      if (quizResults.value.length === 0) return 0
      return Math.max(...quizResults.value.map(result => result.percentage))
    })

    const totalQuestionsAnswered = computed(() => {
      return quizResults.value.reduce((sum, result) => sum + result.totalQuestions, 0)
    })

    const accuracyRate = computed(() => {
      const totalCorrect = quizResults.value.reduce((sum, result) => sum + result.score, 0)
      const totalQuestions = totalQuestionsAnswered.value
      return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    })

    const recentActivities = computed(() => {
      const activities = []
      
      // Add recent quiz results
      quizResults.value.slice(-5).forEach(quiz => {
        activities.push({
          id: `quiz_${quiz.date}`,
          type: 'quiz',
          title: 'Quiz Completed',
          description: `Scored ${quiz.percentage}% on ${quiz.category || 'All Categories'} quiz`,
          date: new Date(quiz.date)
        })
      })
      
      // Add recent learned words (mock data)
      const recentLearned = learnedWords.value.slice(-3)
      recentLearned.forEach((wordId, index) => {
        const word = getAllVocabulary().find(w => w.id === wordId)
        if (word) {
          activities.push({
            id: `learned_${wordId}`,
            type: 'learned',
            title: 'New Word Learned',
            description: `Learned "${word.hiligaynon}" - ${word.english}`,
            date: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)) // Mock dates
          })
        }
      })
      
      // Sort by date (newest first) and limit to 5
      return activities.sort((a, b) => b.date - a.date).slice(0, 5)
    })

    const achievements = ref([
      {
        id: 1,
        name: 'First Steps',
        description: 'Learn your first 5 words',
        icon: '👶',
        unlocked: false
      },
      {
        id: 2,
        name: 'Quiz Master',
        description: 'Score 100% on any quiz',
        icon: '🎯',
        unlocked: false
      },
      {
        id: 3,
        name: 'Dedicated Learner',
        description: 'Study for 7 days straight',
        icon: '🔥',
        unlocked: false
      },
      {
        id: 4,
        name: 'Vocabulary Expert',
        description: 'Learn 50 words',
        icon: '📚',
        unlocked: false
      },
      {
        id: 5,
        name: 'Category Champion',
        description: 'Complete all words in a category',
        icon: '🏆',
        unlocked: false
      },
      {
        id: 6,
        name: 'Pronunciation Pro',
        description: 'Use pronunciation feature 50 times',
        icon: '🗣️',
        unlocked: false
      }
    ])

    // Methods
    const loadProgressData = () => {
      // Load learned words
      const saved = localStorage.getItem('learned_words')
      if (saved) {
        learnedWords.value = JSON.parse(saved)
      }
      
      // Load favorite words
      const savedFavorites = localStorage.getItem('favorite_words')
      if (savedFavorites) {
        favoriteWords.value = JSON.parse(savedFavorites)
      }
      
      // Load quiz results
      const savedQuizResults = localStorage.getItem('quiz_results')
      if (savedQuizResults) {
        quizResults.value = JSON.parse(savedQuizResults)
      }
      
      // Calculate weekly progress (simplified)
      weeklyProgress.value = Math.min(20, learnedWords.value.length)
      
      // Update achievements
      updateAchievements()
    }

    const updateAchievements = () => {
      // First Steps - Learn 5 words
      if (learnedWords.value.length >= 5) {
        achievements.value[0].unlocked = true
      }
      
      // Quiz Master - Score 100% on any quiz
      if (quizResults.value.some(result => result.percentage === 100)) {
        achievements.value[1].unlocked = true
      }
      
      // Vocabulary Expert - Learn 50 words
      if (learnedWords.value.length >= 50) {
        achievements.value[3].unlocked = true
      }
      
      // Check for category completion
      const completedCategory = categoryProgress.value.some(cat => cat.percentage === 100)
      if (completedCategory) {
        achievements.value[4].unlocked = true
      }
    }

    const getProgressBarClass = (percentage) => {
      if (percentage >= 80) return 'bg-success'
      if (percentage >= 60) return 'bg-info'
      if (percentage >= 40) return 'bg-warning'
      return 'bg-danger'
    }

    const formatDate = (date) => {
      const now = new Date()
      const diff = now - date
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor(diff / (1000 * 60))

      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      return 'Just now'
    }

    // Achievement icon mapping
    const getAchievementIcon = (emojiIcon) => {
      const iconMap = {
        '🎯': 'mdi:target',
        '🔥': 'mdi:fire',
        '📚': 'mdi:book-open-variant',
        '🏆': 'mdi:trophy',
        '🗣️': 'mdi:account-voice'
      }
      return iconMap[emojiIcon] || 'mdi:star'
    }

    // Category icon mapping
    const getCategoryIcon = (categoryId) => {
      const iconMap = {
        greetings: 'mdi:hand-wave',
        food: 'mdi:silverware-fork-knife',
        school: 'mdi:school',
        transportation: 'mdi:car',
        shopping: 'mdi:shopping'
      }
      return iconMap[categoryId] || 'mdi:book-open-variant'
    }

    // Lifecycle
    onMounted(() => {
      categories.value = getCategoriesList()
      loadProgressData()
    })

    return {
      // State
      learnedWords,
      favoriteWords,
      quizResults,
      currentStreak,
      weeklyProgress,
      achievements,
      
      // Computed
      languageDisplay,
      languageEmoji,
      overallProgress,
      categoryProgress,
      averageQuizScore,
      bestQuizScore,
      totalQuestionsAnswered,
      accuracyRate,
      recentActivities,
      
      // Methods
      getProgressBarClass,
      formatDate,
      getAchievementIcon,
      getCategoryIcon
    }
  }
}
</script>

<style scoped>
.progress-header {
  border-radius: 0 0 20px 20px;
}

.stat-card .card {
  transition: transform 0.2s ease;
}

.stat-card:hover .card {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 3rem;
}

.stat-number {
  font-size: 2.5rem;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.section-title {
  color: var(--rojo);
  border-bottom: 2px solid var(--rojo);
  padding-bottom: 0.5rem;
  font-weight: 600;
}

.title-icon {
  font-size: 1.3rem;
  margin-right: 0.5rem;
}

.progress-card .card {
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.progress-card:hover .card {
  border-left-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-icon {
  font-size: 2rem;
}

.progress-percentage {
  font-size: 1.2rem;
}

.timeline-item {
  position: relative;
  padding-left: 3rem;
  margin-bottom: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #007bff;
}

.timeline-marker.quiz {
  background: #28a745;
}

.timeline-marker.learned {
  background: #ffc107;
}

.timeline-content .card {
  transition: transform 0.2s ease;
}

.timeline-content .card:hover {
  transform: translateX(5px);
}

.chart-placeholder {
  border: 2px dashed #dee2e6;
}

.chart-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.quiz-stat-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.quiz-stat-item:last-child {
  border-bottom: none;
}

.goal-card .card {
  border-left: 4px solid #28a745;
}

.streak-display {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 15px;
  padding: 1.5rem;
}

.achievement-card .card {
  transition: all 0.3s ease;
}

.achievement-unlocked {
  border-color: #28a745;
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.3);
}

.achievement-locked {
  opacity: 0.6;
  filter: grayscale(50%);
}

.achievement-icon {
  font-size: 3rem;
}

.overall-score {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@media (max-width: 768px) {
  .overall-score {
    margin-top: 1rem;
  }
  
  .timeline-item {
    padding-left: 2rem;
  }
  
  .stat-icon {
    font-size: 2.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .achievement-icon {
    font-size: 2.5rem;
  }
}
</style>