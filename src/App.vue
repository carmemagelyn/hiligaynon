<template>
  <div class="app-container">
    <!-- Navigation Header -->
    <nav class="navbar navbar-expand-lg navbar-dark navbar-hua-siong">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold d-flex align-items-center">
          <img 
            src="/logo.png" 
            alt="SPEAK Hiligaynon Logo" 
            class="navbar-logo me-2"
          />
        </router-link>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          @click="toggleMobileMenu"
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          :aria-expanded="mobileMenuOpen"
          aria-controls="navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav" :class="{ 'show': mobileMenuOpen }">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="mobileMenuOpen = false">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categories" class="nav-link" @click="mobileMenuOpen = false">Categories</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/vocabulary" class="nav-link" @click="mobileMenuOpen = false">Vocabulary</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/quiz" class="nav-link" @click="mobileMenuOpen = false">Quiz</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/progress" class="nav-link" @click="mobileMenuOpen = false">Progress</router-link>
            </li>
          </ul>
          
          <!-- Language Selection in Header -->
          <div class="d-flex align-items-center flex-wrap">
            <span class="text-white me-2 d-none d-md-inline">Language:</span>
            <button 
              @click="setLanguage('korean')" 
              :class="['btn btn-sm me-1 mb-1', selectedLanguage === 'korean' ? 'btn-hua-siong-primary' : 'btn-white-inactive']"
            >
              <Icon icon="flag:kr-4x3" width="16" height="16" class="me-1" />
              <span class="d-none d-sm-inline">Korean</span>
              <span class="d-inline d-sm-none">KR</span>
            </button>
            <button 
              @click="setLanguage('chinese')" 
              :class="['btn btn-sm mb-1', selectedLanguage === 'chinese' ? 'btn-hua-siong-primary' : 'btn-white-inactive']"
            >
              <Icon icon="flag:cn-4x3" width="16" height="16" class="me-1" />
              <span class="d-none d-sm-inline">Chinese</span>
              <span class="d-inline d-sm-none">CN</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Language Selection Modal (First Time) -->
    <div v-if="showLanguageModal" class="modal d-block" style="background: rgba(0,0,0,0.8);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Choose Your Native Language</h5>
          </div>
          <div class="modal-body text-center p-4">
            <p class="mb-4">Welcome to SPEAK Hiligaynon! Please select your native language to personalize your learning experience.</p>
            
            <div class="row">
              <div class="col-6">
                <div class="language-selection-card" @click="selectInitialLanguage('korean')">
                  <div class="card h-100 language-card">
                    <div class="card-body text-center">
                      <div class="display-1 mb-3">🇰🇷</div>
                      <h5 class="card-title">Korean</h5>
                      <p class="card-text">한국어</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="language-selection-card" @click="selectInitialLanguage('chinese')">
                  <div class="card h-100 language-card">
                    <div class="card-body text-center">
                      <div class="display-1 mb-3">🇨🇳</div>
                      <h5 class="card-title">Chinese</h5>
                      <p class="card-text">中文</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container-fluid p-0">
      <router-view :selected-language="selectedLanguage" />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-5">
      <div class="container">
        <p class="mb-1">© 2025 SPEAK Hiligaynon. All rights reserved.</p>
       
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const selectedLanguage = ref('korean')
    const showLanguageModal = ref(false)
    const mobileMenuOpen = ref(false)

    const setLanguage = (language) => {
      selectedLanguage.value = language
      localStorage.setItem('hiligaynon_preferred_language', language)
      // Close mobile menu when language is selected
      mobileMenuOpen.value = false
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const selectInitialLanguage = (language) => {
      setLanguage(language)
      showLanguageModal.value = false
    }

    onMounted(() => {
      const savedLanguage = localStorage.getItem('hiligaynon_preferred_language')
      if (savedLanguage) {
        selectedLanguage.value = savedLanguage
      } else {
        showLanguageModal.value = true
      }
    })

    return {
      selectedLanguage,
      showLanguageModal,
      mobileMenuOpen,
      setLanguage,
      toggleMobileMenu,
      selectInitialLanguage
    }
  }
}
</script>

<style scoped>
.language-selection-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.language-selection-card:hover {
  transform: scale(1.05);
}

.language-card {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.language-card:hover {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.modal {
  z-index: 1060;
}

.navbar-brand {
  font-size: 1.5rem;
}

.navbar-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.nav-link.router-link-active {
  color: #fcd116 !important;
  font-weight: bold;
}

/* Mobile navigation improvements */
@media (max-width: 991.98px) {
  .navbar-collapse {
    background: rgba(0, 0, 0, 0.95);
    border-radius: 8px;
    margin-top: 10px;
    padding: 1rem;
  }
  
  .navbar-nav {
    margin-bottom: 1rem;
  }
  
  .navbar-nav .nav-link {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1.1rem;
  }
  
  .navbar-nav .nav-link:last-child {
    border-bottom: none;
  }
  
  /* Language buttons in mobile */
  .d-flex.align-items-center {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch !important;
  }
  
  .d-flex.align-items-center .btn {
    width: 100%;
    margin: 0 !important;
  }
  
  .d-flex.align-items-center span {
    margin-bottom: 0.5rem;
    margin-right: 0 !important;
  }
  
  .navbar-logo {
    width: 50px;
    height: 50px;
  }
}
</style>