const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomFloat = (min, max, decimals = 1) => {
  const factor = Math.pow(10, decimals)
  return Math.floor((Math.random() * (max - min) + min) * factor) / factor
}
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randomBoolean = (probability = 0.5) => Math.random() < probability
const randomGuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0
  const v = c === 'x' ? r : (r & 0x3 | 0x8)
  return v.toString(16)
})
const randomDate = (start = new Date(2020, 0, 1), end = new Date()) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}
const randomCname = () => {
  const surnames = ['张', '王', '李', '赵', '刘', '陈', '杨', '黄', '周', '吴', '徐', '孙', '马', '朱', '胡']
  const names = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛']
  return randomPick(surnames) + randomPick(names)
}

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
  const count = randomInt(2, 4)
  for (let i = 0; i < count; i++) {
    records.push({
      id: randomGuid(),
      vaccineName: randomPick(vaccineTypes),
      date: randomDate(),
      nextDate: randomDate(new Date(), new Date(2026, 11, 31)),
      hospital: `爱心宠物医院${randomInt(1, 5)}分院`,
      doctor: randomCname() + '医生'
    })
  }
  return records.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const generatePersonalityTraits = () => {
  const shuffled = [...personalities].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4).map((trait) => ({
    name: trait,
    score: randomInt(60, 95),
    description: `${trait}指数${randomInt(60, 95)}分`
  }))
}

const generateCats = (count = 50) => {
  const cats = []
  const namePrefixes = ['小', '大', '阿', '咪']
  const nameSuffixes = ['喵', '咪', '宝', '妞', '仔', '豆', '糖', '果', '球', '花']
  
  for (let i = 1; i <= count; i++) {
    const breed = randomPick(catBreeds)
    const color = randomPick(catColors)
    const ageMonths = randomInt(2, 120)
    const years = Math.floor(ageMonths / 12)
    const months = ageMonths % 12
    const ageText = years > 0 
      ? months > 0 ? `${years}岁${months}个月` : `${years}岁`
      : `${months}个月`
    
    const healthStatus = randomPick(healthStatuses)
    
    cats.push({
      id: i,
      name: randomPick(namePrefixes) + randomPick(nameSuffixes),
      breed,
      color,
      gender: randomPick(['公', '母']),
      ageMonths,
      ageText,
      ageCategory: ageMonths < 12 ? 'kitten' : ageMonths < 84 ? 'adult' : 'senior',
      weight: randomFloat(2, 8, 1),
      healthStatus: healthStatus.value,
      healthStatusText: healthStatus.label,
      sterilized: randomBoolean(0.7),
      vaccineCompleted: randomBoolean(0.8),
      personality: generatePersonalityTraits(),
      activityLevel: randomInt(1, 5),
      independenceLevel: randomInt(1, 5),
      friendlinessLevel: randomInt(1, 5),
      playfulnessLevel: randomInt(1, 5),
      noiseLevel: randomInt(1, 5),
      sheddingLevel: randomInt(1, 5),
      childFriendly: randomBoolean(0.6),
      petFriendly: randomBoolean(0.5),
      apartmentSuitable: randomBoolean(0.7),
      specialNeeds: healthStatus.value === 'special_care' ? randomPick(['需要定期服药', '需要特殊饮食', '行动不便', '需要更多陪伴']) : null,
      rescueStory: randomPick(rescueStories),
      rescueDate: randomDate(new Date(2022, 0, 1)),
      vaccineRecords: generateVaccineRecords(),
      images: [
        `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20fur%20portrait%20warm%20soft%20lighting&image_size=square_hd`,
        `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20playing%20cozy%20home&image_size=square_hd`,
        `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20sleeping%20cute%20fluffy&image_size=square_hd`
      ],
      avatar: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20${encodeURIComponent(breed)}%20cat%20${encodeURIComponent(color)}%20fur%20portrait%20warm%20soft%20lighting&image_size=square`,
      views: randomInt(100, 5000),
      favorites: randomInt(10, 500),
      adoptionStatus: randomPick(['available', 'pending', 'adopted']),
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

const calculateDimensionScores = (answers, matchedCats) => {
  const scores = {
    activity: 70,
    space: 70,
    experience: 70,
    lifestyle: 70,
    personality: 70
  }
  
  const workSchedule = answers.work_schedule
  const dailyFreeTime = answers.daily_free_time
  const activityPreference = answers.activity_preference
  const housingType = answers.housing_type
  const hasBalcony = answers.has_balcony
  const catExperience = answers.cat_experience
  const preferredAge = answers.preferred_age
  const specialNeedsWilling = answers.special_needs_willing
  const noiseSensitivity = answers.noise_sensitivity
  const personalityPref = answers.personality_preference || []
  const familyMembers = answers.family_members
  const hasOtherPets = answers.has_other_pets
  
  if (workSchedule === 'regular') scores.activity += 10
  else if (workSchedule === 'flexible') scores.activity += 15
  else if (workSchedule === 'busy') scores.activity -= 5
  else if (workSchedule === 'shift') scores.activity -= 10
  
  if (dailyFreeTime === 'less_1h') scores.activity -= 10
  else if (dailyFreeTime === '1_2h') scores.activity -= 5
  else if (dailyFreeTime === '2_4h') scores.activity += 5
  else if (dailyFreeTime === 'more_4h') scores.activity += 10
  
  if (activityPreference === 'quiet') scores.activity -= 10
  else if (activityPreference === 'moderate') scores.activity += 0
  else if (activityPreference === 'active') scores.activity += 10
  else if (activityPreference === 'social') scores.activity += 15
  
  if (housingType === 'apartment_small') scores.space -= 10
  else if (housingType === 'apartment_medium') scores.space += 0
  else if (housingType === 'apartment_large') scores.space += 10
  else if (housingType === 'house') scores.space += 15
  
  if (hasBalcony === 'yes_closed') scores.space += 10
  else if (hasBalcony === 'yes_open') scores.space += 5
  else if (hasBalcony === 'no') scores.space -= 5
  
  if (catExperience === 'first_time') scores.experience -= 10
  else if (catExperience === 'some') scores.experience += 0
  else if (catExperience === 'experienced') scores.experience += 10
  else if (catExperience === 'expert') scores.experience += 15
  
  if (preferredAge === 'no_preference') scores.experience += 5
  
  if (specialNeedsWilling === 'yes') scores.experience += 10
  else if (specialNeedsWilling === 'maybe') scores.experience += 5
  else if (specialNeedsWilling === 'prefer_not') scores.experience += 0
  else if (specialNeedsWilling === 'no') scores.experience -= 5
  
  if (workSchedule === 'regular') scores.lifestyle += 10
  else if (workSchedule === 'flexible') scores.lifestyle += 15
  else if (workSchedule === 'busy') scores.lifestyle -= 5
  else if (workSchedule === 'shift') scores.lifestyle -= 10
  
  if (noiseSensitivity === 'very_sensitive') scores.lifestyle -= 10
  else if (noiseSensitivity === 'somewhat_sensitive') scores.lifestyle -= 5
  else if (noiseSensitivity === 'neutral') scores.lifestyle += 0
  else if (noiseSensitivity === 'not_sensitive') scores.lifestyle += 5
  
  if (activityPreference === 'quiet') scores.lifestyle += 5
  else if (activityPreference === 'social') scores.lifestyle -= 5
  
  if (personalityPref.includes('active')) scores.personality += 10
  if (personalityPref.includes('cuddly')) scores.personality += 10
  if (personalityPref.includes('independent')) scores.personality += 10
  if (personalityPref.includes('gentle')) scores.personality += 10
  if (personalityPref.includes('curious')) scores.personality += 10
  if (personalityPref.includes('lazy')) scores.personality += 10
  
  if (familyMembers === 'single') scores.personality += 5
  else if (familyMembers === 'family_kids') scores.personality += 10
  
  if (hasOtherPets !== 'no') scores.personality += 5
  
  if (matchedCats.length > 0) {
    const avgActivity = matchedCats.reduce((sum, cat) => sum + cat.activityLevel, 0) / matchedCats.length
    const avgIndependence = matchedCats.reduce((sum, cat) => sum + cat.independenceLevel, 0) / matchedCats.length
    const avgFriendliness = matchedCats.reduce((sum, cat) => sum + cat.friendlinessLevel, 0) / matchedCats.length
    
    scores.activity = Math.round((scores.activity + avgActivity * 10) / 2)
    scores.personality = Math.round((scores.personality + (avgFriendliness + avgIndependence) * 5) / 2)
  }
  
  for (const key of Object.keys(scores)) {
    scores[key] = Math.max(50, Math.min(98, Math.round(scores[key])))
  }
  
  return scores
}

const generateSuggestions = (answers, dimensionScores, matchedCats) => {
  const suggestions = []
  
  if (dimensionScores.activity >= 80) {
    suggestions.push('您的活动量与匹配猫咪非常契合，互动时会有很高的默契度。')
  } else if (dimensionScores.activity < 65) {
    suggestions.push('建议选择活动量适中的猫咪，避免因精力不匹配产生困扰。')
  }
  
  if (dimensionScores.space >= 80) {
    suggestions.push('您的居住空间非常适合猫咪活动，大部分猫咪都能很好地适应。')
  } else if (dimensionScores.space < 65) {
    suggestions.push('您的居住空间相对有限，建议选择体型较小、活动量适中的猫咪。')
  }
  
  if (dimensionScores.experience >= 80) {
    suggestions.push('您的养猫经验丰富，可以很好地照顾各种性格的猫咪。')
  } else if (dimensionScores.experience < 65) {
    suggestions.push('作为新手铲屎官，建议选择性格温顺、适应能力强的猫咪。')
  }
  
  if (dimensionScores.lifestyle >= 80) {
    suggestions.push('您的生活方式非常适合养猫，能给猫咪提供稳定有爱的环境。')
  } else if (dimensionScores.lifestyle < 65) {
    suggestions.push('您的生活节奏较快，建议选择独立性较强的猫咪品种。')
  }
  
  if (dimensionScores.personality >= 80) {
    suggestions.push('您的性格偏好与匹配猫咪高度契合，相处会非常融洽。')
  } else if (dimensionScores.personality < 65) {
    suggestions.push('建议多花时间了解猫咪的性格特点，建立良好的信任关系。')
  }
  
  const topCat = matchedCats[0]
  if (topCat) {
    if (topCat.healthStatus === 'special_care') {
      suggestions.push(`特别提醒：${topCat.name}需要特殊照顾，请确保有足够的时间和精力。`)
    }
    if (topCat.ageCategory === 'kitten') {
      suggestions.push(`${topCat.name}是一只活泼的幼猫，需要更多的陪伴和玩耍时间。`)
    } else if (topCat.ageCategory === 'senior') {
      suggestions.push(`${topCat.name}是一只安静的老年猫，适合喜欢安稳生活的您。`)
    }
  }
  
  if (suggestions.length < 4) {
    suggestions.push('领养前建议先与猫咪视频互动，确认是否是您心仪的伙伴。')
  }
  if (suggestions.length < 4) {
    suggestions.push('请确保家人都同意养猫，并准备好必要的生活用品。')
  }
  
  return suggestions.slice(0, 4)
}

const matchCats = (answers) => {
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
  
  const personalityMatch = calculateDimensionScores(answers, scoredCats)
  const suggestions = generateSuggestions(answers, personalityMatch, scoredCats)
  const overallScore = Math.round(Object.values(personalityMatch).reduce((a, b) => a + b, 0) / Object.values(personalityMatch).length)
  
  return {
    matchedCats: scoredCats,
    personalityMatch,
    overallScore,
    suggestions
  }
}

const getFilters = () => ({
  breeds: ['all', ...new Set(mockCats.map(c => c.breed))],
  colors: ['all', ...new Set(mockCats.map(c => c.color))],
  ageCategories: [
    { value: 'all', label: '全部年龄' },
    { value: 'kitten', label: '幼猫（0-1岁）' },
    { value: 'adult', label: '成年猫（1-7岁）' },
    { value: 'senior', label: '老年猫（7岁+）' }
  ]
})

const getCats = (params) => {
  const page = params.page || 1
  const pageSize = params.pageSize || 12
  const breed = params.breed
  const color = params.color
  const ageCategory = params.ageCategory
  const search = params.search
  
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
    list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  }
}

const getCatDetail = (id) => {
  return mockCats.find(c => c.id === parseInt(id)) || null
}

const getQuestions = () => mockQuestions

const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  return mockCats.filter(cat => favorites.includes(cat.id))
}

const submitAppointment = (data) => {
  return {
    appointmentId: Date.now(),
    ...data
  }
}

export const mockApi = {
  getCats,
  getCatDetail,
  getFilters,
  getQuestions,
  matchCats,
  getFavorites,
  submitAppointment
}

export default {
  install() {
    console.log('🐱 Mock API 已加载')
  }
}
