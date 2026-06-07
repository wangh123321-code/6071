<template>
  <div class="cat-detail" v-if="cat">
    <div class="detail-hero">
      <div class="image-gallery">
        <div class="main-image">
          <LazyImage :src="currentImage" :alt="cat.name" />
        </div>
        <div class="thumbnails">
          <button
            v-for="(img, index) in cat.images"
            :key="index"
            class="thumbnail"
            :class="{ active: currentImageIndex === index }"
            @click="currentImageIndex = index"
          >
            <LazyImage :src="img" :alt="`${cat.name} - ${index + 1}`" />
          </button>
        </div>
      </div>
      
      <div class="hero-info">
        <div class="info-header">
          <h1 class="cat-name">{{ cat.name }}</h1>
          <span class="cat-gender" :class="cat.gender">
            {{ cat.gender === '公' ? '♂ 公猫' : '♀ 母猫' }}
          </span>
        </div>
        
        <div class="status-row">
          <span class="status-badge" :class="cat.adoptionStatus">
            {{ statusText }}
          </span>
          <span class="health-badge" :class="cat.healthStatus">
            {{ cat.healthStatusText }}
          </span>
        </div>
        
        <div class="basic-info">
          <div class="info-item">
            <span class="info-icon">🐱</span>
            <span class="info-label">品种</span>
            <span class="info-value">{{ cat.breed }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🎨</span>
            <span class="info-label">毛色</span>
            <span class="info-value">{{ cat.color }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📅</span>
            <span class="info-label">年龄</span>
            <span class="info-value">{{ cat.ageText }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">⚖️</span>
            <span class="info-label">体重</span>
            <span class="info-value">{{ cat.weight }}kg</span>
          </div>
          <div class="info-item">
            <span class="info-icon">✂️</span>
            <span class="info-label">绝育</span>
            <span class="info-value">{{ cat.sterilized ? '已绝育' : '未绝育' }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">💉</span>
            <span class="info-label">疫苗</span>
            <span class="info-value">{{ cat.vaccineCompleted ? '已完成' : '进行中' }}</span>
          </div>
        </div>
        
        <div v-if="cat.specialNeeds" class="special-needs">
          <span class="needs-icon">⚠️</span>
          <span class="needs-text">特殊需求：{{ cat.specialNeeds }}</span>
        </div>
        
        <div class="action-buttons">
          <button 
            class="action-btn favorite"
            :class="{ active: isFavorited }"
            @click="toggleFavorite"
          >
            <span>{{ isFavorited ? '❤️ 已收藏' : '🤍 收藏' }}</span>
          </button>
          <button 
            class="action-btn appointment"
            @click="showAppointmentModal = true"
            :disabled="hasAppointment"
          >
            <span>{{ hasAppointment ? '⏰ 已预约' : '📹 视频预约' }}</span>
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat">
            <span class="stat-value">{{ cat.views }}</span>
            <span class="stat-label">浏览量</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ cat.favorites }}</span>
            <span class="stat-label">收藏数</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ daysInShelter }}</span>
            <span class="stat-label">待领养天数</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="detail-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>
    
    <div class="tab-content">
      <div v-if="activeTab === 'personality'" class="personality-section">
        <h3 class="section-title">性格测评</h3>
        <div class="personality-traits">
          <div 
            v-for="trait in cat.personality" 
            :key="trait.name"
            class="trait-item"
          >
            <div class="trait-header">
              <span class="trait-name">{{ trait.name }}</span>
              <span class="trait-score">{{ trait.score }}分</span>
            </div>
            <div class="trait-bar">
              <div 
                class="bar-fill" 
                :style="{ 
                  width: `${trait.score}%`,
                  background: getTraitGradient(trait.score)
                }"
              ></div>
            </div>
            <p class="trait-desc">{{ trait.description }}</p>
          </div>
        </div>
        
        <div class="personality-chart">
          <h4>性格雷达图</h4>
          <div class="chart-wrapper">
            <Radar :data="personalityRadarData" :options="radarOptions" />
          </div>
        </div>
        
        <div class="trait-cards">
          <div class="trait-card">
            <span class="card-icon">🏃</span>
            <h5>活跃度</h5>
            <div class="level-indicator">
              <span 
                v-for="i in 5" 
                :key="i" 
                class="level-dot"
                :class="{ active: i <= cat.activityLevel }"
              ></span>
            </div>
            <p>{{ getLevelText(cat.activityLevel) }}</p>
          </div>
          <div class="trait-card">
            <span class="card-icon">🤝</span>
            <h5>亲人程度</h5>
            <div class="level-indicator">
              <span 
                v-for="i in 5" 
                :key="i" 
                class="level-dot"
                :class="{ active: i <= cat.friendlinessLevel }"
              ></span>
            </div>
            <p>{{ getLevelText(cat.friendlinessLevel) }}</p>
          </div>
          <div class="trait-card">
            <span class="card-icon">🐱</span>
            <h5>独立性</h5>
            <div class="level-indicator">
              <span 
                v-for="i in 5" 
                :key="i" 
                class="level-dot"
                :class="{ active: i <= cat.independenceLevel }"
              ></span>
            </div>
            <p>{{ getLevelText(cat.independenceLevel) }}</p>
          </div>
          <div class="trait-card">
            <span class="card-icon">🎾</span>
            <h5>爱玩程度</h5>
            <div class="level-indicator">
              <span 
                v-for="i in 5" 
                :key="i" 
                class="level-dot"
                :class="{ active: i <= cat.playfulnessLevel }"
              ></span>
            </div>
            <p>{{ getLevelText(cat.playfulnessLevel) }}</p>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'vaccine'" class="vaccine-section">
        <h3 class="section-title">疫苗记录</h3>
        <div class="vaccine-timeline">
          <div 
            v-for="(record, index) in cat.vaccineRecords" 
            :key="record.id"
            class="timeline-item"
          >
            <div class="timeline-dot" :class="{ latest: index === 0 }"></div>
            <div class="timeline-line" v-if="index < cat.vaccineRecords.length - 1"></div>
            <div class="timeline-content">
              <div class="vaccine-header">
                <h4 class="vaccine-name">{{ record.vaccineName }}</h4>
                <span class="vaccine-status">已完成 ✓</span>
              </div>
              <div class="vaccine-details">
                <div class="detail">
                  <span class="detail-label">接种日期</span>
                  <span class="detail-value">{{ record.date }}</span>
                </div>
                <div class="detail">
                  <span class="detail-label">下次接种</span>
                  <span class="detail-value">{{ record.nextDate }}</span>
                </div>
                <div class="detail">
                  <span class="detail-label">接种医院</span>
                  <span class="detail-value">{{ record.hospital }}</span>
                </div>
                <div class="detail">
                  <span class="detail-label">主治医生</span>
                  <span class="detail-value">{{ record.doctor }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="vaccine-summary">
          <div class="summary-item">
            <span class="summary-icon">✅</span>
            <span class="summary-text">已完成 {{ cat.vaccineRecords.length }} 次疫苗接种</span>
          </div>
          <div class="summary-item" v-if="cat.vaccineCompleted">
            <span class="summary-icon">🎉</span>
            <span class="summary-text">基础疫苗已全部完成</span>
          </div>
          <div class="summary-item" v-else>
            <span class="summary-icon">📋</span>
            <span class="summary-text">疫苗接种进行中，请按时完成</span>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'story'" class="story-section">
        <h3 class="section-title">救助故事</h3>
        <div class="story-card">
          <div class="story-header">
            <span class="story-date">救助日期：{{ cat.rescueDate }}</span>
          </div>
          <div class="story-content">
            <p>{{ cat.rescueStory }}</p>
          </div>
          <div class="story-footer">
            <div class="shelter-info">
              <span class="shelter-icon">🏠</span>
              <span>喵星之家流浪猫救助站</span>
            </div>
            <div class="volunteer-sign">
              —— 志愿者 {{ randomVolunteer }} 记录
            </div>
          </div>
        </div>
        
        <div class="adoption-tips">
          <h4>💝 领养小贴士</h4>
          <ul>
            <li>领养前请确保家人都同意养猫</li>
            <li>准备好必要的猫咪用品（猫砂盆、猫粮、猫窝等）</li>
            <li>给猫咪一些时间适应新环境，不要急于互动</li>
            <li>定期带猫咪做体检和疫苗接种</li>
            <li>如果遇到问题，可以随时联系救助站获取帮助</li>
            <li>领养是一份承诺，请确保能够照顾猫咪一生</li>
          </ul>
        </div>
      </div>
    </div>
    
    <VideoAppointmentModal
      v-if="showAppointmentModal"
      :cat="cat"
      @close="showAppointmentModal = false"
      @success="handleAppointmentSuccess"
    />
    
    <Toast
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />
  </div>
  
  <div v-else-if="loading" class="loading-state">
    <div class="spinner"></div>
    <p>加载中...</p>
  </div>
  
  <div v-else class="not-found">
    <div class="icon">😿</div>
    <h2>找不到这只猫咪</h2>
    <p>它可能已经被领养了，或者链接有误</p>
    <router-link to="/cats" class="back-btn">
      返回猫咪列表
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatStore } from '@/stores/catStore'
import { useAppointmentStore } from '@/stores/appointmentStore'
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
import LazyImage from '@/components/common/LazyImage.vue'
import VideoAppointmentModal from '@/components/detail/VideoAppointmentModal.vue'
import Toast from '@/components/common/Toast.vue'
import { getMatchColor } from '@/utils'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const route = useRoute()
const router = useRouter()
const catStore = useCatStore()
const appointmentStore = useAppointmentStore()

const catId = computed(() => parseInt(route.params.id))
const cat = computed(() => catStore.catDetail)
const loading = computed(() => catStore.detailLoading)
const isFavorited = computed(() => catStore.isFavorite(catId.value))
const hasAppointment = computed(() => appointmentStore.hasAppointmentForCat(catId.value))

const currentImageIndex = ref(0)
const activeTab = ref('personality')
const showAppointmentModal = ref(false)
const randomVolunteer = ref(['张小明', '李小红', '王大伟', '刘芳芳', '陈建国'][Math.floor(Math.random() * 5)])

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const currentImage = computed(() => {
  if (!cat.value?.images) return ''
  return cat.value.images[currentImageIndex.value] || cat.value.avatar
})

const statusText = computed(() => {
  const statusMap = {
    available: '可领养',
    pending: '审核中',
    adopted: '已领养'
  }
  return statusMap[cat.value?.adoptionStatus] || '可领养'
})

const daysInShelter = computed(() => {
  if (!cat.value?.rescueDate) return 0
  const rescueDate = new Date(cat.value.rescueDate)
  const today = new Date()
  return Math.floor((today - rescueDate) / (1000 * 60 * 60 * 24))
})

const tabs = [
  { id: 'personality', label: '性格测评', icon: '💖' },
  { id: 'vaccine', label: '疫苗记录', icon: '💉' },
  { id: 'story', label: '救助故事', icon: '📖' }
]

const personalityRadarData = computed(() => {
  if (!cat.value) return { labels: [], datasets: [] }
  
  const labels = ['活跃度', '亲人度', '独立性', '爱玩度', '安静度', '掉毛程度']
  const data = [
    cat.value.activityLevel * 20,
    cat.value.friendlinessLevel * 20,
    cat.value.independenceLevel * 20,
    cat.value.playfulnessLevel * 20,
    (6 - cat.value.noiseLevel) * 20,
    cat.value.sheddingLevel * 20
  ]
  
  return {
    labels,
    datasets: [
      {
        label: cat.value.name,
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
        display: false
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
          size: 12
        }
      }
    }
  }
}

const getTraitGradient = (score) => {
  const color = getMatchColor(score)
  return `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`
}

const getLevelText = (level) => {
  const texts = ['很低', '较低', '中等', '较高', '很高']
  return texts[level - 1] || '中等'
}

const toggleFavorite = () => {
  catStore.toggleFavorite(catId.value)
  toast.value = {
    show: true,
    message: isFavorited.value ? '已添加到收藏' : '已取消收藏',
    type: 'success'
  }
}

const handleAppointmentSuccess = () => {
  showAppointmentModal.value = false
  toast.value = {
    show: true,
    message: '预约申请已提交，工作人员会在24小时内与您联系',
    type: 'success'
  }
}

onMounted(async () => {
  await catStore.fetchCatDetail(catId.value)
})

onUnmounted(() => {
  catStore.clearCatDetail()
})
</script>

<style lang="scss" scoped>
.cat-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  padding: 32px;
  border-radius: $border-radius-lg;
  margin-bottom: 24px;
  @include card-shadow;
  
  @include respond-to(laptop) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  @include respond-to(tablet) {
    padding: 20px;
  }
}

.image-gallery {
  .main-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: $border-radius-md;
    overflow: hidden;
    margin-bottom: 16px;
  }
  
  .thumbnails {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  
  .thumbnail {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid transparent;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
    
    &:hover,
    &.active {
      border-color: $color-primary;
    }
  }
}

.info-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  
  .cat-name {
    font-size: 2.2rem;
    color: $color-text-primary;
    margin: 0;
  }
  
  .cat-gender {
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 500;
    
    &.公 {
      background: rgba(100, 181, 246, 0.15);
      color: #64B5F6;
    }
    
    &.母 {
      background: rgba(244, 143, 177, 0.15);
      color: #F48FB1;
    }
  }
}

.status-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.status-badge,
.health-badge {
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge {
  &.available {
    background: rgba(123, 196, 127, 0.15);
    color: $color-success;
  }
  
  &.pending {
    background: rgba(255, 183, 77, 0.15);
    color: $color-warning;
  }
  
  &.adopted {
    background: rgba(154, 154, 154, 0.15);
    color: $color-text-light;
  }
}

.health-badge {
  &.excellent {
    background: rgba(123, 196, 127, 0.15);
    color: $color-success;
  }
  
  &.good {
    background: rgba(255, 183, 77, 0.15);
    color: $color-warning;
  }
  
  &.special_care {
    background: rgba(229, 115, 115, 0.15);
    color: $color-error;
  }
}

.basic-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: $color-bg-primary;
  border-radius: 12px;
  
  .info-icon {
    font-size: 1.2rem;
  }
  
  .info-label {
    color: $color-text-secondary;
    font-size: 0.9rem;
  }
  
  .info-value {
    margin-left: auto;
    font-weight: 500;
    color: $color-text-primary;
  }
}

.special-needs {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(229, 115, 115, 0.1);
  border-radius: 12px;
  margin-bottom: 24px;
  
  .needs-icon {
    font-size: 1.2rem;
  }
  
  .needs-text {
    color: $color-error;
    font-weight: 500;
  }
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  
  @include respond-to(mobile) {
    flex-direction: column;
  }
}

.action-btn {
  flex: 1;
  padding: 14px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &.favorite {
    background: white;
    border: 2px solid $color-secondary;
    color: $color-text-secondary;
    
    &:hover,
    &.active {
      background: $color-secondary;
      color: white;
    }
  }
  
  &.appointment {
    @include button-primary;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
}

.stats-row {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: $color-primary-dark;
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: $color-text-secondary;
    margin-top: 4px;
  }
}

.detail-tabs {
  display: flex;
  gap: 8px;
  background: white;
  padding: 8px;
  border-radius: $border-radius-lg $border-radius-lg 0 0;
  @include card-shadow;
  overflow-x: auto;
  
  @include respond-to(mobile) {
    padding: 4px;
  }
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 16px;
  background: transparent;
  color: $color-text-secondary;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  
  &:hover {
    background: rgba(232, 168, 124, 0.1);
  }
  
  &.active {
    background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
    color: $color-primary-dark;
  }
  
  @include respond-to(mobile) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
}

.tab-content {
  background: white;
  padding: 32px;
  border-radius: 0 0 $border-radius-lg $border-radius-lg;
  margin-bottom: 24px;
  @include card-shadow;
  
  @include respond-to(tablet) {
    padding: 20px;
  }
}

.section-title {
  font-size: 1.4rem;
  color: $color-text-primary;
  margin-bottom: 24px;
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

.personality-traits {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.trait-item {
  padding: 20px;
  background: $color-bg-primary;
  border-radius: 16px;
}

.trait-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  .trait-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: $color-text-primary;
  }
  
  .trait-score {
    font-weight: 700;
    color: $color-primary-dark;
  }
}

.trait-bar {
  height: 10px;
  background: rgba(232, 168, 124, 0.15);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 8px;
}

.bar-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 1s ease;
}

.trait-desc {
  margin: 0;
  color: $color-text-secondary;
  font-size: 0.9rem;
}

.personality-chart {
  margin-bottom: 32px;
  
  h4 {
    font-size: 1.1rem;
    color: $color-text-primary;
    margin-bottom: 16px;
  }
  
  .chart-wrapper {
    height: 350px;
    
    @include respond-to(tablet) {
      height: 280px;
    }
  }
}

.trait-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.trait-card {
  padding: 20px;
  background: $color-bg-primary;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(232, 168, 124, 0.15);
  }
  
  .card-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 8px;
  }
  
  h5 {
    font-size: 1rem;
    color: $color-text-primary;
    margin-bottom: 12px;
  }
  
  .level-indicator {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-bottom: 8px;
  }
  
  .level-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(232, 168, 124, 0.2);
    
    &.active {
      background: $color-primary;
    }
  }
  
  p {
    margin: 0;
    color: $color-text-secondary;
    font-size: 0.85rem;
  }
}

.vaccine-timeline {
  position: relative;
  padding-left: 30px;
  margin-bottom: 32px;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-dot {
  position: absolute;
  left: -30px;
  top: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $color-primary-light;
  border: 3px solid white;
  box-shadow: 0 0 0 2px $color-primary;
  
  &.latest {
    background: $color-primary;
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 2px $color-primary, 0 0 0 0 rgba(232, 168, 124, 0.4);
  }
  50% {
    box-shadow: 0 0 0 2px $color-primary, 0 0 0 8px rgba(232, 168, 124, 0);
  }
}

.timeline-line {
  position: absolute;
  left: -22px;
  top: 28px;
  width: 2px;
  height: calc(100% + 8px);
  background: $color-primary-light;
}

.timeline-content {
  background: $color-bg-primary;
  padding: 20px;
  border-radius: 16px;
}

.vaccine-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  .vaccine-name {
    font-size: 1.1rem;
    color: $color-text-primary;
    margin: 0;
  }
  
  .vaccine-status {
    padding: 4px 12px;
    background: rgba(123, 196, 127, 0.15);
    color: $color-success;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.vaccine-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .detail-label {
    font-size: 0.85rem;
    color: $color-text-light;
  }
  
  .detail-value {
    font-weight: 500;
    color: $color-text-primary;
  }
}

.vaccine-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(232, 168, 124, 0.08) 0%, rgba(255, 182, 193, 0.08) 100%);
  border-radius: 16px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .summary-icon {
    font-size: 1.3rem;
  }
  
  .summary-text {
    color: $color-text-secondary;
  }
}

.story-card {
  background: $color-bg-primary;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 24px;
  
  @include respond-to(tablet) {
    padding: 20px;
  }
}

.story-header {
  margin-bottom: 16px;
  
  .story-date {
    color: $color-text-light;
    font-size: 0.9rem;
  }
}

.story-content {
  margin-bottom: 24px;
  
  p {
    line-height: 2;
    color: $color-text-primary;
    font-size: 1.05rem;
    text-indent: 2em;
  }
}

.story-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px dashed rgba(232, 168, 124, 0.3);
  flex-wrap: wrap;
  gap: 12px;
}

.shelter-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: $color-text-secondary;
  font-size: 0.95rem;
}

.volunteer-sign {
  color: $color-primary-dark;
  font-style: italic;
}

.adoption-tips {
  padding: 24px;
  background: linear-gradient(135deg, rgba(152, 216, 200, 0.1) 0%, rgba(200, 230, 222, 0.1) 100%);
  border-radius: 16px;
  
  h4 {
    font-size: 1.1rem;
    color: $color-text-primary;
    margin-bottom: 16px;
  }
  
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 0;
  }
  
  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: $color-text-secondary;
    line-height: 1.6;
    
    &::before {
      content: '🐾';
      flex-shrink: 0;
    }
  }
}

.loading-state,
.not-found {
  text-align: center;
  padding: 80px 20px;
  max-width: 600px;
  margin: 0 auto;
  
  .spinner,
  .icon {
    font-size: 5rem;
    margin-bottom: 24px;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 24px;
    border: 4px solid $color-primary-light;
    border-top-color: $color-primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  h2 {
    color: $color-text-primary;
    margin-bottom: 12px;
  }
  
  p {
    color: $color-text-secondary;
    margin-bottom: 32px;
  }
  
  .back-btn {
    @include button-primary;
    text-decoration: none;
    display: inline-block;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
