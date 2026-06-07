<template>
  <div class="favorite-list">
    <div
      v-if="favorites.length === 0"
      class="empty-state"
    >
      <div class="empty-icon">
        😿
      </div>
      <h3>还没有收藏的猫咪</h3>
      <p>浏览猫咪列表，发现你心仪的小伙伴吧~</p>
      <router-link
        to="/cats"
        class="browse-btn"
      >
        去浏览猫咪
      </router-link>
    </div>
    
    <draggable
      v-else
      v-model="dragList"
      item-key="id"
      handle=".drag-handle"
      :animation="300"
      ghost-class="ghost"
      chosen-class="chosen"
      class="draggable-container"
      @end="onDragEnd"
    >
      <template #item="{ element, index }">
        <div
          class="drag-item"
          :index="index"
        >
          <CatCard 
            :cat="element" 
            draggable
            @click="goToDetail(element)"
          />
          <button
            class="remove-btn"
            @click="removeFavorite(element.id)"
          >
            <span>🗑️</span>
          </button>
        </div>
      </template>
    </draggable>
    
    <div
      v-if="favorites.length > 0"
      class="drag-tip"
    >
      💡 提示：拖动左侧的 ⋮⋮ 图标可以调整收藏顺序
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import { useCatStore } from '@/stores/catStore'
import { useRouter } from 'vue-router'
import CatCard from '@/components/cats/CatCard.vue'

const catStore = useCatStore()
const router = useRouter()

const dragList = ref([])

const favorites = computed(() => catStore.favoriteCats)

watch(favorites, (newFavs) => {
  const orderedFavs = catStore.favorites
    .map(id => newFavs.find(f => f.id === id))
    .filter(Boolean)
  dragList.value = orderedFavs
}, { immediate: true, deep: true })

const onDragEnd = () => {
  const newOrder = dragList.value.map(item => item.id)
  catStore.reorderFavorites(newOrder)
}

const removeFavorite = (id) => {
  catStore.toggleFavorite(id)
}

const goToDetail = (cat) => {
  router.push(`/cat/${cat.id}`)
}
</script>

<style lang="scss" scoped>
.favorite-list {
  padding: 20px 0;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  
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
  
  .browse-btn {
    @include button-primary;
    display: inline-block;
    text-decoration: none;
  }
}

.draggable-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drag-item {
  position: relative;
  
  &:hover .remove-btn {
    opacity: 1;
    right: -10px;
  }
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: -40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $color-error;
  color: white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    background: #d32f2f;
  }
  
  @include respond-to(tablet) {
    opacity: 1;
    right: 10px;
  }
}

.ghost {
  opacity: 0.5;
  background: $color-primary-light;
}

.chosen {
  box-shadow: 0 10px 40px rgba(232, 168, 124, 0.4);
}

.drag-tip {
  margin-top: 24px;
  padding: 16px;
  background: rgba(232, 168, 124, 0.1);
  border-radius: 12px;
  text-align: center;
  color: $color-text-secondary;
  font-size: 0.9rem;
}
</style>
