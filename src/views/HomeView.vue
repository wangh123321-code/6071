<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            用爱，给它们一个<span class="highlight">温暖的家</span>
          </h1>
          <p class="hero-subtitle">
            上海喵星之家流浪猫救助站 · 去年救助327只流浪猫
          </p>
          <p class="hero-desc">
            填写简单的生活习惯问卷，我们将为您智能匹配最适合的猫咪伙伴，
            减少因性格不合导致的二次伤害，让每一次领养都是最美的遇见。
          </p>
          <div class="hero-actions">
            <router-link to="/questionnaire" class="btn-primary">
              🎯 开始智能匹配
            </router-link>
            <router-link to="/cats" class="btn-secondary">
              🐱 浏览所有猫咪
            </router-link>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">327</span>
              <span class="stat-label">年救助量</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">41%</span>
              <span class="stat-label">领养成功率</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">待领养猫咪</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="hero-img-wrapper">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20cozy%20cat%20adoption%20scene%20cute%20cats%20playing%20soft%20warm%20lighting%20pastel%20colors&image_size=landscape_16_9" 
              alt="可爱的猫咪"
              loading="lazy"
            />
            <div class="floating-card card-1">
              <span class="emoji">😺</span>
              <span>找到新家啦！</span>
            </div>
            <div class="floating-card card-2">
              <span class="emoji">🏠</span>
              <span>温暖的归宿</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="features-section section">
      <div class="container">
        <div class="section-title">
          <h2>为什么选择我们</h2>
          <p>专业的匹配系统，让领养更科学、更贴心</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>智能匹配</h3>
            <p>根据您的生活习惯、居住环境、养猫经验，从性格、年龄、健康状况多维度精准匹配</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3>详细档案</h3>
            <p>每只猫咪都有完整的疫苗记录、性格测评、救助故事，让您全面了解它的一切</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📹</div>
            <h3>视频预约</h3>
            <p>足不出户就能与猫咪视频互动，提前建立感情纽带，确认是否是您心仪的伙伴</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💖</div>
            <h3>温馨陪伴</h3>
            <p>领养后定期回访，提供专业养猫建议，让您和猫咪都能享受美好的相处时光</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="process-section section">
      <div class="container">
        <div class="section-title">
          <h2>领养流程</h2>
          <p>简单四步，给猫咪一个温暖的家</p>
        </div>
        <div class="process-steps">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>填写问卷</h3>
              <p>花3分钟完成生活习惯问卷</p>
            </div>
            <div class="step-arrow">→</div>
          </div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>智能匹配</h3>
              <p>系统为您推荐最合适的猫咪</p>
            </div>
            <div class="step-arrow">→</div>
          </div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>视频互动</h3>
              <p>预约视频，与猫咪线上见面</p>
            </div>
            <div class="step-arrow">→</div>
          </div>
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>带它回家</h3>
              <p>签订协议，开启美好时光</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="featured-cats-section section">
      <div class="container">
        <div class="section-header">
          <div class="section-title">
            <h2>待领养的小可爱</h2>
            <p>每一只都在等待一个温暖的家</p>
          </div>
          <router-link to="/cats" class="view-all">
            查看全部 →
          </router-link>
        </div>
        <div v-if="!loading" class="cats-grid">
          <div 
            v-for="cat in featuredCats" 
            :key="cat.id"
            class="cat-card-wrapper"
          >
            <CatCard :cat="cat" @click="goToDetail(cat.id)" />
          </div>
        </div>
        <div v-else class="loading-cats">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    </section>
    
    <section class="cta-section section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h2>准备好迎接新成员了吗？</h2>
            <p>填写问卷，让我们为您找到最契合的猫咪伙伴</p>
          </div>
          <router-link to="/questionnaire" class="cta-btn">
            🎯 立即开始匹配
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCatStore } from '@/stores/catStore'
import { useRouter } from 'vue-router'
import CatCard from '@/components/cats/CatCard.vue'

const catStore = useCatStore()
const router = useRouter()

const loading = computed(() => catStore.loading)
const featuredCats = computed(() => 
  catStore.cats
    .filter(cat => cat.adoptionStatus === 'available')
    .slice(0, 8)
)

const goToDetail = (id) => {
  router.push(`/cat/${id}`)
}

onMounted(() => {
  if (catStore.cats.length === 0) {
    catStore.fetchCats(true)
  }
})
</script>

<style lang="scss" scoped>
.home-view {
  overflow: hidden;
}

.hero-section {
  padding: 60px 0 80px;
  @include gradient-bg;
  
  @include respond-to(tablet) {
    padding: 40px 0 60px;
  }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @include respond-to(laptop) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.hero-title {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 16px;
  color: $color-text-primary;
  
  .highlight {
    background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @include respond-to(tablet) {
    font-size: 2rem;
  }
}

.hero-subtitle {
  font-size: 1.1rem;
  color: $color-primary-dark;
  margin-bottom: 16px;
  font-weight: 500;
}

.hero-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: $color-text-secondary;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.btn-primary {
  @include button-primary;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  @include button-secondary;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero-stats {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  
  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: $color-primary-dark;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: $color-text-secondary;
    margin-top: 4px;
  }
}

.hero-image {
  position: relative;
}

.hero-img-wrapper {
  position: relative;
  border-radius: $border-radius-lg;
  overflow: hidden;
  @include card-shadow;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  font-weight: 500;
  animation: float 3s ease-in-out infinite;
  
  .emoji {
    font-size: 1.2rem;
  }
  
  &.card-1 {
    top: 10%;
    left: -20px;
    animation-delay: 0s;
  }
  
  &.card-2 {
    bottom: 15%;
    right: -20px;
    animation-delay: 1.5s;
  }
  
  @include respond-to(laptop) {
    &.card-1 {
      left: 20px;
    }
    
    &.card-2 {
      right: 20px;
    }
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.features-section {
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 32px 24px;
  text-align: center;
  border-radius: $border-radius-lg;
  background: linear-gradient(135deg, $color-bg-primary 0%, white 100%);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(232, 168, 124, 0.2);
    
    .feature-icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
}

.feature-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: $color-text-primary;
}

.feature-card p {
  color: $color-text-secondary;
  line-height: 1.7;
  margin: 0;
}

.process-section {
  background: $color-bg-primary;
}

.process-steps {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  
  @include respond-to(tablet) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
}

.step-item {
  display: flex;
  align-items: center;
  gap: 12px;
  
  @include respond-to(tablet) {
    flex-direction: column;
    text-align: center;
  }
}

.step-number {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-content {
  h3 {
    font-size: 1.1rem;
    margin-bottom: 4px;
    color: $color-text-primary;
  }
  
  p {
    color: $color-text-secondary;
    font-size: 0.9rem;
    margin: 0;
  }
}

.step-arrow {
  font-size: 1.5rem;
  color: $color-primary;
  margin-left: 8px;
  
  @include respond-to(tablet) {
    transform: rotate(90deg);
    margin-left: 0;
  }
}

.featured-cats-section {
  background: white;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
  
  .section-title {
    margin-bottom: 0;
    text-align: left;
  }
}

.view-all {
  color: $color-primary;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: $color-primary-dark;
    transform: translateX(4px);
  }
}

.cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  
  @include respond-to(tablet) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
  
  @include respond-to(mobile) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.loading-cats {
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

.cta-section {
  background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  
  @include respond-to(tablet) {
    flex-direction: column;
    text-align: center;
  }
}

.cta-text h2 {
  font-size: 1.75rem;
  margin-bottom: 8px;
  color: $color-text-primary;
  
  @include respond-to(tablet) {
    font-size: 1.4rem;
  }
}

.cta-text p {
  color: $color-text-secondary;
  margin: 0;
}

.cta-btn {
  @include button-primary;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 16px 36px;
  white-space: nowrap;
}
</style>
