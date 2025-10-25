# SPEAK Hiligaynon

An interactive Hiligaynon/Ilonggo vocabulary learning application designed specifically for Korean and Chinese students at Hua Siong College of Iloilo.

## 🌟 Features

### Core Learning Features
- **Interactive Language Selection**: Choose between Korean (한국어) or Chinese (中文) as your native language
- **Comprehensive Vocabulary Database**: 25+ essential Hiligaynon words with translations
- **Multiple Learning Modes**: 
  - 🃏 Flashcards with flip animation
  - 📋 List view with detailed information
  - 🔊 Pronunciation practice with Web Speech API
- **Visual Learning**: Photo descriptions for every vocabulary word
- **Real-world Examples**: Sentence examples in all three languages
- **Usage Context**: Practical information on when and how to use each word

### Interactive Features
- **🎯 Quiz System**: Multiple quiz types (translation, listening, sentence completion)
- **📊 Progress Tracking**: Detailed learning analytics and achievements
- **🔥 Streak System**: Daily learning streak motivation
- **⭐ Favorites**: Save favorite words for quick review
- **🎓 Categories**: Organized vocabulary by daily living situations

### Categories
1. **👋 Greetings & Politeness** - Essential daily greetings
2. **🍽️ Food & Dining** - Local food and restaurant vocabulary
3. **🎓 School Life** - Classroom and academic terms
4. **🚗 Transportation** - Getting around Iloilo
5. **🛒 Shopping & Market** - Market and store interactions

## 🚀 Quick Start

### Prerequisites
- Node.js (>=6.9.0)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hiligaynon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Choose your language (Korean or Chinese)
   - Start learning!

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🏗️ Project Structure

```
hiligaynon/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── App.vue                 # Main application component
│   │   ├── Home.vue               # Landing page
│   │   ├── Categories.vue         # Category selection
│   │   ├── VocabularyList.vue     # Main vocabulary interface
│   │   ├── VocabularyCard.vue     # Individual word cards
│   │   ├── PronunciationCard.vue  # Pronunciation practice
│   │   ├── WordDetailModal.vue    # Detailed word information
│   │   ├── Quiz.vue               # Quiz interface
│   │   └── Progress.vue           # Learning progress
│   ├── data/
│   │   └── vocabulary.js          # Vocabulary database
│   ├── main.js                    # Application entry point
│   └── style.css                  # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📚 Technology Stack

- **Frontend Framework**: Vue.js 3.5.22 with Composition API
- **UI Framework**: Bootstrap 5.3.8 with Bootstrap Vue Next 0.40.6
- **Routing**: Vue Router 4.6.2
- **Build Tool**: Vite 7.1.7
- **Development**: Vite Plugin Vue DevTools 8.0.2
- **Pronunciation**: Web Speech API

## 🎓 Educational Approach

### Designed for Korean and Chinese Students
- **Bilingual Support**: Full Korean and Chinese translations
- **Cultural Context**: Practical vocabulary for living in Iloilo
- **Progressive Learning**: From basic greetings to complex conversations
- **Visual Learning**: Image descriptions to aid memory
- **Contextual Usage**: Real-world application examples

### Learning Methodology
1. **Visual Association**: Each word comes with descriptive imagery
2. **Audio Learning**: Native pronunciation with Web Speech API
3. **Contextual Learning**: Practical usage examples
4. **Progressive Testing**: Adaptive quiz system
5. **Gamification**: Streaks, achievements, and progress tracking

## 📱 Features by Component

### Language Selection (App.vue)
- Persistent language preference storage
- Modal selection for first-time users
- Header toggle for language switching

### Home Page (Home.vue)
- Welcome interface with statistics
- Featured category previews
- Quick action buttons

### Categories (Categories.vue)
- Visual category cards with progress
- Learning mode selection
- Category-specific statistics

### Vocabulary Learning (VocabularyList.vue)
- Three view modes: Cards, List, Pronunciation
- Search and filter functionality
- Pagination for better performance
- Progress tracking integration

### Interactive Cards (VocabularyCard.vue)
- Flip animation between word and example
- Audio pronunciation buttons
- Learning progress markers
- Responsive design

### Quiz System (Quiz.vue)
- Multiple question types
- Configurable difficulty levels
- Real-time scoring and feedback
- Performance analytics

### Progress Tracking (Progress.vue)
- Overall learning statistics
- Category-wise progress
- Achievement system
- Activity timeline
- Quiz performance metrics

## 🌍 Localization Support

### Supported Languages
- **Hiligaynon/Ilonggo**: Native target language
- **English**: International language base
- **Korean (한국어)**: For Korean students
- **Chinese (中文)**: For Chinese students

### Language Features
- Persistent language selection
- Real-time language switching
- Culturally appropriate content
- Native language explanations

## 🚀 Deployment

### Development
```bash
npm run dev
```
Access at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Outputs to `dist/` directory

### Deployment Options
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Traditional hosting**: Upload `dist/` contents

## 🤝 Contributing

### Adding New Vocabulary
1. Edit `src/data/vocabulary.js`
2. Add word object with all required fields:
   ```javascript
   {
     id: unique_id,
     hiligaynon: 'word',
     pronunciation: 'phonetic-guide',
     english: 'translation',
     korean: '번역',
     chinese: '翻译',
     usage: 'context description',
     example_sentence: {
       hiligaynon: 'example',
       english: 'translation',
       korean: '번역',
       chinese: '翻译'
     },
     image_description: 'visual context',
     category_tags: ['tag1', 'tag2']
   }
   ```

### Adding New Categories
1. Update `vocabulary.js` with new category
2. Add category metadata (icon, color, description)
3. Update category mapping in components

### Code Style
- Use Vue 3 Composition API
- Follow ESLint configuration
- Bootstrap classes for styling
- Responsive design principles

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Hua Siong College of Iloilo**: Educational institution support
- **Filipino Community**: Language and cultural guidance
- **Korean Students**: User testing and feedback
- **Chinese Students**: User testing and feedback
- **Vue.js Community**: Technical framework support

## 📧 Support

For issues, suggestions, or contributions:
- Create GitHub issues for bugs
- Submit pull requests for enhancements
- Contact educational coordinators for curriculum integration

## 🎯 Future Enhancements

### Planned Features
- **Offline Support**: PWA capabilities
- **Voice Recognition**: Speech-to-text practice
- **Advanced Analytics**: Learning pattern analysis
- **Social Features**: Student collaboration
- **More Languages**: Support for other regional languages
- **Cultural Content**: Filipino culture integration
- **Assessment Tools**: Formal evaluation system

### Technical Improvements
- **Performance**: Code splitting and lazy loading
- **Accessibility**: WCAG compliance
- **Mobile App**: React Native or Ionic version
- **Backend Integration**: User accounts and cloud sync
- **Real Images**: Professional photography integration

---

**Happy Learning! Mag-aral kita sang Hiligaynon! 📚🇵🇭**