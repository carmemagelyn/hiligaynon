import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createBootstrap } from 'bootstrap-vue-next'
import { Icon } from '@iconify/vue'
import App from './App.vue'
import speechService from './services/speechService.js'
import { SPEECH_CONFIG } from './config/speechConfig.js'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './main.css'

// Import components
import Home from './components/Home.vue'
import VocabularyList from './components/VocabularyList.vue'
import Categories from './components/Categories.vue'
import Quiz from './components/Quiz.vue'
import Progress from './components/Progress.vue'

// Router configuration
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/vocabulary', name: 'Vocabulary', component: VocabularyList },
  { path: '/categories', name: 'Categories', component: Categories },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/progress', name: 'Progress', component: Progress }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(createBootstrap())
app.component('Icon', Icon)

// Initialize speech service with AWS Polly credentials
speechService.setAwsCredentials(
  SPEECH_CONFIG.AWS_ACCESS_KEY_ID, 
  SPEECH_CONFIG.AWS_SECRET_ACCESS_KEY, 
  SPEECH_CONFIG.AWS_REGION
)

// Make speech service globally available
app.config.globalProperties.$speechService = speechService

// Also make it available on window for easier access
window.speechService = speechService

app.mount('#app')