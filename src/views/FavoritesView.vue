<template>
  <div class="favorites-view">
    <div class="container">
      <div class="page-header">
        <h1>❤️ 我的收藏</h1>
        <p>您收藏的猫咪都在这里，随时可以查看详情</p>
      </div>
      
      <div v-if="favorites.length > 0" class="favorites-info">
        <span>
          共收藏了 <strong>{{ favorites.length }}</strong> 只猫咪
        </span>
      </div>
      
      <FavoriteList />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCatStore } from '@/stores/catStore'
import FavoriteList from '@/components/cats/FavoriteList.vue'

const catStore = useCatStore()
const favorites = computed(() => catStore.favorites)
</script>

<style lang="scss" scoped>
.favorites-view {
  padding: 24px 0 48px;
  min-height: calc(100vh - 70px);
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  
  h1 {
    font-size: 2rem;
    color: $color-text-primary;
    margin-bottom: 8px;
    
    @include respond-to(tablet) {
      font-size: 1.6rem;
    }
  }
  
  p {
    color: $color-text-secondary;
    margin: 0;
  }
}

.favorites-info {
  margin-bottom: 20px;
  color: $color-text-secondary;
  font-size: 0.95rem;
  
  strong {
    color: $color-primary-dark;
    font-size: 1.1rem;
  }
}
</style>
