import { defineStore } from 'pinia'
import { catApi } from '@/api'
import { ref, computed } from 'vue'

export const useCatStore = defineStore('cat', () => {
  const cats = ref([])
  const catDetail = ref(null)
  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))
  const filters = ref({
    breeds: [],
    colors: [],
    ageCategories: []
  })
  const currentFilters = ref({
    breed: 'all',
    color: 'all',
    ageCategory: 'all',
    search: '',
    page: 1,
    pageSize: 12
  })
  const pagination = ref({
    total: 0,
    totalPages: 0
  })
  const loading = ref(false)
  const detailLoading = ref(false)

  const filteredCats = computed(() => cats.value)
  
  const favoriteCats = computed(() => 
    cats.value.filter(cat => favorites.value.includes(cat.id))
  )

  const isFavorite = (id) => favorites.value.includes(id)

  async function fetchCats(reset = false) {
    if (reset) {
      currentFilters.value.page = 1
      cats.value = []
    }
    loading.value = true
    try {
      const data = await catApi.getCats(currentFilters.value)
      if (reset) {
        cats.value = data.list
      } else {
        cats.value = [...cats.value, ...data.list]
      }
      pagination.value.total = data.total
      pagination.value.totalPages = data.totalPages
    } catch (error) {
      console.error('获取猫咪列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchCatDetail(id) {
    detailLoading.value = true
    try {
      const data = await catApi.getCatDetail(id)
      catDetail.value = data
      return data
    } catch (error) {
      console.error('获取猫咪详情失败:', error)
      return null
    } finally {
      detailLoading.value = false
    }
  }

  async function fetchFilters() {
    try {
      const data = await catApi.getFilters()
      filters.value = data
    } catch (error) {
      console.error('获取筛选条件失败:', error)
    }
  }

  function toggleFavorite(catId) {
    const index = favorites.value.indexOf(catId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(catId)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function updateFilters(filters) {
    currentFilters.value = { ...currentFilters.value, ...filters }
    fetchCats(true)
  }

  function loadMore() {
    if (currentFilters.value.page < pagination.value.totalPages && !loading.value) {
      currentFilters.value.page++
      fetchCats(false)
    }
  }

  function reorderFavorites(newOrder) {
    favorites.value = newOrder
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function clearCatDetail() {
    catDetail.value = null
  }

  return {
    cats,
    catDetail,
    favorites,
    filters,
    currentFilters,
    pagination,
    loading,
    detailLoading,
    filteredCats,
    favoriteCats,
    isFavorite,
    fetchCats,
    fetchCatDetail,
    fetchFilters,
    toggleFavorite,
    updateFilters,
    loadMore,
    reorderFavorites,
    clearCatDetail
  }
})
