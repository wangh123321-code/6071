import { defineStore } from 'pinia'
import { questionnaireApi } from '@/api'
import { ref, computed } from 'vue'

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const questions = ref([])
  const answers = ref({})
  const currentSection = ref(0)
  const matchResult = ref(null)
  const loading = ref(false)
  const matchLoading = ref(false)
  const completed = ref(false)

  const currentSectionData = computed(() => questions.value[currentSection.value])
  
  const progress = computed(() => {
    if (questions.value.length === 0) return 0
    return Math.round(((currentSection.value + 1) / questions.value.length) * 100)
  })

  const isCurrentSectionComplete = computed(() => {
    const section = currentSectionData.value
    if (!section) return false
    return section.questions.every(q => {
      const answer = answers.value[q.id]
      if (q.required) {
        if (q.type === 'multiple') {
          return Array.isArray(answer) && answer.length > 0
        }
        return answer !== undefined && answer !== null && answer !== ''
      }
      return true
    })
  })

  const canGoNext = computed(() => {
    return currentSection.value < questions.value.length - 1 && isCurrentSectionComplete.value
  })

  const canGoPrev = computed(() => {
    return currentSection.value > 0
  })

  const canSubmit = computed(() => {
    return currentSection.value === questions.value.length - 1 && isCurrentSectionComplete.value
  })

  async function fetchQuestions() {
    loading.value = true
    try {
      const data = await questionnaireApi.getQuestions()
      questions.value = data
    } catch (error) {
      console.error('获取问卷失败:', error)
    } finally {
      loading.value = false
    }
  }

  function setAnswer(questionId, value) {
    answers.value[questionId] = value
  }

  function nextSection() {
    if (canGoNext.value) {
      currentSection.value++
    }
  }

  function prevSection() {
    if (canGoPrev.value) {
      currentSection.value--
    }
  }

  function goToSection(index) {
    if (index >= 0 && index < questions.value.length) {
      currentSection.value = index
    }
  }

  async function submitQuestionnaire() {
    if (!canSubmit.value) return null
    matchLoading.value = true
    try {
      const data = await questionnaireApi.submitMatch(answers.value)
      matchResult.value = data
      completed.value = true
      return data
    } catch (error) {
      console.error('提交问卷失败:', error)
      return null
    } finally {
      matchLoading.value = false
    }
  }

  function resetQuestionnaire() {
    answers.value = {}
    currentSection.value = 0
    matchResult.value = null
    completed.value = false
  }

  function clearMatchResult() {
    matchResult.value = null
  }

  return {
    questions,
    answers,
    currentSection,
    matchResult,
    loading,
    matchLoading,
    completed,
    currentSectionData,
    progress,
    isCurrentSectionComplete,
    canGoNext,
    canGoPrev,
    canSubmit,
    fetchQuestions,
    setAnswer,
    nextSection,
    prevSection,
    goToSection,
    submitQuestionnaire,
    resetQuestionnaire,
    clearMatchResult
  }
})
