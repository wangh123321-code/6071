<template>
  <div class="waterfall-container" ref="containerRef">
    <div 
      v-for="(column, colIndex) in columns" 
      :key="colIndex"
      class="waterfall-column"
    >
      <div
        v-for="item in column"
        :key="item.id"
        class="waterfall-item"
        :style="{ animationDelay: `${item._index * 0.05}s` }"
      >
        <slot :item="item"></slot>
      </div>
    </div>
    
    <div v-if="loading" class="loading-more">
      <div class="spinner"></div>
      <span>加载中...</span>
    </div>
    
    <div v-if="!hasMore && items.length > 0" class="no-more">
      <span>🐾 已经到底啦 ~</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { throttle } from '@/utils'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  columnCount: {
    type: Number,
    default: 4
  },
  loading: {
    type: Boolean,
    default: false
  },
  hasMore: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['load-more'])

const containerRef = ref(null)
const currentColumns = ref(props.columnCount)

const columns = computed(() => {
  const cols = Array.from({ length: currentColumns.value }, () => [])
  const heights = Array(currentColumns.value).fill(0)
  
  props.items.forEach((item, index) => {
    const shortestCol = heights.indexOf(Math.min(...heights))
    cols[shortestCol].push({ ...item, _index: index })
    heights[shortestCol] += 1
  })
  
  return cols
})

const getResponsiveColumns = () => {
  const width = window.innerWidth
  if (width < 480) return 1
  if (width < 768) return 2
  if (width < 1024) return 3
  return props.columnCount
}

const handleResize = throttle(() => {
  currentColumns.value = getResponsiveColumns()
}, 200)

const handleScroll = throttle(() => {
  if (props.loading || !props.hasMore) return
  
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight
  
  if (scrollTop + windowHeight >= docHeight - 300) {
    emit('load-more')
  }
}, 200)

onMounted(() => {
  currentColumns.value = getResponsiveColumns()
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})

watch(() => props.columnCount, () => {
  currentColumns.value = getResponsiveColumns()
})
</script>

<style lang="scss" scoped>
.waterfall-container {
  display: flex;
  gap: 20px;
  
  @include respond-to(mobile) {
    gap: 12px;
  }
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @include respond-to(mobile) {
    gap: 12px;
  }
}

.waterfall-item {
  animation: fadeInUp 0.5s ease forwards;
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

.loading-more,
.no-more {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  color: $color-text-light;
  font-size: 0.95rem;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid $color-primary-light;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-more span {
  @include respond-to(mobile) {
    font-size: 0.85rem;
  }
}
</style>
