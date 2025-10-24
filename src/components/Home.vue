<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section py-5">
      <div class="container text-center text-white">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10 col-sm-12">
            <h1 class="display-4 fw-bold mb-4">
              <Icon icon="mdi:flag" width="40" height="40" class="me-2" />
              Learn Hiligaynon
            </h1>
            <p class="lead mb-4">
              Interactive vocabulary learning for Korean and Chinese students at Hua Siong College of Iloilo
            </p>
            <p class="mb-4">
              Master daily Hiligaynon phrases with photos, pronunciation, and real-life examples!
            </p>
            
            <!-- Language Display -->
            <div class="language-display mb-4 p-3 rounded">
              <h5 class="mb-3">Learning in your language:</h5>
              <div class="current-language d-inline-flex align-items-center p-2 rounded">
                <span class="fs-3 me-2">{{ languageEmoji }}</span>
                <span class="fw-bold">{{ languageText }}</span>
              </div>
            </div>
            
            <router-link to="/categories" class="btn btn-hua-siong-primary btn-lg px-5 py-3 fw-bold">
              Start Learning Now!
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-sm-6 col-md-3 mb-3">
            <div class="stat-card h-100">
              <div class="stat-icon">
                <Icon icon="mdi:book-open-variant" width="48" height="48" class="icon-rojo" />
              </div>
              <h3 class="stat-number">500+</h3>
              <p class="stat-label">Vocabulary Words</p>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 mb-3">
            <div class="stat-card h-100">
              <div class="stat-icon">
                <Icon icon="mdi:camera" width="48" height="48" class="icon-rojo" />
              </div>
              <h3 class="stat-number">300+</h3>
              <p class="stat-label">Visual Examples</p>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 mb-3">
            <div class="stat-card h-100">
              <div class="stat-icon">
                <Icon icon="mdi:target" width="48" height="48" class="icon-rojo" />
              </div>
              <h3 class="stat-number">12</h3>
              <p class="stat-label">Daily Categories</p>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 mb-3">
            <div class="stat-card h-100">
              <div class="stat-icon">
                <Icon icon="mdi:trophy" width="48" height="48" class="icon-rojo" />
              </div>
              <h3 class="stat-number">Quiz</h3>
              <p class="stat-label">Interactive Tests</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center mb-5">
          <div class="col-lg-6">
            <h2 class="display-5 fw-bold mb-4">Why Learn Hiligaynon?</h2>
            <p class="lead mb-4">
              Hiligaynon (Ilonggo) is the heart language of Western Visayas, Philippines. 
              As a student at Hua Siong College of Iloilo, learning Hiligaynon will help you:
            </p>
            <ul class="list-unstyled">
              <li class="mb-3 d-flex align-items-start">
                <span class="me-3 fs-4 text-rojo">
                  <Icon icon="mdi:account-voice" width="32" height="32" />
                </span>
                <div>
                  <strong>Communicate with locals</strong> - Connect with Filipino classmates and community members
                </div>
              </li>
              <li class="mb-3 d-flex align-items-start">
                <span class="me-3 fs-4 text-rojo">
                  <Icon icon="mdi:shopping" width="32" height="32" />
                </span>
                <div>
                  <strong>Navigate daily life</strong> - Shop, eat, and travel around Iloilo with confidence
                </div>
              </li>
              <li class="mb-3 d-flex align-items-start">
                <span class="me-3 fs-4 text-rojo">
                  <Icon icon="mdi:handshake" width="32" height="32" />
                </span>
                <div>
                  <strong>Build friendships</strong> - Show respect for local culture and make lasting connections
                </div>
              </li>
              <li class="mb-3 d-flex align-items-start">
                <span class="me-3 fs-4 text-rojo">
                  <Icon icon="mdi:school" width="32" height="32" />
                </span>
                <div>
                  <strong>Excel in school</strong> - Better understand your environment and community
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-6">
            <div class="feature-image-container">
              <div class="p-4 bg-light rounded-3 text-center">
                <div class="hua-siong-logo mb-3">
                  <img src="/logo/huasiong.png" 
                       alt="Hua Siong College of Iloilo Logo" 
                       class="logo-image"/>
                </div>
                <h4>Hua Siong College of Iloilo</h4>
                <p class="text-muted">Bridging cultures through language learning</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Categories Preview -->
        <div class="row">
          <div class="col-12">
            <h3 class="text-center mb-5">Popular Learning Categories</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="category in featuredCategories" :key="category.id">
            <div class="category-preview-card h-100 p-4 rounded-3 shadow-sm cursor-pointer" 
                 @click="goToCategory(category.id)"
                 :style="`background: ${category.color}`">
              <div class="text-center">
                <div class="category-icon mb-3">
                  <Icon :icon="getCategoryIcon(category.id)" width="64" height="64" class="text-white" />
                </div>
                <h5 class="fw-bold text-white">{{ category.name }}</h5>
                <p class="text-white opacity-75 mb-3">{{ category.description }}</p>
                <div class="text-white small">
                  {{ category.wordCount }} words to learn
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-5 bg-rojo text-white">
      <div class="container text-center">
        <h3 class="mb-4">Ready to Start Your Hiligaynon Journey?</h3>
        <p class="lead mb-4">
          Join hundreds of Korean and Chinese students who are already learning!
        </p>
        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <router-link to="/categories" class="btn btn-hua-siong-secondary btn-lg">
            <Icon icon="mdi:view-grid" width="20" height="20" class="me-2 text-white" />
            Browse Categories
          </router-link>
          <router-link to="/vocabulary" class="btn btn-hua-siong-secondary btn-lg">
            <Icon icon="mdi:book-open-variant" width="20" height="20" class="me-2 text-white" />
            All Vocabulary
          </router-link>
          <router-link to="/quiz" class="btn btn-hua-siong-secondary btn-lg">
            <Icon icon="mdi:target" width="20" height="20" class="me-2 text-white" />
            Take a Quiz
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  props: {
    selectedLanguage: {
      type: String,
      default: 'korean'
    }
  },
  setup(props) {
    const router = useRouter()

    const languageEmoji = computed(() => {
      return props.selectedLanguage === 'korean' ? '🇰🇷' : '🇨🇳'
    })

    const languageText = computed(() => {
      return props.selectedLanguage === 'korean' ? 'Korean (한국어)' : 'Chinese (中文)'
    })

    const featuredCategories = [
      {
        id: 'greetings',
        name: 'Greetings & Politeness',
        description: 'Essential daily greetings',
        icon: 'mdi:hand-wave',
        color: 'var(--yinmn-blue)',
        wordCount: 25
      },
      {
        id: 'food',
        name: 'Food & Dining',
        description: 'Local food and restaurants',
        icon: '🍽️',
        color: 'var(--rojo)',
        wordCount: 45
      },
      {
        id: 'school',
        name: 'School Life',
        description: 'Classroom and academic terms',
        icon: '🎓',
        color: 'var(--yinmn-blue)',
        wordCount: 35
      }
    ]

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

    const goToCategory = (categoryId) => {
      router.push(`/categories?category=${categoryId}`)
    }

    return {
      languageEmoji,
      languageText,
      featuredCategories,
      goToCategory,
      getCategoryIcon
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}

.stat-card {
  transition: transform 0.2s;
  border: 1px solid #e0e0e0;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 3rem;
}

.stat-number {
  color: var(--yinmn-blue);
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  margin-bottom: 0;
}

.category-preview-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-preview-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
}

.category-icon {
  font-size: 4rem;
}

.feature-image-container {
  animation: float 3s ease-in-out infinite;
}

.hua-siong-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-image {
  width: 120px;
  height: 120px;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.logo-image:hover {
  transform: scale(1.05);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.language-display {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.current-language {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
  to { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem !important;
  }
  
  .hero-section .lead {
    font-size: 1rem !important;
  }
  
  .stat-card {
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .stat-number {
    font-size: 1.5rem !important;
  }
  
  .stat-label {
    font-size: 0.9rem !important;
  }
  
  .logo-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 1.7rem !important;
  }
  
  .hero-section h1 .iconify {
    width: 30px !important;
    height: 30px !important;
  }
  
  .hero-section p {
    font-size: 0.9rem !important;
  }
  
  .stat-card {
    padding: 12px;
  }
  
  .stat-icon .iconify {
    width: 36px !important;
    height: 36px !important;
  }
  
  .stat-number {
    font-size: 1.3rem !important;
  }
  
  .stat-label {
    font-size: 0.85rem !important;
  }
}
</style>