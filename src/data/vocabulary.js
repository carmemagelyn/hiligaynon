// Comprehensive Hiligaynon Vocabulary Database
// For Korean and Chinese students at Hua Siong College of Iloilo

export const vocabularyData = {
  greetings: {
    category: 'Greetings & Politeness',
    icon: 'mdi:hand-wave',
    color: 'var(--yinmn-blue)',
    description: 'Essential daily greetings and polite expressions',
    words: [
      {
        id: 1,
        hiligaynon: 'Maayong adlaw',
        pronunciation: 'ma-A-yong AD-laaw',
        english: 'Good day / Hello',
        korean: '안녕하세요 / 좋은 하루',
        chinese: '你好 / 美好的一天',
        usage: 'General greeting used throughout the day',
        example_sentence: {
          hiligaynon: 'Maayong adlaw sa inyo tanan!',
          english: 'Good day to all of you!',
          korean: '여러분 모두 안녕하세요!',
          chinese: '大家好！'
        },
        image_description: 'People waving and greeting each other',
        category_tags: ['basic', 'formal', 'daily']
      },
      {
        id: 2,
        hiligaynon: 'Kumusta',
        pronunciation: 'koo-MOOS-ta',
        english: 'How are you?',
        korean: '어떻게 지내세요?',
        chinese: '你好吗？',
        usage: 'Asking about someone\'s well-being',
        example_sentence: {
          hiligaynon: 'Kumusta ka na?',
          english: 'How are you doing?',
          korean: '잘 지내고 있어요?',
          chinese: '你过得怎么样？'
        },
        image_description: 'Two people having a friendly conversation',
        category_tags: ['basic', 'conversation', 'daily']
      },
      {
        id: 3,
        hiligaynon: 'Salamat',
        pronunciation: 'sala-MAT',
        english: 'Thank you',
        korean: '감사합니다',
        chinese: '谢谢',
        usage: 'Expressing gratitude',
        example_sentence: {
          hiligaynon: 'Salamat gid sa imo bulig.',
          english: 'Thank you very much for your help.',
          korean: '도움을 주셔서 정말 감사합니다.',
          chinese: '非常感谢你的帮助。'
        },
        image_description: 'Person bowing or gesturing thank you',
        category_tags: ['basic', 'polite', 'daily']
      },
      {
        id: 4,
        hiligaynon: 'Pasensya na',
        pronunciation: 'pa-SEN-sya na',
        english: 'Excuse me / Sorry',
        korean: '실례합니다 / 죄송합니다',
        chinese: '不好意思 / 对不起',
        usage: 'Apologizing or getting attention politely',
        example_sentence: {
          hiligaynon: 'Pasensya na, pwede ka labay?',
          english: 'Excuse me, may I pass by?',
          korean: '실례합니다, 화장실이 어디에 있나요?',
          chinese: '不好意思，厕所在哪里？'
        },
        hasImage: true,
        image: {
          url: '/images/excuse-me.jpeg',
          title: 'Excuse me - Pasensya na',
          description: 'Person politely asking for directions'
        },
        image_description: 'Person politely asking for directions',
        category_tags: ['polite', 'daily', 'essential']
      },
      {
        id: 5,
        hiligaynon: 'Indi',
        pronunciation: 'in-DI',
        english: 'No',
        korean: '아니요',
        chinese: '不是',
        usage: 'Negative response, disagreement',
        example_sentence: {
          hiligaynon: 'Indi, wala ko sang kwarta.',
          english: 'No, I don\'t have money.',
          korean: '아니요, 저는 돈이 없어요.',
          chinese: '不，我没有钱。'
        },
        image_description: 'Person shaking head or making no gesture',
        category_tags: ['basic', 'response', 'essential']
      }
    ]
  },
  
  food: {
    category: 'Food & Dining',
    icon: 'mdi:food',
    color: 'var(--rojo)',
    description: 'Common food items and dining vocabulary',
    words: [
      {
        id: 6,
        hiligaynon: 'Kaon',
        pronunciation: 'KA-on',
        english: 'Eat / Food',
        korean: '먹다 / 음식',
        chinese: '吃 / 食物',
        usage: 'Verb for eating or noun for food',
        example_sentence: {
          hiligaynon: 'Mag-kaon kita!',
          english: 'Let\'s eat!',
          korean: '오후에 같이 먹어요.',
          chinese: '我们下午一起吃饭吧。'
        },
        image_description: 'People eating together at a table',
        category_tags: ['basic', 'verb', 'daily']
      },
      {
        id: 7,
        hiligaynon: 'Kan-on',
        pronunciation: 'KAN-on',
        english: 'Rice',
        korean: '밥',
        chinese: '米饭',
        usage: 'Staple food, cooked rice',
        example_sentence: {
          hiligaynon: 'Gusto ko sang mainit nga kan-on.',
          english: 'I want hot rice.',
          korean: '따뜻한 밥을 원해요.',
          chinese: '我想要热米饭。'
        },
        image_description: 'Bowl of steaming white rice',
        category_tags: ['food', 'staple', 'basic']
      },
      {
        id: 8,
        hiligaynon: 'Tubig',
        pronunciation: 'TU-big',
        english: 'Water',
        korean: '물',
        chinese: '水',
        usage: 'Drinking water, liquid',
        example_sentence: {
          hiligaynon: 'Pwede ko kabakal sang tubig?',
          english: 'Can I buy some water?',
          korean: '물을 살 수 있나요?',
          chinese: '我可以买点水吗？'
        },
        image_description: 'Glass of clear water',
        category_tags: ['beverage', 'basic', 'essential']
      },
      {
        id: 9,
        hiligaynon: 'Batchoy',
        pronunciation: 'BAHT-choy',
        english: 'La Paz Batchoy (local noodle soup)',
        korean: '라 파스 바쳐이 (지역 국수 수프)',
        chinese: '拉巴斯汤面（当地面条汤）',
        usage: 'Famous Iloilo noodle dish',
        example_sentence: {
          hiligaynon: 'Ang batchoy diri sa Iloilo ang pinakamanamit.',
          english: 'The batchoy here in Iloilo is the most delicious.',
          korean: '일로일로의 바쳐이가 가장 맛있어요.',
          chinese: '伊洛伊洛的汤面最好吃。'
        },
        image_description: 'Bowl of La Paz Batchoy with noodles and toppings',
        category_tags: ['local', 'specialty', 'noodles']
      },
      {
        id: 10,
        hiligaynon: 'Puto',
        pronunciation: 'POO-to',
        english: 'Steamed rice cake',
        korean: '찐 쌀떡',
        chinese: '蒸米糕',
        usage: 'Traditional Filipino dessert/snack',
        example_sentence: {
          hiligaynon: 'Manamit ang puto nga may cheese.',
          english: 'Puto with cheese is delicious.',
          korean: '치즈가 있는 푸토가 맛있어요.',
          chinese: '有奶酪的米糕很好吃。'
        },
        image_description: 'Colorful steamed rice cakes with cheese',
        category_tags: ['dessert', 'traditional', 'snack']
      }
    ]
  },
  
  school: {
    category: 'School Life',
    icon: 'mdi:school',
    color: 'var(--yinmn-blue)',
    description: 'School supplies and classroom vocabulary',
    words: [
      {
        id: 11,
        hiligaynon: 'Eskwelahan',
        pronunciation: 'es-KWE-la-han',
        english: 'School',
        korean: '학교',
        chinese: '学校',
        usage: 'Educational institution',
        example_sentence: {
          hiligaynon: 'Naga-kadto ko sa eskwelahan kada adlaw.',
          english: 'I go to school every day.',
          korean: '저는 매일 학교에 가요.',
          chinese: '我每天去学校。'
        },
        image_description: 'School building with students',
        category_tags: ['basic', 'education', 'place']
      },
      {
        id: 12,
        hiligaynon: 'Maestro',
        pronunciation: 'ma-ES-tro',
        english: 'Teacher (male)',
        korean: '여교사',
        chinese: '女老师',
        usage: 'Male teacher or instructor',
        example_sentence: {
          hiligaynon: 'Ang maestro namon bu-otan gid.',
          english: 'Our teacher is very kind.',
          korean: '우리 선생님은 정말 친절해요.',
          chinese: '我们的老师非常善良。'
        },
        image_description: 'Female teacher in classroom',
        category_tags: ['people', 'education', 'formal']
      },
      {
        id: 13,
        hiligaynon: 'Libro',
        pronunciation: 'LEE-bro',
        english: 'Book',
        korean: '책',
        chinese: '书',
        usage: 'Textbook or any book',
        example_sentence: {
          hiligaynon: 'Nalipat ko sang akon libro.',
          english: 'I forgot my book.',
          korean: '제 책을 잊었어요.',
          chinese: '我忘了带书。'
        },
        image_description: 'Stack of textbooks',
        category_tags: ['object', 'study', 'basic']
      },
      {
        id: 14,
        hiligaynon: 'Sulat',
        pronunciation: 'SU-lat',
        english: 'Write / Letter',
        korean: '쓰다 / 편지',
        chinese: '写 / 信',
        usage: 'Action of writing or a letter',
        example_sentence: {
          hiligaynon: 'Ma-sulat kita sang homework.',
          english: 'Let\'s write the homework.',
          korean: '숙제를 써요.',
          chinese: '我们写作业吧。'
        },
        image_description: 'Student writing in notebook',
        category_tags: ['verb', 'study', 'activity']
      },
      {
        id: 15,
        hiligaynon: 'Exam',
        pronunciation: 'Ek-sam',
        english: 'Exam / Test',
        korean: '시험',
        chinese: '考试',
        usage: 'Academic test or examination',
        example_sentence: {
          hiligaynon: 'May exam kami buwas sa Math.',
          english: 'We have an exam tomorrow in Math.',
          korean: '내일 수학 시험이 있어요.',
          chinese: '我们明天有数学考试。'
        },
        image_description: 'Students taking an exam',
        category_tags: ['academic', 'test', 'school']
      }
    ]
  },
  
  transportation: {
    category: 'Transportation',
    icon: 'mdi:car',
    color: 'var(--rojo)',
    description: 'Transportation methods and directions',
    words: [
      {
        id: 16,
        hiligaynon: 'Jeep',
        pronunciation: 'JEEP',
        english: 'Jeepney',
        korean: '지프니 (필리핀 대중교통)',
        chinese: '吉普尼（菲律宾公共交通）',
        usage: 'Popular public transportation in Philippines',
        example_sentence: {
          hiligaynon: 'Masakay kita sang jeep pakadto sa plaza.',
          english: 'Let\'s ride the jeepney going to the plaza.',
          korean: '광장으로 가는 지프니를 타요.',
          chinese: '我们坐吉普尼去广场吧。'
        },
        image_description: 'Colorful jeepney on the street',
        category_tags: ['vehicle', 'public', 'local']
      },
      {
        id: 17,
        hiligaynon: 'Diin',
        pronunciation: 'DEE-in',
        english: 'Where',
        korean: '어디',
        chinese: '哪里',
        usage: 'Question word for location',
        example_sentence: {
          hiligaynon: 'Diin ang SM City?',
          english: 'Where is SM City?',
          korean: 'SM 시티가 어디에 있나요?',
          chinese: 'SM城在哪里？'
        },
        image_description: 'Person pointing and asking directions',
        category_tags: ['question', 'direction', 'basic']
      },
      {
        id: 18,
        hiligaynon: 'Tricycle',
        pronunciation: 'TREE-cycle',
        english: 'Tricycle (motorcycle with sidecar)',
        korean: '트라이시클 (오토바이 사이드카)',
        chinese: '三轮车（摩托车边车）',
        usage: 'Common short-distance transportation',
        example_sentence: {
          hiligaynon: 'Pila ang bayad sa tricycle?',
          english: 'How much is the tricycle fare?',
          korean: '트라이시클 요금이 얼마인가요?',
          chinese: '三轮车费多少钱？'
        },
        image_description: 'Tricycle with driver',
        category_tags: ['vehicle', 'fare', 'local']
      },
      {
        id: 19,
        hiligaynon: 'Tindahan',
        pronunciation: 'tin-DA-han',
        english: 'Store / Shop',
        korean: '가게 / 상점',
        chinese: '商店',
        usage: 'General term for retail store',
        example_sentence: {
          hiligaynon: 'Makadto kita sa tindahan sang school supplies.',
          english: 'Let\'s go to the school supplies store.',
          korean: '학용품 가게에 가요.',
          chinese: '我们去文具店吧。'
        },
        image_description: 'Small local store front',
        category_tags: ['place', 'shopping', 'daily']
      },
      {
        id: 20,
        hiligaynon: 'Bayad',
        pronunciation: 'BA-yad',
        english: 'Fare / Payment',
        korean: '요금 / 지불',
        chinese: '费用 / 付款',
        usage: 'Money paid for transportation',
        example_sentence: {
          hiligaynon: 'Pila ang bayad pakadto sa airport?',
          english: 'How much is the fare to the airport?',
          korean: '공항까지 요금이 얼마인가요?',
          chinese: '到机场的费用是多少？'
        },
        image_description: 'Hand giving money for transportation',
        category_tags: ['money', 'transport', 'essential']
      }
    ]
  },
  
  shopping: {
    category: 'Shopping & Market',
    icon: 'mdi:shopping',
    color: 'var(--yinmn-blue)',
    description: 'Shopping vocabulary and market terms',
    words: [
      {
        id: 21,
        hiligaynon: 'Merkado',
        pronunciation: 'mer-KA-do',
        english: 'Market',
        korean: '시장',
        chinese: '市场',
        usage: 'Traditional marketplace',
        example_sentence: {
          hiligaynon: 'Mabakal kita sang prutas sa merkado.',
          english: 'Let\'s buy fruits at the market.',
          korean: '시장에서 과일을 사요.',
          chinese: '我们在市场买水果吧。'
        },
        image_description: 'Busy traditional market scene',
        category_tags: ['place', 'shopping', 'local']
      },
      {
        id: 22,
        hiligaynon: 'Pila',
        pronunciation: 'PEE-la',
        english: 'How much / How many',
        korean: '얼마 / 몇 개',
        chinese: '多少',
        usage: 'Question word for quantity or price',
        example_sentence: {
          hiligaynon: 'Tag-pila ini ang mangga?',
          english: 'How much is this mango?',
          korean: '이 망고가 얼마인가요?',
          chinese: '这个芒果多少钱？'
        },
        image_description: 'Customer asking vendor about price',
        category_tags: ['question', 'price', 'essential']
      },
      {
        id: 23,
        hiligaynon: 'Bakal',
        pronunciation: 'BA-kal',
        english: 'Buy',
        korean: '사다',
        chinese: '买',
        usage: 'Action of purchasing',
        example_sentence: {
          hiligaynon: 'Gusto ko mag-bakal sang bag.',
          english: 'I want to buy a bag.',
          korean: '가방을 사고 싶어요.',
          chinese: '我想买个包。'
        },
        image_description: 'Person purchasing items',
        category_tags: ['verb', 'shopping', 'basic']
      },
      {
        id: 24,
        hiligaynon: 'Mahal',
        pronunciation: 'ma-HAL',
        english: 'Expensive / Love',
        korean: '비싸다 / 사랑',
        chinese: '贵 / 爱',
        usage: 'High price or expressing love',
        example_sentence: {
          hiligaynon: 'Mahal gid ini nga sapatos.',
          english: 'These shoes are really expensive.',
          korean: '이 신발은 정말 비싸네요.',
          chinese: '这双鞋真的很贵。'
        },
        image_description: 'Expensive items with price tags',
        category_tags: ['price', 'emotion', 'common']
      },
      {
        id: 25,
        hiligaynon: 'Kwarta',
        pronunciation: 'KWAR-ta',
        english: 'Money',
        korean: '돈',
        chinese: '钱',
        usage: 'Currency, cash',
        example_sentence: {
          hiligaynon: 'Wala ko sang kwarta subong.',
          english: 'I don\'t have money right now.',
          korean: '지금 돈이 없어요.',
          chinese: '我现在没有钱。'
        },
        image_description: 'Philippine peso bills and coins',
        category_tags: ['money', 'basic', 'essential']
      }
    ]
  }
}

// Helper functions for vocabulary management
export const getVocabularyByCategory = (category) => {
  return vocabularyData[category] || null
}

export const getAllVocabulary = () => {
  const allWords = []
  Object.keys(vocabularyData).forEach(category => {
    allWords.push(...vocabularyData[category].words)
  })
  return allWords
}

export const getRandomVocabulary = (count = 10) => {
  const allWords = getAllVocabulary()
  const shuffled = allWords.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const searchVocabulary = (searchTerm, language = 'english') => {
  const allWords = getAllVocabulary()
  return allWords.filter(word => 
    word.hiligaynon.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word[language].toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export const getCategoriesList = () => {
  return Object.keys(vocabularyData).map(key => ({
    id: key,
    name: vocabularyData[key].category,
    icon: vocabularyData[key].icon,
    color: vocabularyData[key].color,
    description: vocabularyData[key].description,
    wordCount: vocabularyData[key].words.length
  }))
}

// Enhanced vocabulary with image support
let enhancedVocabularyCache = null

/**
 * Get vocabulary words enhanced with images
 * @param {boolean} forceRefresh - Force refresh of image data
 * @returns {Array} Enhanced vocabulary words with image data
 */
export const getEnhancedVocabulary = async (forceRefresh = false) => {
  // Return cached data if available and not forcing refresh
  if (enhancedVocabularyCache && !forceRefresh) {
    return enhancedVocabularyCache
  }

  try {
    // Dynamic import to avoid circular dependencies
    const { default: imageSearchService } = await import('@/services/imageSearchService.js')
    
    const allWords = getAllVocabulary()
    const enhancedWords = []

    // Process words in batches to avoid API rate limits
    const batchSize = 5
    for (let i = 0; i < allWords.length; i += batchSize) {
      const batch = allWords.slice(i, i + batchSize)
      
      const enhancedBatch = await Promise.all(
        batch.map(async (word) => {
          try {
            // Get the best image for this word
            const image = await imageSearchService.getBestImage(word)
            
            return {
              ...word,
              image: image,
              hasImage: !!image
            }
          } catch (error) {
            console.warn(`Failed to get image for word ${word.hiligaynon}:`, error.message)
            return {
              ...word,
              image: null,
              hasImage: false
            }
          }
        })
      )
      
      enhancedWords.push(...enhancedBatch)
      
      // Small delay between batches to be respectful to API
      if (i + batchSize < allWords.length) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    // Cache the enhanced vocabulary
    enhancedVocabularyCache = enhancedWords
    
    return enhancedWords
  } catch (error) {
    console.error('Failed to enhance vocabulary with images:', error.message)
    
    // Return original vocabulary without images on error
    return getAllVocabulary().map(word => ({
      ...word,
      image: null,
      hasImage: false
    }))
  }
}

/**
 * Get enhanced vocabulary by category
 */
export const getEnhancedVocabularyByCategory = async (categoryId, forceRefresh = false) => {
  const enhancedVocab = await getEnhancedVocabulary(forceRefresh)
  const categoryData = vocabularyData[categoryId]
  
  if (!categoryData) return null
  
  return {
    ...categoryData,
    words: enhancedVocab.filter(word => {
      return categoryData.words.some(catWord => catWord.id === word.id)
    })
  }
}

/**
 * Clear enhanced vocabulary cache
 */
export const clearEnhancedVocabularyCache = () => {
  enhancedVocabularyCache = null
}