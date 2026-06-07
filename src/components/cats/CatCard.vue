<template>
  <div 
    class="cat-card"
    :class="{ 'is-favorite': isFavorited }"
    @click="handleCardClick"
  >
    <div class="card-image">
      <LazyImage
        :src="cat.avatar"
        :alt="cat.name"
      />
      <div class="card-overlay">
        <button 
          class="favorite-btn"
          :class="{ active: isFavorited }"
          :title="isFavorited ? '取消收藏' : '添加收藏'"
          @click.stop="toggleFavorite"
        >
          <span>{{ isFavorited ? '❤️' : '🤍' }}</span>
        </button>
        <div
          class="status-badge"
          :class="cat.adoptionStatus"
        >
          {{ statusText }}
        </div>
      </div>
      <div
        v-if="showMatchScore && cat.matchScore"
        class="match-score"
      >
        <div
          class="score-ring"
          :style="{ '--score-color': scoreColor }"
        >
          <span class="score-value">{{ cat.matchScore }}</span>
          <span class="score-label">匹配度</span>
        </div>
      </div>
    </div>
    
    <div class="card-content">
      <div class="card-header">
        <h3 class="cat-name">
          {{ cat.name }}
        </h3>
        <span
          class="cat-gender"
          :class="cat.gender"
        >
          {{ cat.gender === '公' ? '♂' : '♀' }}
        </span>
      </div>
      
      <div class="cat-tags">
        <span class="tag breed">{{ cat.breed }}</span>
        <span class="tag age">{{ cat.ageText }}</span>
        <span class="tag color">{{ cat.color }}</span>
      </div>
      
      <div class="personality-tags">
        <span 
          v-for="(trait, index) in cat.personality.slice(0, 3)" 
          :key="index"
          class="personality-tag"
        >
          {{ trait.name }}
        </span>
      </div>
      
      <div class="card-footer">
        <div class="stats">
          <span class="stat">
            <span class="stat-icon">👁️</span>
            <span class="stat-value">{{ cat.views }}</span>
          </span>
          <span class="stat">
            <span class="stat-icon">❤️</span>
            <span class="stat-value">{{ cat.favorites }}</span>
          </span>
        </div>
        <span
          class="health-status"
          :class="cat.healthStatus"
        >
          {{ cat.healthStatusText }}
        </span>
      </div>
    </div>
    
    <div 
      v-if="draggable" 
      class="drag-handle"
      @mousedown.stop
      @touchstart.stop
    >
      <span>⋮⋮</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCatStore } from '@/stores/catStore'
import { getMatchColor } from '@/utils'
import LazyImage from '@/components/common/LazyImage.vue'

const props = defineProps({
  cat: {
    type: Object,
    required: true
  },
  showMatchScore: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'favorite'])

const catStore = useCatStore()

const isFavorited = computed(() => catStore.isFavorite(props.cat.id))

const statusText = computed(() => {
  const statusMap = {
    available: '可领养',
    pending: '审核中',
    adopted: '已领养'
  }
  return statusMap[props.cat.adoptionStatus] || '可领养'
})

const scoreColor = computed(() => {
  return getMatchColor(props.cat.matchScore)
})

const handleCardClick = () => {
  emit('click', props.cat)
}

const toggleFavorite = () => {
  catStore.toggleFavorite(props.cat.id)
  emit('favorite', props.cat.id)
}
</script>

<style lang="scss" scoped>
.cat-card {
  position: relative;
  background: white;
  border-radius: $border-radius-lg;
  overflow: hidden;
  cursor: pointer;
  @include card-shadow;
  @include card-hover;
  
  &.is-favorite {
    box-shadow: 0 4px 25px rgba(255, 182, 193, 0.3);
  }
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%);
}

.favorite-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
    background: white;
  }
  
  &.active {
    animation: heartBeat 0.6s ease;
  }
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  
  &.available {
    background: $color-success;
  }
  
  &.pending {
    background: $color-warning;
  }
  
  &.adopted {
    background: $color-text-light;
  }
}

.match-score {
  position: absolute;
  bottom: 12px;
  right: 12px;
  
  .score-ring {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    border: 3px solid var(--score-color);
  }
  
  .score-value {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--score-color);
    line-height: 1;
  }
  
  .score-label {
    font-size: 0.65rem;
    color: $color-text-secondary;
    margin-top: 2px;
  }
}

.card-content {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.cat-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: $color-text-primary;
  margin: 0;
}

.cat-gender {
  font-size: 1.3rem;
  font-weight: bold;
  
  &.公 {
    color: #64B5F6;
  }
  
  &.母 {
    color: #F48FB1;
  }
}

.cat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.tag {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  
  &.breed {
    background: $color-primary-light;
    color: $color-primary-dark;
  }
  
  &.age {
    background: $color-secondary-light;
    color: #D88598;
  }
  
  &.color {
    background: $color-accent-light;
    color: #6BA89E;
  }
}

.personality-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.personality-tag {
  padding: 4px 10px;
  background: linear-gradient(135deg, rgba(232, 168, 124, 0.15) 0%, rgba(255, 182, 193, 0.15) 100%);
  border-radius: 8px;
  font-size: 0.75rem;
  color: $color-text-secondary;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.stats {
  display: flex;
  gap: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: $color-text-light;
  
  .stat-icon {
    font-size: 0.9rem;
  }
  
  .stat-value {
    font-weight: 500;
  }
}

.health-status {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  
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

.drag-handle {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  width: 30px;
  height: 40px;
  background: $color-primary;
  color: white;
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:active {
    cursor: grabbing;
  }
  
  .cat-card:hover & {
    opacity: 1;
    left: 0;
  }
  
  @include respond-to(tablet) {
    opacity: 1;
    left: 0;
    width: 24px;
    height: 32px;
  }
}
</style>
