<template>
  <div class="filter-panel">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        v-model="searchText"
        type="text"
        placeholder="搜索猫咪名字或品种..."
        @input="handleSearch"
      />
      <button v-if="searchText" class="clear-btn" @click="clearSearch">✕</button>
    </div>
    
    <div class="filter-groups">
      <div class="filter-group">
        <label class="filter-label">品种</label>
        <select v-model="selectedBreed" class="filter-select" @change="applyFilters">
          <option v-for="breed in filters.breeds" :key="breed" :value="breed">
            {{ breed === 'all' ? '全部品种' : breed }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label class="filter-label">毛色</label>
        <select v-model="selectedColor" class="filter-select" @change="applyFilters">
          <option v-for="color in filters.colors" :key="color" :value="color">
            {{ color === 'all' ? '全部毛色' : color }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label class="filter-label">年龄</label>
        <select v-model="selectedAge" class="filter-select" @change="applyFilters">
          <option 
            v-for="age in filters.ageCategories" 
            :key="age.value" 
            :value="age.value"
          >
            {{ age.label }}
          </option>
        </select>
      </div>
      
      <button class="reset-btn" @click="resetFilters" :disabled="!hasActiveFilters">
        <span>🔄</span>
        重置筛选
      </button>
    </div>
    
    <div class="active-filters" v-if="hasActiveFilters">
      <span 
        v-for="filter in activeFilterList" 
        :key="filter.key"
        class="active-filter-tag"
      >
        {{ filter.label }}
        <button @click="removeFilter(filter.key)">✕</button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useCatStore } from '@/stores/catStore'
import { debounce } from '@/utils'

const emit = defineEmits(['filter-change'])

const catStore = useCatStore()

const searchText = ref('')
const selectedBreed = ref('all')
const selectedColor = ref('all')
const selectedAge = ref('all')

const filters = computed(() => catStore.filters)

const hasActiveFilters = computed(() => {
  return searchText.value !== '' ||
         selectedBreed.value !== 'all' ||
         selectedColor.value !== 'all' ||
         selectedAge.value !== 'all'
})

const activeFilterList = computed(() => {
  const list = []
  if (searchText.value) {
    list.push({ key: 'search', label: `搜索: ${searchText.value}` })
  }
  if (selectedBreed.value !== 'all') {
    list.push({ key: 'breed', label: `品种: ${selectedBreed.value}` })
  }
  if (selectedColor.value !== 'all') {
    list.push({ key: 'color', label: `毛色: ${selectedColor.value}` })
  }
  if (selectedAge.value !== 'all') {
    const ageLabel = filters.value.ageCategories.find(a => a.value === selectedAge.value)?.label
    list.push({ key: 'age', label: `年龄: ${ageLabel}` })
  }
  return list
})

const debouncedSearch = debounce((value) => {
  catStore.updateFilters({ search: value })
  emit('filter-change')
}, 300)

const handleSearch = () => {
  debouncedSearch(searchText.value)
}

const applyFilters = () => {
  catStore.updateFilters({
    breed: selectedBreed.value,
    color: selectedColor.value,
    ageCategory: selectedAge.value
  })
  emit('filter-change')
}

const clearSearch = () => {
  searchText.value = ''
  handleSearch()
}

const resetFilters = () => {
  searchText.value = ''
  selectedBreed.value = 'all'
  selectedColor.value = 'all'
  selectedAge.value = 'all'
  catStore.updateFilters({
    search: '',
    breed: 'all',
    color: 'all',
    ageCategory: 'all'
  })
  emit('filter-change')
}

const removeFilter = (key) => {
  switch (key) {
    case 'search':
      searchText.value = ''
      catStore.updateFilters({ search: '' })
      break
    case 'breed':
      selectedBreed.value = 'all'
      catStore.updateFilters({ breed: 'all' })
      break
    case 'color':
      selectedColor.value = 'all'
      catStore.updateFilters({ color: 'all' })
      break
    case 'age':
      selectedAge.value = 'all'
      catStore.updateFilters({ ageCategory: 'all' })
      break
  }
  emit('filter-change')
}

onMounted(() => {
  catStore.fetchFilters()
})

watch(() => catStore.currentFilters, (newFilters) => {
  searchText.value = newFilters.search
  selectedBreed.value = newFilters.breed
  selectedColor.value = newFilters.color
  selectedAge.value = newFilters.ageCategory
}, { deep: true })
</script>

<style lang="scss" scoped>
.filter-panel {
  background: white;
  border-radius: $border-radius-lg;
  padding: 20px;
  margin-bottom: 24px;
  @include card-shadow;
}

.search-box {
  position: relative;
  margin-bottom: 20px;
  
  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.1rem;
  }
  
  input {
    width: 100%;
    padding: 14px 44px 14px 44px;
    border: 2px solid rgba(232, 168, 124, 0.2);
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: $color-bg-primary;
    
    &:focus {
      border-color: $color-primary;
      background: white;
      outline: none;
    }
  }
  
  .clear-btn {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: $color-text-light;
    color: white;
    font-size: 0.7rem;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
    
    &:hover {
      background: $color-text-secondary;
    }
  }
}

.filter-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  
  @include respond-to(tablet) {
    flex-direction: column;
    align-items: stretch;
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 140px;
}

.filter-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: $color-text-secondary;
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid rgba(232, 168, 124, 0.2);
  border-radius: 12px;
  font-size: 0.95rem;
  color: $color-text-primary;
  background: $color-bg-primary;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23E8A87C' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  
  &:focus {
    border-color: $color-primary;
    background-color: white;
    outline: none;
  }
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border: 2px dashed rgba(232, 168, 124, 0.4);
  border-radius: 12px;
  background: transparent;
  color: $color-text-secondary;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    border-color: $color-primary;
    color: $color-primary;
    background: rgba(232, 168, 124, 0.05);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.active-filter-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
  border-radius: 16px;
  font-size: 0.85rem;
  color: $color-primary-dark;
  font-weight: 500;
  
  button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    border: none;
    font-size: 0.7rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: $color-primary-dark;
    
    &:hover {
      background: white;
    }
  }
}
</style>
