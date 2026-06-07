<template>
  <div class="lazy-image-wrapper" :class="{ loaded: isLoaded, error: hasError }">
    <div v-if="!isLoaded && !hasError" class="placeholder">
      <div class="paw-loader">🐾</div>
    </div>
    <img
      v-if="!hasError"
      ref="imgRef"
      :alt="alt"
      :class="{ 'fade-in': isLoaded }"
      @load="onLoad"
      @error="onError"
      loading="lazy"
    />
    <div v-if="hasError" class="error-placeholder">
      <span>😿</span>
      <p>图片加载失败</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const imgRef = ref(null)
const isLoaded = ref(false)
const hasError = ref(false)

const loadImage = () => {
  if (imgRef.value && props.src) {
    imgRef.value.src = props.src
  }
}

const onLoad = () => {
  isLoaded.value = true
}

const onError = () => {
  hasError.value = true
}

onMounted(() => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(imgRef.value)
        }
      })
    }, { rootMargin: '100px' })
    
    if (imgRef.value) {
      observer.observe(imgRef.value)
    }
  } else {
    loadImage()
  }
})

watch(() => props.src, () => {
  isLoaded.value = false
  hasError.value = false
  loadImage()
})
</script>

<style lang="scss" scoped>
.lazy-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, $color-bg-secondary 0%, $color-bg-primary 100%);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease;
    
    &.fade-in {
      opacity: 1;
    }
  }
  
  &.loaded {
    background: transparent;
  }
  
  &.error {
    background: $color-bg-secondary;
  }
}

.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.paw-loader {
  font-size: 2rem;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.error-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: $color-text-light;
  
  span {
    font-size: 2rem;
  }
  
  p {
    font-size: 0.85rem;
  }
}
</style>
