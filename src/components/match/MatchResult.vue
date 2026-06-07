<template>
  <div class="match-result">
    <div v-if="!result" class="no-result">
      <div class="icon">🎯</div>
      <h2>还没有匹配结果</h2>
      <p>先填写领养问卷，让我们为您找到最适合的猫咪伙伴</p>
      <router-link to="/questionnaire" class="start-btn">
        开始问卷匹配
      </router-link>
    </div>
    
    <div v-else class="result-container">
      <div class="result-header">
        <div class="overall-score">
          <div class="score-circle" :style="{ '--score-color': overallScoreColor }">
            <svg class="progress-ring" viewBox="0 0 100 100">
              <circle class="bg" cx="50" cy="50" r="45"></circle>
              <circle 
                class="progress" 
                cx="50" 
                cy="50" 
                r="45"
                :style="progressStyle"
              ></circle>
            </svg>
            <div class="score-content">
              <span class="score-number">{{ result.overallScore }}</span>
              <span class="score-label">综合匹配度</span>
            </div>
          </div>
        </div>
        
        <div class="result-info">
          <h2>🎉 匹配完成！</h2>
          <p>根据您的生活习惯和偏好，我们为您找到了以下最适合的猫咪伙伴</p>
          <div class="match-tags">
            <span class="match-tag">
              🐱 共找到 {{ result.matchedCats.length }} 只匹配猫咪
            </span>
          </div>
        </div>
      </div>
      
      <div class="dimensions-section">
        <h3 class="section-title">多维度匹配分析</h3>
        <div class="dimensions-grid">
          <div 
            v-for="(score, dimension) in dimensionScores" 
            :key="dimension"
            class="dimension-card"
          >
            <div class="dimension-header">
              <span class="dimension-icon">{{ dimensionIcons[dimension] }}</span>
              <span class="dimension-name">{{ dimensionLabels[dimension] }}</span>
              <span class="dimension-score" :style="{ color: getScoreColor(score) }">
                {{ score }}%
              </span>
            </div>
            <div class="dimension-bar">
              <div 
                class="bar-fill" 
                :style="{ 
                  width: `${score}%`,
                  background: getScoreGradient(score)
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-section">
        <h3 class="section-title">匹配雷达图</h3>
        <div class="chart-container">
          <Radar :data="radarData" :options="radarOptions" />
        </div>
      </div>
      
      <div class="suggestions-section">
        <h3 class="section-title">💡 匹配建议</h3>
        <div class="suggestions-list">
          <div 
            v-for="(suggestion, index) in result.suggestions" 
            :key="index"
            class="suggestion-item"
          >
            <span class="suggestion-icon">✨</span>
            <p>{{ suggestion }}</p>
          </div>
        </div>
      </div>
      
      <div class="matched-cats-section">
        <h3 class="section-title">🐱 为您推荐的猫咪</h3>
        <div class="matched-cats-grid">
          <div 
            v-for="(cat, index) in result.matchedCats" 
            :key="cat.id"
            class="matched-cat-item"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="match-rank" :style="{ background: getRankColor(index) }">
              TOP {{ index + 1 }}
            </div>
            <CatCard 
              :cat="cat" 
              :show-match-score="true"
              @click="goToDetail(cat.id)"
            />
          </div>
        </div>
      </div>
      
      <div class="result-actions">
        <button class="action-btn secondary" @click="retakeQuestionnaire">
          🔄 重新填写问卷
        </button>
        <router-link to="/cats" class="action-btn primary">
          浏览更多猫咪 →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useQuestionnaireStore } from '@/stores/questionnaireStore'
import { useRouter } from 'vue-router'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { getMatchColor } from '@/utils'
import CatCard from '@/components/cats/CatCard.vue'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const store = useQuestionnaireStore()
const router = useRouter()

const result = computed(() => store.matchResult)

const dimensionScores = computed(() => {
  if (!result.value?.personalityMatch) return {}
  return result.value.personalityMatch
})

const overallScoreColor = computed(() => {
  return getMatchColor(result.value?.overallScore || 0)
})

const progressStyle = computed(() => {
  const score = result.value?.overallScore || 0
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference
  return {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
    stroke: overallScoreColor.value
  }
})

const dimensionLabels = {
  activity: '活动量匹配',
  space: '空间适配度',
  experience: '经验匹配',
  lifestyle: '生活方式',
  personality: '性格契合度'
}

const dimensionIcons = {
  activity: '🏃',
  space: '🏠',
  experience: '📚',
  lifestyle: '⏰',
  personality: '💖'
}

const getScoreColor = (score) => getMatchColor(score)

const getScoreGradient = (score) => {
  const color = getMatchColor(score)
  return `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`
}

const getRankColor = (index) => {
  const colors = ['#E8A87C', '#FFB6C1', '#98D8C8', '#B8D4E8', '#D4C5E8', '#E5D4B8']
  return colors[index] || colors[0]
}

const radarData = computed(() => {
  if (!result.value?.personalityMatch) {
    return { labels: [], datasets: [] }
  }
  
  const labels = Object.keys(dimensionScores.value).map(k => dimensionLabels[k])
  const data = Object.values(dimensionScores.value)
  
  return {
    labels,
    datasets: [
      {
        label: '匹配度',
        data,
        backgroundColor: 'rgba(232, 168, 124, 0.2)',
        borderColor: '#E8A87C',
        borderWidth: 2,
        pointBackgroundColor: '#E8A87C',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5
      }
    ]
  }
})

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        display: true,
        color: '#9A9A9A',
        backdropColor: 'transparent'
      },
      grid: {
        color: 'rgba(232, 168, 124, 0.2)'
      },
      angleLines: {
        color: 'rgba(232, 168, 124, 0.2)'
      },
      pointLabels: {
        color: '#4A4A4A',
        font: {
          size: 13,
          weight: '500'
        }
      }
    }
  }
}

const goToDetail = (id) => {
  router.push(`/cat/${id}`)
}

const retakeQuestionnaire = () => {
  store.resetQuestionnaire()
  router.push('/questionnaire')
}

onMounted(() => {
  if (!result.value) {
    store.clearMatchResult()
  }
})
</script>

<style lang="scss" scoped>
.match-result {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.no-result {
  text-align: center;
  padding: 80px 20px;
  
  .icon {
    font-size: 5rem;
    margin-bottom: 24px;
  }
  
  h2 {
    color: $color-text-primary;
    margin-bottom: 12px;
  }
  
  p {
    color: $color-text-secondary;
    margin-bottom: 32px;
  }
  
  .start-btn {
    @include button-primary;
    text-decoration: none;
    display: inline-block;
  }
}

.result-container {
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  display: flex;
  align-items: center;
  gap: 48px;
  background: white;
  padding: 40px;
  border-radius: $border-radius-lg;
  margin-bottom: 32px;
  @include card-shadow;
  
  @include respond-to(tablet) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
    padding: 24px;
  }
}

.overall-score {
  flex-shrink: 0;
}

.score-circle {
  position: relative;
  width: 160px;
  height: 160px;
  
  .progress-ring {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    
    .bg {
      fill: none;
      stroke: rgba(232, 168, 124, 0.15);
      stroke-width: 8;
    }
    
    .progress {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dashoffset 1s ease;
    }
  }
  
  .score-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .score-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--score-color);
    line-height: 1;
  }
  
  .score-label {
    font-size: 0.9rem;
    color: $color-text-secondary;
    margin-top: 4px;
  }
}

.result-info {
  flex: 1;
  
  h2 {
    color: $color-primary-dark;
    margin-bottom: 12px;
    font-size: 1.75rem;
    
    @include respond-to(tablet) {
      font-size: 1.4rem;
    }
  }
  
  p {
    color: $color-text-secondary;
    margin-bottom: 16px;
    line-height: 1.6;
  }
}

.match-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  
  @include respond-to(tablet) {
    justify-content: center;
  }
}

.match-tag {
  padding: 8px 16px;
  background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
  border-radius: 20px;
  font-size: 0.9rem;
  color: $color-primary-dark;
  font-weight: 500;
}

.section-title {
  font-size: 1.4rem;
  color: $color-text-primary;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(180deg, $color-primary 0%, $color-secondary 100%);
    border-radius: 2px;
  }
}

.dimensions-section {
  background: white;
  padding: 32px;
  border-radius: $border-radius-lg;
  margin-bottom: 32px;
  @include card-shadow;
  
  @include respond-to(tablet) {
    padding: 20px;
  }
}

.dimensions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.dimension-card {
  padding: 20px;
  background: $color-bg-primary;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(232, 168, 124, 0.15);
  }
}

.dimension-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.dimension-icon {
  font-size: 1.5rem;
}

.dimension-name {
  flex: 1;
  font-weight: 500;
  color: $color-text-primary;
}

.dimension-score {
  font-weight: 700;
  font-size: 1.2rem;
}

.dimension-bar {
  height: 8px;
  background: rgba(232, 168, 124, 0.15);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
}

.chart-section {
  background: white;
  padding: 32px;
  border-radius: $border-radius-lg;
  margin-bottom: 32px;
  @include card-shadow;
  
  @include respond-to(tablet) {
    padding: 20px;
  }
}

.chart-container {
  height: 400px;
  
  @include respond-to(tablet) {
    height: 300px;
  }
}

.suggestions-section {
  background: white;
  padding: 32px;
  border-radius: $border-radius-lg;
  margin-bottom: 32px;
  @include card-shadow;
  
  @include respond-to(tablet) {
    padding: 20px;
  }
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(232, 168, 124, 0.08) 0%, rgba(255, 182, 193, 0.08) 100%);
  border-radius: 12px;
  
  p {
    margin: 0;
    color: $color-text-secondary;
    line-height: 1.6;
  }
}

.suggestion-icon {
  flex-shrink: 0;
  font-size: 1.2rem;
}

.matched-cats-section {
  margin-bottom: 32px;
}

.matched-cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  
  @include respond-to(tablet) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
  
  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.matched-cat-item {
  position: relative;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.match-rank {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 16px;
  border-radius: 20px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 16px;
  
  @include respond-to(mobile) {
    flex-direction: column;
    
    .action-btn {
      width: 100%;
      justify-content: center;
    }
  }
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
  
  &.primary {
    @include button-primary;
  }
  
  &.secondary {
    background: white;
    color: $color-text-secondary;
    border: 2px solid rgba(0,0,0,0.1);
    
    &:hover {
      border-color: $color-primary;
      color: $color-primary;
    }
  }
}
</style>
