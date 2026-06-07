<template>
  <div class="cats-view">
    <div class="container">
      <div class="page-header">
        <h1>🐱 待领养猫咪</h1>
        <p>每一只小生命都在等待一个温暖的家</p>
      </div>
      
      <FilterPanel @filter-change="handleFilterChange" />
      
      <div class="results-info" v-if="!loading">
        <span>
          共找到 <strong>{{ totalCats }}</strong> 只符合条件的猫咪
        </span>
      </div>
      
      <div v-if="loading && cats.length === 0" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
      
      <div v-else-if="cats.length === 0" class="empty-state">
        <div class="empty-icon">😿</div>
        <h3>没有找到符合条件的猫咪</h3>
        <p>试试调整筛选条件吧</p>
        <button class="reset-btn" @click="resetFilters">
          重置筛选条件
        </button>
      </div>
      
      <WaterfallLayout 
        v-else
        :items="cats"
        :loading="loading"
        :has-more="hasMore"
        @load-more="loadMore"
      >
        <template #default="{ item }">
          <CatCard 
            :cat="item" 
            @click="goToDetail(item.id)"
          />
        </template>
      </WaterfallLayout>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCatStore } from '@/stores/catStore'
import { useRouter } from 'vue-router'
import FilterPanel from '@/components/cats/FilterPanel.vue'
import WaterfallLayout from '@/components/cats/WaterfallLayout.vue'
import CatCard from '@/components/cats/CatCard.vue'

const catStore = useCatStore()
const router = useRouter()

const cats = computed(() => catStore.filteredCats)
const loading = computed(() => catStore.loading)
const totalCats = computed(() => catStore.pagination.total)
const hasMore = computed(() => 
  catStore.currentFilters.page < catStore.pagination.totalPages
)

const goToDetail = (id) => {
  router.push(`/cat/${id}`)
}

const handleFilterChange = () => {
}

const loadMore = () => {
  catStore.loadMore()
}

const resetFilters = () => {
  catStore.updateFilters({
    search: '',
    breed: 'all',
    color: 'all',
    ageCategory: 'all'
  })
}

onMounted(() => {
  if (catStore.cats.length === 0) {
    catStore.fetchCats(true)
  }
  if (catStore.filters.breeds.length === 0) {
    catStore.fetchFilters()
  }
})
</script>

<style lang="scss" scoped>
.cats-view {
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

.results-info {
  margin-bottom: 20px;
  color: $color-text-secondary;
  font-size: 0.95rem;
  
  strong {
    color: $color-primary-dark;
    font-size: 1.1rem;
  }
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.loading-state {
  .spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 16px;
    border: 4px solid $color-primary-light;
    border-top-color: $color-primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  p {
    color: $color-text-light;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 16px;
  }
  
  h3 {
    color: $color-text-primary;
    margin-bottom: 8px;
  }
  
  p {
    color: $color-text-secondary;
    margin-bottom: 24px;
  }
  
  .reset-btn {
    @include button-secondary;
  }
}
</style>
