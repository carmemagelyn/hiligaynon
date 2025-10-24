<template>
  <div class="quiz-container">
    <!-- Quiz Header -->
    <section class="quiz-header py-4 bg-yinmn-blue">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="text-white fw-bold mb-2">
              <Icon icon="mdi:target" width="36" height="36" class="me-2" />
              Hiligaynon Quiz Challenge
            </h1>
            <p class="text-white-50 mb-0">
              Test your knowledge • {{ selectedLanguage === 'korean' ? 'Korean Mode' : 'Chinese Mode' }} {{ languageEmoji }}
            </p>
          </div>
          <div class="col-lg-4 text-end">
            <div class="quiz-stats d-inline-flex bg-white rounded-3 p-3">
              <div class="stat-item me-3">
                <div class="stat-number text-primary fw-bold">{{ currentQuestion + 1 }}</div>
                <div class="stat-label small text-muted">of {{ totalQuestions }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number text-success fw-bold">{{ score }}</div>
                <div class="stat-label small text-muted">Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container py-4">
      <!-- Quiz Not Started -->
      <div v-if="!quizStarted" class="quiz-setup">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card card-hua-siong shadow-lg">
              <div class="card-body p-5 text-center">
                <div class="quiz-icon mb-4">
                  <Icon icon="mdi:school" width="64" height="64" />
                </div>
                <h2 class="mb-4">Ready to Test Your Hiligaynon Knowledge?</h2>
                <p class="lead mb-4">
                  Choose your quiz settings and challenge yourself with Hiligaynon vocabulary!
                </p>

                <!-- Quiz Settings -->
                <div class="quiz-settings mb-5">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label fw-bold">Number of Questions:</label>
                      <select v-model="quizSettings.questionCount" class="form-select form-select-lg">
                        <option value="5">5 Questions (Quick)</option>
                        <option value="10">10 Questions (Standard)</option>
                        <option value="15">15 Questions (Challenge)</option>
                        <option value="20">20 Questions (Master)</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label fw-bold">Category:</label>
                      <select v-model="quizSettings.category" class="form-select form-select-lg">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                          {{ category.icon }} {{ category.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label fw-bold">Quiz Type:</label>
                      <select v-model="quizSettings.quizType" class="form-select form-select-lg">
                        <option value="translation">Translation Quiz</option>
                        <option value="listening">Listening Quiz</option>
                        <option value="sentence">Sentence Completion</option>
                        <option value="mixed">Mixed Questions</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label fw-bold">Difficulty:</label>
                      <select v-model="quizSettings.difficulty" class="form-select form-select-lg">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button class="btn btn-rojo btn-lg px-5 py-3" @click="startQuiz">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Quiz -->
      <div v-else-if="quizStarted && !quizCompleted" class="active-quiz">
        <!-- Progress Bar -->
        <div class="progress-section mb-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-bold">Progress: {{ currentQuestion + 1 }} / {{ totalQuestions }}</span>
            <span class="text-muted">{{ Math.round(((currentQuestion + 1) / totalQuestions) * 100) }}%</span>
          </div>
          <div class="progress" style="height: 10px;">
            <div class="progress-bar bg-success" 
                 :style="`width: ${((currentQuestion + 1) / totalQuestions) * 100}%`"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="question-card mb-4" v-if="currentQuestionData">
          <div class="card card-hua-siong shadow-lg">
            <div class="card-header card-header-hua-siong">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 text-white">Question {{ currentQuestion + 1 }}</h5>
                <span class="badge bg-white text-rojo">{{ getQuestionTypeLabel() }}</span>
              </div>
            </div>
            
            <div class="card-body p-4">
              <!-- Translation Questions -->
              <div v-if="currentQuestionData.type === 'translation'">
                <h4 class="question-text mb-4 text-center">
                  What does "<span class="text-primary fw-bold">{{ currentQuestionData.word.hiligaynon }}</span>" mean?
                </h4>
                <div class="pronunciation-help text-center mb-4">
                  <button class="btn btn-outline-rojo btn-sm" @click="playPronunciation(currentQuestionData.word)">
                    🔊 Pronunciation: {{ currentQuestionData.word.pronunciation }}
                  </button>
                </div>
              </div>

              <!-- Listening Questions -->
              <div v-else-if="currentQuestionData.type === 'listening'">
                <h4 class="question-text mb-4 text-center">
                  Listen and choose the correct translation:
                </h4>
                <div class="listening-section text-center mb-4">
                  <button class="btn btn-rojo btn-lg" @click="playPronunciation(currentQuestionData.word)">
                    🔊 Play Audio
                  </button>
                  <p class="mt-3 text-muted">Click to listen to the Hiligaynon word</p>
                </div>
              </div>

              <!-- Sentence Completion -->
              <div v-else-if="currentQuestionData.type === 'sentence'">
                <h4 class="question-text mb-4 text-center">
                  Complete the sentence:
                </h4>
                <div class="sentence-context mb-4 p-3 bg-light rounded">
                  <p class="mb-2 fw-bold">Context: {{ currentQuestionData.context }}</p>
                  <p class="mb-0 fs-5">
                    "{{ currentQuestionData.sentenceStart }} <span class="text-danger fw-bold">_____</span> {{ currentQuestionData.sentenceEnd }}"
                  </p>
                </div>
              </div>

              <!-- Answer Options -->
              <div class="answer-options">
                <div class="row">
                  <div class="col-md-6 mb-3" v-for="(option, index) in currentQuestionData.options" :key="index">
                    <button class="answer-button w-100 p-3 text-start" 
                            :class="getAnswerButtonClass(index)"
                            @click="selectAnswer(index)"
                            :disabled="answerSelected">
                      <div class="d-flex align-items-center">
                        <span class="option-letter me-3">{{ String.fromCharCode(65 + index) }}</span>
                        <span class="option-text">{{ option.text }}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Answer Feedback -->
              <div v-if="showFeedback" class="answer-feedback mt-4">
                <div :class="['alert', isCorrect ? 'alert-success' : 'alert-danger']">
                  <div class="d-flex align-items-start">
                    <span class="feedback-icon me-3">{{ isCorrect ? '✅' : '❌' }}</span>
                    <div>
                      <h6 class="fw-bold mb-2">
                        {{ isCorrect ? 'Correct!' : 'Incorrect' }}
                      </h6>
                      <p class="mb-2">
                        <strong>Answer:</strong> {{ currentQuestionData.word[selectedLanguage] }}
                      </p>
                      <p class="mb-2">
                        <strong>Usage:</strong> {{ currentQuestionData.word.usage }}
                      </p>
                      <p class="mb-0">
                        <strong>Example:</strong> "{{ currentQuestionData.word.example_sentence.hiligaynon }}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer bg-light text-end" v-if="answerSelected">
              <button class="btn btn-rojo" @click="nextQuestion">
                {{ currentQuestion + 1 < totalQuestions ? 'Next Question →' : 'Finish Quiz 🏁' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quiz Results -->
      <div v-else-if="quizCompleted" class="quiz-results">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card card-hua-siong shadow-lg">
              <div class="card-body p-5 text-center">
                <div class="result-icon mb-4">{{ getResultIcon() }}</div>
                <h2 class="mb-4">Quiz Completed!</h2>
                
                <!-- Score Display -->
                <div class="score-display mb-5">
                  <div class="score-circle mx-auto mb-3">
                    <div class="score-percentage">{{ Math.round(scorePercentage) }}%</div>
                  </div>
                  <h3 class="text-primary mb-2">{{ score }} / {{ totalQuestions }}</h3>
                  <p class="lead">{{ getScoreMessage() }}</p>
                </div>

                <!-- Detailed Results -->
                <div class="detailed-results mb-5">
                  <div class="row text-center">
                    <div class="col-4">
                      <div class="result-stat">
                        <div class="stat-number text-success">{{ correctAnswers }}</div>
                        <div class="stat-label">Correct</div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="result-stat">
                        <div class="stat-number text-danger">{{ incorrectAnswers }}</div>
                        <div class="stat-label">Incorrect</div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="result-stat">
                        <div class="stat-number text-info">{{ Math.round(averageTime) }}s</div>
                        <div class="stat-label">Avg. Time</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="result-actions">
                  <button class="btn btn-rojo btn-lg me-3" @click="restartQuiz">
                    🔄 Try Again
                  </button>
                  <button class="btn btn-outline-rojo btn-lg me-3" @click="reviewMistakes">
                    📖 Review Mistakes
                  </button>
                  <router-link to="/vocabulary" class="btn btn-outline-yinmn-blue btn-lg">
                    📚 Study More
                  </router-link>
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
import { useRoute } from 'vue-router'
import { getAllVocabulary, getVocabularyByCategory, getCategoriesList } from '@/data/vocabulary.js'

export default {
  name: 'Quiz',
  props: {
    selectedLanguage: {
      type: String,
      default: 'korean'
    }
  },
  setup(props) {
    const route = useRoute()
    
    // Quiz state
    const quizStarted = ref(false)
    const quizCompleted = ref(false)
    const currentQuestion = ref(0)
    const score = ref(0)
    const questions = ref([])
    const selectedAnswer = ref(null)
    const answerSelected = ref(false)
    const showFeedback = ref(false)
    const isCorrect = ref(false)
    const categories = ref([])
    const questionStartTime = ref(null)
    const questionTimes = ref([])

    // Quiz settings
    const quizSettings = ref({
      questionCount: 10,
      category: '',
      quizType: 'translation',
      difficulty: 'medium'
    })

    // Computed properties
    const languageEmoji = computed(() => {
      return props.selectedLanguage === 'korean' ? '🇰🇷' : '🇨🇳'
    })

    const totalQuestions = computed(() => {
      return parseInt(quizSettings.value.questionCount)
    })

    const currentQuestionData = computed(() => {
      return questions.value[currentQuestion.value] || null
    })

    const scorePercentage = computed(() => {
      return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
    })

    const correctAnswers = computed(() => {
      return score.value
    })

    const incorrectAnswers = computed(() => {
      return totalQuestions.value - score.value
    })

    const averageTime = computed(() => {
      if (questionTimes.value.length === 0) return 0
      const total = questionTimes.value.reduce((sum, time) => sum + time, 0)
      return total / questionTimes.value.length / 1000 // Convert to seconds
    })

    // Methods
    const startQuiz = () => {
      generateQuestions()
      quizStarted.value = true
      questionStartTime.value = Date.now()
    }

    const generateQuestions = () => {
      let vocabulary = []
      
      if (quizSettings.value.category) {
        const categoryData = getVocabularyByCategory(quizSettings.value.category)
        vocabulary = categoryData ? categoryData.words : []
      } else {
        vocabulary = getAllVocabulary()
      }

      // Shuffle and select questions
      const shuffled = [...vocabulary].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, totalQuestions.value)

      questions.value = selected.map(word => generateQuestion(word))
    }

    const generateQuestion = (word) => {
      const types = quizSettings.value.quizType === 'mixed' 
        ? ['translation', 'listening', 'sentence']
        : [quizSettings.value.quizType]
      
      const type = types[Math.floor(Math.random() * types.length)]
      
      const question = {
        word,
        type,
        correctAnswer: 0
      }

      // Generate options based on question type
      if (type === 'translation' || type === 'listening') {
        question.options = generateTranslationOptions(word)
      } else if (type === 'sentence') {
        question.options = generateSentenceOptions(word)
        // Split the sentence for completion
        const sentence = word.example_sentence.hiligaynon
        const words = sentence.split(' ')
        const targetWordIndex = words.findIndex(w => 
          w.toLowerCase().includes(word.hiligaynon.toLowerCase())
        )
        
        if (targetWordIndex !== -1) {
          question.sentenceStart = words.slice(0, targetWordIndex).join(' ')
          question.sentenceEnd = words.slice(targetWordIndex + 1).join(' ')
          question.context = word.usage
        }
      }

      return question
    }

    const generateTranslationOptions = (correctWord) => {
      const allWords = getAllVocabulary()
      const incorrectWords = allWords
        .filter(w => w.id !== correctWord.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)

      const options = [
        { text: correctWord[props.selectedLanguage], isCorrect: true },
        ...incorrectWords.map(w => ({ text: w[props.selectedLanguage], isCorrect: false }))
      ]

      return shuffleOptions(options)
    }

    const generateSentenceOptions = (correctWord) => {
      const allWords = getAllVocabulary()
      const incorrectWords = allWords
        .filter(w => w.id !== correctWord.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)

      const options = [
        { text: correctWord.hiligaynon, isCorrect: true },
        ...incorrectWords.map(w => ({ text: w.hiligaynon, isCorrect: false }))
      ]

      return shuffleOptions(options)
    }

    const shuffleOptions = (options) => {
      const shuffled = [...options].sort(() => 0.5 - Math.random())
      // Update correct answer index
      const correctIndex = shuffled.findIndex(opt => opt.isCorrect)
      return shuffled.map((opt, index) => ({
        ...opt,
        index: index === correctIndex ? 0 : index
      }))
    }

    const selectAnswer = (answerIndex) => {
      if (answerSelected.value) return

      selectedAnswer.value = answerIndex
      answerSelected.value = true
      showFeedback.value = true
      
      const correct = currentQuestionData.value.options[answerIndex].isCorrect
      isCorrect.value = correct
      
      if (correct) {
        score.value++
      }

      // Record time taken
      if (questionStartTime.value) {
        const timeTaken = Date.now() - questionStartTime.value
        questionTimes.value.push(timeTaken)
      }
    }

    const nextQuestion = () => {
      if (currentQuestion.value + 1 < totalQuestions.value) {
        currentQuestion.value++
        resetQuestionState()
        questionStartTime.value = Date.now()
      } else {
        completeQuiz()
      }
    }

    const resetQuestionState = () => {
      selectedAnswer.value = null
      answerSelected.value = false
      showFeedback.value = false
      isCorrect.value = false
    }

    const completeQuiz = () => {
      quizCompleted.value = true
      saveQuizResults()
    }

    const saveQuizResults = () => {
      const results = {
        score: score.value,
        totalQuestions: totalQuestions.value,
        percentage: scorePercentage.value,
        category: quizSettings.value.category,
        date: new Date().toISOString(),
        language: props.selectedLanguage
      }
      
      const allResults = JSON.parse(localStorage.getItem('quiz_results') || '[]')
      allResults.push(results)
      localStorage.setItem('quiz_results', JSON.stringify(allResults))
    }

    const restartQuiz = () => {
      // Reset all state
      quizStarted.value = false
      quizCompleted.value = false
      currentQuestion.value = 0
      score.value = 0
      questions.value = []
      questionTimes.value = []
      resetQuestionState()
    }

    const reviewMistakes = () => {
      // This could navigate to a review mode
      console.log('Review mistakes functionality')
    }

    const getAnswerButtonClass = (index) => {
      if (!answerSelected.value) {
        return 'btn btn-outline-primary answer-btn'
      }
      
      if (selectedAnswer.value === index) {
        return isCorrect.value ? 'btn btn-success answer-btn' : 'btn btn-danger answer-btn'
      }
      
      if (currentQuestionData.value.options[index].isCorrect) {
        return 'btn btn-success answer-btn'
      }
      
      return 'btn btn-outline-secondary answer-btn'
    }

    const getQuestionTypeLabel = () => {
      const labels = {
        translation: 'Translation',
        listening: 'Listening',
        sentence: 'Sentence',
        mixed: 'Mixed'
      }
      return labels[currentQuestionData.value?.type] || 'Quiz'
    }

    const getResultIcon = () => {
      if (scorePercentage.value >= 90) return '🏆'
      if (scorePercentage.value >= 80) return '🥇'
      if (scorePercentage.value >= 70) return '🥈'
      if (scorePercentage.value >= 60) return '🥉'
      return '📚'
    }

    const getScoreMessage = () => {
      if (scorePercentage.value >= 90) return 'Excellent! You\'re a Hiligaynon master!'
      if (scorePercentage.value >= 80) return 'Great job! You have a strong understanding!'
      if (scorePercentage.value >= 70) return 'Good work! Keep practicing to improve!'
      if (scorePercentage.value >= 60) return 'Not bad! A little more study will help!'
      return 'Keep studying! Practice makes perfect!'
    }

    const playPronunciation = (word) => {
      // Use globally available speech service
      if (window.speechService) {
        window.speechService.playPronunciation(word.hiligaynon)
      } else {
        // Fallback to importing if global not available
        import('@/services/speechService.js').then(({ default: speechService }) => {
          speechService.playPronunciation(word.hiligaynon)
        })
      }
    }

    // Lifecycle
    onMounted(() => {
      categories.value = getCategoriesList()
      
      // Check for category parameter from route
      const categoryParam = route.query.category
      if (categoryParam) {
        quizSettings.value.category = categoryParam
      }
    })

    return {
      // State
      quizStarted,
      quizCompleted,
      currentQuestion,
      score,
      selectedAnswer,
      answerSelected,
      showFeedback,
      isCorrect,
      categories,
      quizSettings,
      
      // Computed
      languageEmoji,
      totalQuestions,
      currentQuestionData,
      scorePercentage,
      correctAnswers,
      incorrectAnswers,
      averageTime,
      
      // Methods
      startQuiz,
      selectAnswer,
      nextQuestion,
      restartQuiz,
      reviewMistakes,
      getAnswerButtonClass,
      getQuestionTypeLabel,
      getResultIcon,
      getScoreMessage,
      playPronunciation
    }
  }
}
</script>

<style scoped>
.quiz-icon {
  font-size: 4rem;
}

.quiz-stats {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  line-height: 1;
}

.question-card {
  animation: slideInUp 0.5s ease-out;
}

.answer-button {
  border: 2px solid #dee2e6;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  min-height: 80px;
  display: flex;
  align-items: center;
}

.answer-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.option-letter {
  background: #f8f9fa;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.option-text {
  font-size: 1.1rem;
}

.answer-feedback {
  animation: fadeIn 0.5s ease-in;
}

.feedback-icon {
  font-size: 1.5rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(#28a745 calc(var(--percentage) * 1%), #e9ecef 0);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.score-circle::before {
  content: '';
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
}

.score-percentage {
  position: relative;
  z-index: 2;
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
}

.result-icon {
  font-size: 5rem;
}

.result-stat {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  margin: 0 0.25rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

.listening-section {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
  margin: 1rem 0;
}

.sentence-context {
  border-left: 4px solid #007bff;
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .quiz-stats {
    margin-top: 1rem;
  }
  
  .answer-button {
    min-height: 60px;
    font-size: 0.9rem;
  }
  
  .option-letter {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }
  
  .result-actions .btn {
    margin-bottom: 0.5rem;
    width: 100%;
  }
}
</style>