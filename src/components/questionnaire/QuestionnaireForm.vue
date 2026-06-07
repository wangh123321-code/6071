<template>
  <div class="questionnaire-container">
    <div class="questionnaire-header">
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="progress-text">
          <span>完成进度</span>
          <span class="progress-value">{{ progress }}%</span>
        </div>
      </div>
      
      <div class="section-nav">
        <div 
          v-for="(section, index) in questions" 
          :key="section.id"
          class="section-indicator"
          :class="{ 
            active: currentSection === index,
            completed: isSectionCompleted(index)
          }"
          @click="goToSection(index)"
        >
          <span class="section-number">{{ index + 1 }}</span>
          <span class="section-title">{{ section.title }}</span>
          <span class="section-check" v-if="isSectionCompleted(index)">✓</span>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载问卷中...</p>
    </div>
    
    <transition name="slide-fade" mode="out-in" v-else>
      <div v-if="currentSectionData" :key="currentSection" class="questionnaire-content">
        <div class="section-header">
          <h2>{{ currentSectionData.title }}</h2>
          <p v-if="sectionDescriptions[currentSectionData.section]" class="section-desc">
            {{ sectionDescriptions[currentSectionData.section] }}
          </p>
        </div>
        
        <div class="questions-list">
          <div 
            v-for="question in currentSectionData.questions" 
            :key="question.id"
            class="question-item"
            :class="{ 
              answered: isQuestionAnswered(question.id),
              hasError: showErrors && !isQuestionValid(question)
            }"
          >
            <div class="question-header">
              <span class="question-number">Q{{ getQuestionIndex(question.id) }}</span>
              <h3 class="question-text">{{ question.question }}</h3>
              <span v-if="question.maxSelect" class="select-hint">
                (最多选择 {{ question.maxSelect }} 项)
              </span>
            </div>
            
            <div v-if="question.type === 'single'" class="options-grid single-select">
              <button
                v-for="option in question.options"
                :key="option.value"
                class="option-btn"
                :class="{ selected: answers[question.id] === option.value }"
                @click="selectOption(question.id, option.value)"
              >
                <span class="option-icon">
                  {{ answers[question.id] === option.value ? '●' : '○' }}
                </span>
                <span class="option-label">{{ option.label }}</span>
              </button>
            </div>
            
            <div v-else-if="question.type === 'multiple'" class="options-grid multiple-select">
              <button
                v-for="option in question.options"
                :key="option.value"
                class="option-btn"
                :class="{ 
                  selected: isMultipleSelected(question.id, option.value),
                  disabled: isMultipleDisabled(question, option.value)
                }"
                :disabled="isMultipleDisabled(question, option.value)"
                @click="toggleMultiple(question.id, option.value, question.maxSelect)"
              >
                <span class="option-icon">
                  {{ isMultipleSelected(question.id, option.value) ? '✓' : '' }}
                </span>
                <span class="option-label">{{ option.label }}</span>
              </button>
            </div>
            
            <div v-if="showErrors && !isQuestionValid(question)" class="error-message">
              ⚠️ 请选择一个答案
            </div>
          </div>
        </div>
        
        <div class="questionnaire-actions">
          <button 
            class="nav-btn prev-btn"
            :disabled="!canGoPrev"
            @click="prevSection"
          >
            <span>←</span> 上一步
          </button>
          
          <button 
            v-if="currentSection < questions.length - 1"
            class="nav-btn next-btn"
            :disabled="!isCurrentSectionComplete"
            @click="nextSection"
          >
            下一步 <span>→</span>
          </button>
          
          <button 
            v-else
            class="nav-btn submit-btn"
            :disabled="!canSubmit || matchLoading"
            @click="handleSubmit"
          >
            <span v-if="matchLoading" class="loading-spinner"></span>
            {{ matchLoading ? '匹配中...' : '查看匹配结果 🎯' }}
          </button>
        </div>
      </div>
    </transition>
    
    <div v-if="showErrors" class="error-notice">
      请完成所有必填问题后再继续
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuestionnaireStore } from '@/stores/questionnaireStore'
import { useRouter } from 'vue-router'

const store = useQuestionnaireStore()
const router = useRouter()

const showErrors = ref(false)

const questions = computed(() => store.questions)
const answers = computed(() => store.answers)
const currentSection = computed(() => store.currentSection)
const currentSectionData = computed(() => store.currentSectionData)
const progress = computed(() => store.progress)
const loading = computed(() => store.loading)
const matchLoading = computed(() => store.matchLoading)
const canGoPrev = computed(() => store.canGoPrev)
const isCurrentSectionComplete = computed(() => store.isCurrentSectionComplete)
const canSubmit = computed(() => store.canSubmit)

const sectionDescriptions = {
  living: '让我们了解您的居住环境，为猫咪找到最适合的家。',
  lifestyle: '您的生活节奏决定了猫咪是否能适应新环境。',
  experience: '您的养猫经验会帮助我们推荐合适的猫咪。',
  preference: '告诉我们您的偏好，让匹配更精准。'
}

const isSectionCompleted = (index) => {
  const section = questions.value[index]
  if (!section) return false
  return section.questions.every(q => isQuestionAnswered(q.id))
}

const isQuestionAnswered = (questionId) => {
  const answer = answers.value[questionId]
  if (Array.isArray(answer)) {
    return answer.length > 0
  }
  return answer !== undefined && answer !== null && answer !== ''
}

const isQuestionValid = (question) => {
  if (!question.required) return true
  return isQuestionAnswered(question.id)
}

const getQuestionIndex = (questionId) => {
  let count = 0
  for (let i = 0; i <= currentSection.value; i++) {
    const section = questions.value[i]
    if (!section) continue
    for (const q of section.questions) {
      count++
      if (q.id === questionId) return count
    }
  }
  return count
}

const isMultipleSelected = (questionId, value) => {
  const answer = answers.value[questionId]
  return Array.isArray(answer) && answer.includes(value)
}

const isMultipleDisabled = (question, value) => {
  const answer = answers.value[question.id]
  if (!question.maxSelect) return false
  if (Array.isArray(answer) && answer.length >= question.maxSelect) {
    return !answer.includes(value)
  }
  return false
}

const selectOption = (questionId, value) => {
  store.setAnswer(questionId, value)
  if (showErrors.value) {
    showErrors.value = false
  }
}

const toggleMultiple = (questionId, value, maxSelect) => {
  const currentAnswer = answers.value[questionId] || []
  let newAnswer
  
  if (currentAnswer.includes(value)) {
    newAnswer = currentAnswer.filter(v => v !== value)
  } else {
    if (maxSelect && currentAnswer.length >= maxSelect) {
      return
    }
    newAnswer = [...currentAnswer, value]
  }
  
  store.setAnswer(questionId, newAnswer)
  if (showErrors.value) {
    showErrors.value = false
  }
}

const nextSection = () => {
  if (!isCurrentSectionComplete.value) {
    showErrors.value = true
    return
  }
  store.nextSection()
  showErrors.value = false
}

const prevSection = () => {
  store.prevSection()
  showErrors.value = false
}

const goToSection = (index) => {
  store.goToSection(index)
  showErrors.value = false
}

const handleSubmit = async () => {
  if (!canSubmit.value) {
    showErrors.value = true
    return
  }
  
  const result = await store.submitQuestionnaire()
  if (result) {
    router.push('/match-result')
  }
}
</script>

<style lang="scss" scoped>
.questionnaire-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.questionnaire-header {
  margin-bottom: 32px;
  
  @include respond-to(tablet) {
    margin-bottom: 20px;
  }
}

.progress-section {
  margin-bottom: 24px;
}

.progress-bar {
  height: 8px;
  background: rgba(232, 168, 124, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, $color-primary 0%, $color-secondary 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.9rem;
  color: $color-text-secondary;
  
  .progress-value {
    font-weight: 600;
    color: $color-primary-dark;
  }
}

.section-nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  
  @include respond-to(mobile) {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 8px;
  }
}

.section-indicator {
  flex: 1;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $color-primary-light;
  }
  
  &.active {
    background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
    border-color: $color-primary;
  }
  
  &.completed {
    border-color: $color-success;
    
    .section-number {
      background: $color-success;
    }
  }
  
  .section-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: $color-text-light;
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .section-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: $color-text-primary;
    white-space: nowrap;
  }
  
  .section-check {
    margin-left: auto;
    color: $color-success;
    font-weight: bold;
  }
  
  @include respond-to(mobile) {
    min-width: 120px;
    flex: 0 0 auto;
  }
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: $color-text-light;
  
  .spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 16px;
    border: 3px solid $color-primary-light;
    border-top-color: $color-primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.section-header {
  margin-bottom: 32px;
  
  h2 {
    color: $color-primary-dark;
    margin-bottom: 8px;
    font-size: 1.75rem;
    
    @include respond-to(tablet) {
      font-size: 1.4rem;
    }
  }
  
  .section-desc {
    color: $color-text-secondary;
    font-size: 1rem;
  }
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 40px;
}

.question-item {
  background: white;
  padding: 24px;
  border-radius: $border-radius-lg;
  @include card-shadow;
  transition: all 0.3s ease;
  
  &.answered {
    border-left: 4px solid $color-success;
  }
  
  &.hasError {
    border: 2px solid $color-error;
  }
  
  @include respond-to(tablet) {
    padding: 16px;
  }
}

.question-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.question-number {
  background: linear-gradient(135deg, $color-primary 0%, $color-primary-dark 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.question-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: $color-text-primary;
  margin: 0;
  flex: 1;
  min-width: 200px;
}

.select-hint {
  font-size: 0.85rem;
  color: $color-text-light;
  align-self: center;
}

.options-grid {
  display: grid;
  gap: 12px;
  
  &.single-select {
    grid-template-columns: repeat(2, 1fr);
    
    @include respond-to(tablet) {
      grid-template-columns: 1fr;
    }
  }
  
  &.multiple-select {
    grid-template-columns: repeat(2, 1fr);
    
    @include respond-to(tablet) {
      grid-template-columns: 1fr;
    }
  }
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: $color-bg-primary;
  border: 2px solid transparent;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: $color-primary-light;
    border-color: $color-primary;
  }
  
  &.selected {
    background: linear-gradient(135deg, rgba(232, 168, 124, 0.15) 0%, rgba(255, 182, 193, 0.15) 100%);
    border-color: $color-primary;
    
    .option-icon {
      background: $color-primary;
      color: white;
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .option-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid $color-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
    color: transparent;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }
  
  .option-label {
    font-size: 0.95rem;
    color: $color-text-primary;
    line-height: 1.5;
  }
}

.error-message {
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(229, 115, 115, 0.1);
  border-radius: 8px;
  color: $color-error;
  font-size: 0.9rem;
}

.questionnaire-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(0,0,0,0.05);
  
  @include respond-to(mobile) {
    flex-direction: column-reverse;
    gap: 12px;
    
    .nav-btn {
      width: 100%;
      justify-content: center;
    }
  }
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &.prev-btn {
    background: white;
    color: $color-text-secondary;
    border: 2px solid rgba(0,0,0,0.1);
    
    &:hover:not(:disabled) {
      border-color: $color-primary;
      color: $color-primary;
    }
    
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
  
  &.next-btn,
  &.submit-btn {
    @include button-primary;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
  
  .loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.error-notice {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 24px;
  background: $color-error;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  animation: slideUp 0.3s ease;
  z-index: 100;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
