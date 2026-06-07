<template>
  <div class="cat-detail-view">
    <div class="container">
      <button class="back-btn" @click="goBack">
        ← 返回列表
      </button>
      <CatDetailView />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import CatDetailView from '@/components/detail/CatDetailView.vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/cats')
  }
}
</script>

<style lang="scss" scoped>
.cat-detail-view {
  padding: 24px 0 48px;
  min-height: calc(100vh - 70px);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
  background: white;
  border: 2px solid rgba(232, 168, 124, 0.2);
  border-radius: 20px;
  color: $color-text-secondary;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $color-primary;
    color: $color-primary;
    transform: translateX(-4px);
  }
}
</style>
