<template>
  <transition name="slide-up">
    <button 
      v-if="isVisible" 
      class="back-to-top"
      @click="scrollToTop"
      aria-label="回到顶部"
    >
      <span class="arrow">↑</span>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { throttle } from '@/utils'

const isVisible = ref(false)

const handleScroll = throttle(() => {
  isVisible.value = window.scrollY > 300
}, 200)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, $color-primary 0%, $color-primary-dark 100%);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 500;
  box-shadow: 0 4px 20px rgba(232, 168, 124, 0.4);
  transition: all 0.3s ease;
  border: none;
  
  &:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 6px 25px rgba(232, 168, 124, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @include respond-to(mobile) {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.arrow {
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
</style>
