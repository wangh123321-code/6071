import Mock from 'mockjs'

const Random = Mock.Random

const catBreeds = [
  '中华田园猫', '橘猫', '狸花猫', '三花猫', '奶牛猫',
  '英国短毛猫', '美国短毛猫', '布偶猫', '暹罗猫', '缅因猫',
  '波斯猫', '苏格兰折耳猫', '俄罗斯蓝猫', '孟加拉豹猫', '加菲猫'
]

const catColors = [
  '橘色', '黑色', '白色', '灰色', '狸花', '三花',
  '奶牛', '蓝猫', '奶牛花', '玳瑁', '重点色', '烟灰色'
]

const personalities = [
  '活泼好动', '安静黏人', '独立自主', '温柔亲人',
  '调皮捣蛋', '胆小敏感', '傲娇高冷', '暖心治愈',
  '社交达人', '慢热稳重', '好奇心强', '慵懒佛系'
]

const healthStatuses = [
  { label: '非常健康', value: 'excellent' },
  { label: '良好', value: 'good' },
  { label: '需特殊照顾', value: 'special_care' }
]

const vaccineTypes = [
  '猫三联疫苗', '狂犬疫苗', '猫白血病疫苗', '猫传染性腹膜炎疫苗'
]

const rescueStories = [
  '在一个寒冷的雨夜，小家伙蜷缩在小区楼道里瑟瑟发抖，被好心的居民发现后送到了救助站。刚来时浑身湿透，眼神惊恐，经过志愿者的悉心照料，现在已经变成了一只健康活泼的小可爱。',
  '被发现时在垃圾桶旁觅食，身上有多处伤口，营养不良。经过治疗和调养，伤口已经完全愈合，体重也增加了不少，现在非常亲人。',
  '原来的主人因为过敏不得不将它送走，来到救助站后一直很忧郁，直到最近才慢慢敞开心扉，开始和志愿者互动。它特别渴望一个稳定温暖的家。',
  '从非法繁殖场解救出来，长期被关在狭小的笼子里，性格比较敏感。经过几个月的耐心陪伴，它开始信任人类，会主动蹭人的手心了。',
  '在公园里被发现时还是一只小奶猫，眼睛都还没睁开，志愿者们用奶瓶一点点把它喂大，现在已经长成了一只漂亮的大猫咪，性格特别亲人。'
]

const generateVaccineRecords = () => {
  const records = []
  const count = Random.integer(2, 4)
  for (let i = 0; i < count; i++) {
    records.push({
      id: Random.guid(),
      vaccineName: Random.pick(vaccineTypes),
      date: Random.date('yyyy-MM-dd'),
      nextDate: Random.date('yyyy-MM-dd'),
      hospital: `爱心宠物医院${Random.integer(1, 5)}分院`,
      doctor: Random.cname() + '医生'
    })
  }
  return records.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const generatePersonalityTraits = () => {
  const shuffled = [...personalities].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4).map((trait, index) => ({
    name: trait,
    score: Random.integer(60, 95),
    description: `${trait}指数${Random.integer(60, 95)}分`
  }))
}

const generateCats = (count = 50) => {
  const cats = []
  for (let i = 1; i <= count; i++) {
    const breed = Random.pick(catBreeds)
    const color = Random.pick(catColors)
    const ageMonths = Random.integer(2, 120)
    const years = Math.floor(ageMonths / 12)
    const months = ageMonths % 12
    const ageText = years > 0 
      ? months > 0 ? `${years}岁${months}个月` : `${years}岁`
      : `${months}个月`
    
    const healthStatus = Random.pick(healthStatuses)
    
    cats.push({
      id: i,
      name: Random.cname().replace(/[张王李赵刘陈杨黄周吴]/, ['小', '大', '阿', '咪'][Random.integer(0, 3)]) + Random.pick(['喵', '咪', '宝', '妞', '仔', '豆', '糖', '果', '球', '花']),
      breed,
      color,
      gender: Random.pick(['公', '母']),
      ageMonths,
      ageText,
      ageCategory: ageMonths < 12 ? 'kitten' : ageMonths < 84 ? 'adult' : 'senior',
      weight: Random.float(2, 8, 1, 1),
      healthStatus: healthStatus.value,
      healthStatusText: healthStatus.label,
      sterilized: Random.boolean(0.7),
      vaccineCompleted: Random.boolean(0.8),
      personality: generatePersonalityTraits(),
      activityLevel: Random.integer(1, 5),
      independenceLevel: Random.integer(1, 5),
      friendlinessLevel: Random.integer(1, 5),
      playfulnessLevel: Random.integer(1, 5),
      noiseLevel: Random.integer(1, 5),
      sheddingLevel: Random.integer(1, 5),
      childFriendly: Random.boolean(0.6),
      petFriendly: Random.boolean(0.5),
      apartmentSuitable: Random.boolean(0.7),
      specialNeeds: healthStatus.value === 'special_care' ? Random.pick(['需要定期服药', '需要特殊饮食', '行动不便', '需要更多陪伴']) : null,
      rescueStory: Random.pick(rescueStories),
      rescueDate: Random.date('yyyy-MM-dd'),
      vaccineRecords: generateVaccineRecords(),
      images: [
        `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20fur%20portrait%20warm%20soft%20lighting&image_size=square_hd`,
        `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20playing%20cozy%20home&image_size=square_hd`,
        `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20sleeping%20cute%20fluffy&image_size=square_hd`
      ],
      avatar: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20fur%20portrait%20warm%20soft%20lighting&image_size=square`,
      views: Random.integer(100, 5000),
      favorites: Random.integer(10, 500),
      adoptionStatus: Random.pick(['available', 'pending', 'adopted']),
      matchScore: null
    })
  }
  return cats
}

const questionnaireQuestions = [
  {
    id: 1,
    section: 'living',
    title: '居住环境',
    questions: [
      {
        id: 'housing_type',
        type: 'single',
        question: '您目前的住房类型是？',
        options: [
          { value: 'apartment_small', label: '小户型公寓（<60㎡）', score: { apartmentSuitable: 5, activityLevel: -1 } },
          { value: 'apartment_medium', label: '中等户型公寓（60-100㎡）', score: { apartmentSuitable: 4, activityLevel: 0 } },
          { value: 'apartment_large', label: '大户型公寓（>100㎡）', score: { apartmentSuitable: 3, activityLevel: 1 } },
          { value: 'house', label: '独栋/联排别墅', score: { apartmentSuitable: 1, activityLevel: 2 } }
        ],
        required: true
      },
      {
        id: 'has_balcony',
        type: 'single',
        question: '您家是否有阳台或露台？',
        options: [
          { value: 'yes_closed', label: '有，已封闭', score: { activityLevel: 1 } },
          { value: 'yes_open', label: '有，未封闭但计划安装防护网', score: { activityLevel: 0 } },
          { value: 'no', label: '没有', score: { activityLevel: -1 } }
        ],
        required: true
      },
      {
        id: 'family_members',
        type: 'single',
        question: '您家中的成员情况是？',
        options: [
          { value: 'single', label: '独居', score: { independenceLevel: 0, friendlinessLevel: 0 } },
          { value: 'couple', label: '两人居住', score: { independenceLevel: -1, friendlinessLevel: 1 } },
          { value: 'family_kids', label: '有小孩的家庭', score: { childFriendly: 5, friendlinessLevel: 2 } },
          { value: 'family_elderly', label: '有老人的家庭', score: { activityLevel: -2, friendlinessLevel: 1 } },
          { value: 'multi_generation', label: '多人大家庭', score: { friendlinessLevel: 2, noiseLevel: -1 } }
        ],
        required: true
      },
      {
        id: 'has_other_pets',
        type: 'single',
        question: '您家中是否有其他宠物？',
        options: [
          { value: 'no', label: '没有', score: { petFriendly: 0 } },
          { value: 'cat', label: '有猫', score: { petFriendly: 5, friendlinessLevel: 1 } },
          { value: 'dog', label: '有狗', score: { petFriendly: 3, friendlinessLevel: 1 } },
          { value: 'other', label: '有其他宠物', score: { petFriendly: 2 } }
        ],
        required: true
      }
    ]
  },
  {
    id: 2,
    section: 'lifestyle',
    title: '生活作息',
    questions: [
      {
        id: 'work_schedule',
        type: 'single',
        question: '您的工作时间安排是？',
        options: [
          { value: 'regular', label: '朝九晚五，规律作息', score: { independenceLevel: 1, activityLevel: 0 } },
          { value: 'flexible', label: '时间灵活，经常在家', score: { independenceLevel: -2, activityLevel: 2, friendlinessLevel: 1 } },
          { value: 'busy', label: '工作繁忙，经常加班', score: { independenceLevel: 3, activityLevel: -1 } },
          { value: 'shift', label: '需要倒班/经常出差', score: { independenceLevel: 5, activityLevel: -2 } }
        ],
        required: true
      },
      {
        id: 'daily_free_time',
        type: 'single',
        question: '您每天能陪伴猫咪的时间大约是？',
        options: [
          { value: 'less_1h', label: '少于1小时', score: { independenceLevel: 3, playfulnessLevel: -2 } },
          { value: '1_2h', label: '1-2小时', score: { independenceLevel: 1, playfulnessLevel: -1 } },
          { value: '2_4h', label: '2-4小时', score: { independenceLevel: 0, playfulnessLevel: 1 } },
          { value: 'more_4h', label: '4小时以上', score: { independenceLevel: -2, playfulnessLevel: 3 } }
        ],
        required: true
      },
      {
        id: 'activity_preference',
        type: 'single',
        question: '您在家时的活动偏好是？',
        options: [
          { value: 'quiet', label: '喜欢安静，看书/看电视', score: { activityLevel: -2, noiseLevel: -2 } },
          { value: 'moderate', label: '适中，偶尔会有朋友来访', score: { activityLevel: 0, noiseLevel: 0 } },
          { value: 'active', label: '喜欢运动，经常播放音乐', score: { activityLevel: 2, noiseLevel: 1 } },
          { value: 'social', label: '经常举办聚会，家里比较热闹', score: { activityLevel: 3, noiseLevel: 2, friendlinessLevel: 2 } }
        ],
        required: true
      },
      {
        id: 'noise_sensitivity',
        type: 'single',
        question: '您对噪音的敏感程度是？',
        options: [
          { value: 'very_sensitive', label: '非常敏感，喜欢安静', score: { noiseLevel: -5 } },
          { value: 'somewhat_sensitive', label: '比较敏感，希望不要太吵', score: { noiseLevel: -2 } },
          { value: 'neutral', label: '无所谓，都可以接受', score: { noiseLevel: 0 } },
          { value: 'not_sensitive', label: '不敏感，完全不介意', score: { noiseLevel: 1 } }
        ],
        required: true
      }
    ]
  },
  {
    id: 3,
    section: 'experience',
    title: '养猫经验',
    questions: [
      {
        id: 'cat_experience',
        type: 'single',
        question: '您的养猫经验如何？',
        options: [
          { value: 'first_time', label: '第一次养猫', score: { friendlinessLevel: 2, independenceLevel: 1 } },
          { value: 'some', label: '养过1-2只，有一定经验', score: { friendlinessLevel: 1, independenceLevel: 0 } },
          { value: 'experienced', label: '养过多只，经验丰富', score: { friendlinessLevel: 0, independenceLevel: -1 } },
          { value: 'expert', label: '非常了解猫咪，可照顾特殊需求的猫', score: { friendlinessLevel: -1, independenceLevel: -2 } }
        ],
        required: true
      },
      {
        id: 'preferred_age',
        type: 'single',
        question: '您倾向于领养什么年龄段的猫咪？',
        options: [
          { value: 'kitten', label: '幼猫（0-1岁），活泼可爱', score: { ageCategory_kitten: 10, activityLevel: 2, playfulnessLevel: 2 } },
          { value: 'young', label: '青年猫（1-3岁），精力充沛', score: { ageCategory_adult: 8, activityLevel: 1 } },
          { value: 'adult', label: '成年猫（3-7岁），性格稳定', score: { ageCategory_adult: 10, independenceLevel: 1 } },
          { value: 'senior', label: '老年猫（7岁+），安静慵懒', score: { ageCategory_senior: 10, activityLevel: -2 } },
          { value: 'no_preference', label: '都可以，看缘分', score: {} }
        ],
        required: true
      },
      {
        id: 'special_needs_willing',
        type: 'single',
        question: '您是否愿意照顾有特殊需求的猫咪？（如定期服药、特殊饮食等）',
        options: [
          { value: 'yes', label: '非常愿意，可以给予更多关爱', score: { healthStatus_special_care: 10 } },
          { value: 'maybe', label: '可以考虑，视具体情况而定', score: { healthStatus_special_care: 3 } },
          { value: 'prefer_not', label: '更倾向于健康的猫咪', score: { healthStatus_excellent: 5, healthStatus_good: 3 } },
          { value: 'no', label: '暂时没有能力照顾', score: { healthStatus_excellent: 10, healthStatus_good: 8 } }
        ],
        required: true
      },
      {
        id: 'budget',
        type: 'single',
        question: '您每月能为猫咪提供的预算大约是？',
        options: [
          { value: 'basic', label: '300-500元（基础保障）', score: { sheddingLevel: 1 } },
          { value: 'moderate', label: '500-1000元（适中）', score: { sheddingLevel: 0 } },
          { value: 'comfortable', label: '1000-2000元（较好）', score: { healthStatus_special_care: 2 } },
          { value: 'generous', label: '2000元以上（充裕）', score: { healthStatus_special_care: 5 } }
        ],
        required: true
      }
    ]
  },
  {
    id: 4,
    section: 'preference',
    title: '猫咪偏好',
    questions: [
      {
        id: 'gender_preference',
        type: 'single',
        question: '对猫咪的性别有偏好吗？',
        options: [
          { value: 'male', label: '公猫', score: { gender_male: 5 } },
          { value: 'female', label: '母猫', score: { gender_female: 5 } },
          { value: 'no_preference', label: '都可以', score: {} }
        ],
        required: true
      },
      {
        id: 'fur_length',
        type: 'single',
        question: '对毛发长度有偏好吗？',
        options: [
          { value: 'short', label: '偏好短毛', score: { sheddingLevel: -2 } },
          { value: 'long', label: '偏好长毛', score: { sheddingLevel: 2 } },
          { value: 'no_preference', label: '都可以', score: {} }
        ],
        required: true
      },
      {
        id: 'personality_preference',
        type: 'multiple',
        question: '您更喜欢什么样性格的猫咪？（可多选）',
        options: [
          { value: 'active', label: '活泼好动，喜欢玩耍', score: { activityLevel: 3, playfulnessLevel: 3 } },
          { value: 'cuddly', label: '黏人爱撒娇，喜欢被抱', score: { friendlinessLevel: 3, independenceLevel: -3 } },
          { value: 'independent', label: '独立自主，不过度黏人', score: { independenceLevel: 3, friendlinessLevel: -1 } },
          { value: 'gentle', label: '温柔安静，适合陪伴', score: { activityLevel: -2, friendlinessLevel: 2, noiseLevel: -2 } },
          { value: 'curious', label: '好奇心强，聪明伶俐', score: { playfulnessLevel: 2, activityLevel: 1 } },
          { value: 'lazy', label: '慵懒佛系，不爱动', score: { activityLevel: -3, playfulnessLevel: -2 } }
        ],
        required: true,
        maxSelect: 3
      }
    ]
  }
]

export const mockCats = generateCats(50)
export const mockQuestions = questionnaireQuestions

Mock.setup({
  timeout: '200-600'
})

Mock.mock('/api/cats', 'get', (options) => {
  const url = new URL('http://localhost' + options.url)
  const page = parseInt(url.searchParams.get('page')) || 1
  const pageSize = parseInt(url.searchParams.get('pageSize')) || 12
  const breed = url.searchParams.get('breed')
  const color = url.searchParams.get('color')
  const ageCategory = url.searchParams.get('ageCategory')
  const search = url.searchParams.get('search')
  
  let filteredCats = [...mockCats]
  
  if (breed && breed !== 'all') {
    filteredCats = filteredCats.filter(cat => cat.breed === breed)
  }
  if (color && color !== 'all') {
    filteredCats = filteredCats.filter(cat => cat.color === color)
  }
  if (ageCategory && ageCategory !== 'all') {
    filteredCats = filteredCats.filter(cat => cat.ageCategory === ageCategory)
  }
  if (search) {
    const searchLower = search.toLowerCase()
    filteredCats = filteredCats.filter(cat => 
      cat.name.toLowerCase().includes(searchLower) ||
      cat.breed.toLowerCase().includes(searchLower)
    )
  }
  
  const total = filteredCats.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = filteredCats.slice(start, end)
  
  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  }
})

Mock.mock(/\/api\/cats\/\d+/, 'get', (options) => {
  const id = parseInt(options.url.match(/\/api\/cats\/(\d+)/)[1])
  const cat = mockCats.find(c => c.id === id)
  
  if (cat) {
    return {
      code: 200,
      message: 'success',
      data: cat
    }
  } else {
    return {
      code: 404,
      message: '猫咪不存在',
      data: null
    }
  }
})

Mock.mock('/api/questionnaire', 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: mockQuestions
  }
})

Mock.mock('/api/match', 'post', (options) => {
  const body = JSON.parse(options.body)
  const answers = body.answers
  
  const scoredCats = mockCats
    .filter(cat => cat.adoptionStatus === 'available')
    .map(cat => {
      let score = 50
      
      for (const section of mockQuestions) {
        for (const question of section.questions) {
          const answer = answers[question.id]
          if (!answer) continue
          
          const selectedOptions = Array.isArray(answer) ? answer : [answer]
          
          for (const selectedValue of selectedOptions) {
            const option = question.options.find(o => o.value === selectedValue)
            if (!option) continue
            
            for (const [key, value] of Object.entries(option.score)) {
              if (key === 'ageCategory_kitten' && cat.ageCategory === 'kitten') {
                score += value
              } else if (key === 'ageCategory_adult' && cat.ageCategory === 'adult') {
                score += value
              } else if (key === 'ageCategory_senior' && cat.ageCategory === 'senior') {
                score += value
              } else if (key === 'healthStatus_excellent' && cat.healthStatus === 'excellent') {
                score += value
              } else if (key === 'healthStatus_good' && cat.healthStatus === 'good') {
                score += value
              } else if (key === 'healthStatus_special_care' && cat.healthStatus === 'special_care') {
                score += value
              } else if (key === 'gender_male' && cat.gender === '公') {
                score += value
              } else if (key === 'gender_female' && cat.gender === '母') {
                score += value
              } else if (key === 'childFriendly') {
                score += cat.childFriendly ? value : -value
              } else if (key === 'petFriendly') {
                score += cat.petFriendly ? value : -value
              } else if (key === 'apartmentSuitable') {
                score += cat.apartmentSuitable ? value : -value
              } else if (typeof cat[key] === 'number') {
                score += value * cat[key] / 5
              }
            }
          }
        }
      }
      
      score = Math.max(0, Math.min(100, Math.round(score)))
      
      return {
        ...cat,
        matchScore: score
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)
  
  const personalityMatch = {
    activity: Math.round(Math.random() * 30 + 60),
    space: Math.round(Math.random() * 30 + 60),
    experience: Math.round(Math.random() * 30 + 60),
    lifestyle: Math.round(Math.random() * 30 + 60),
    personality: Math.round(Math.random() * 30 + 60)
  }
  
  const suggestions = [
    '您的生活节奏比较规律，适合选择性格稳定的成年猫。',
    '您有较多的陪伴时间，可以考虑活泼好动的幼猫。',
    '您的居住空间适合猫咪活动，大部分猫咪都能适应。',
    '建议选择与您生活习惯匹配度高的猫咪，减少磨合期。'
  ]
  
  return {
    code: 200,
    message: 'success',
    data: {
      matchedCats: scoredCats,
      personalityMatch,
      overallScore: Math.round(Object.values(personalityMatch).reduce((a, b) => a + b, 0) / Object.values(personalityMatch).length),
      suggestions
    }
  }
})

Mock.mock('/api/appointment', 'post', (options) => {
  const body = JSON.parse(options.body)
  return {
    code: 200,
    message: '预约申请已提交，工作人员会在24小时内与您联系',
    data: {
      appointmentId: Date.now(),
      ...body
    }
  }
})

Mock.mock('/api/favorites', 'get', () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  const favoriteCats = mockCats.filter(cat => favorites.includes(cat.id))
  return {
    code: 200,
    message: 'success',
    data: favoriteCats
  }
})

Mock.mock('/api/filters', 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: {
      breeds: ['all', ...new Set(mockCats.map(c => c.breed))],
      colors: ['all', ...new Set(mockCats.map(c => c.color))],
      ageCategories: [
        { value: 'all', label: '全部年龄' },
        { value: 'kitten', label: '幼猫（0-1岁）' },
        { value: 'adult', label: '成年猫（1-7岁）' },
        { value: 'senior', label: '老年猫（7岁+）' }
      ]
    }
  }
})

export default Mock
