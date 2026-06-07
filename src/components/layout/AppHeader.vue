<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <img src="/cat-paw.svg" alt="logo" class="logo-icon" />
        <span class="logo-text">喵星之家</span>
      </router-link>
      
      <nav class="nav-menu" :class="{ active: isMenuOpen }">
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path" 
          class="nav-item"
          active-class="active"
          @click="isMenuOpen = false"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>
      
      <div class="header-actions">
        <router-link to="/favorites" class="favorite-btn" title="我的收藏">
          <span class="icon">❤️</span>
          <span v-if="favoriteCount > 0" class="badge">{{ favoriteCount }}</span>
        </router-link>
        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
          <span class="hamburger" :class="{ active: isMenuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCatStore } from '@/stores/catStore'

const catStore = useCatStore()
const isMenuOpen = ref(false)

const favoriteCount = computed(() => catStore.favorites.length)

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/cats', label: '猫咪列表', icon: '🐱' },
  { path: '/questionnaire', label: '智能匹配', icon: '🎯' },
  { path: '/favorites', label: '我的收藏', icon: '❤️' },
  { path: '/about', label: '关于我们', icon: 'ℹ️' }
]
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 248, 240, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(232, 168, 124, 0.2);
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: $color-primary-dark;
  text-decoration: none;
}

.logo-icon {
  width: 36px;
  height: 36px;
}

.nav-menu {
  display: flex;
  gap: 8px;
  
  @include respond-to(tablet) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 248, 240, 0.98);
    flex-direction: column;
    padding: 24px;
    gap: 4px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    
    &.active {
      transform: translateX(0);
    }
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 20px;
  color: $color-text-secondary;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(232, 168, 124, 0.1);
    color: $color-primary;
  }
  
  &.active {
    background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
    color: $color-primary-dark;
  }
  
  @include respond-to(tablet) {
    padding: 16px 20px;
    font-size: 1.1rem;
    border-radius: 12px;
  }
}

.nav-icon {
  font-size: 1.2rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.favorite-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(232, 168, 124, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(232, 168, 124, 0.2);
    transform: scale(1.1);
  }
  
  .icon {
    font-size: 1.2rem;
  }
  
  .badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    background: $color-secondary;
    color: white;
    font-size: 11px;
    font-weight: 600;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(232, 168, 124, 0.1);
  
  @include respond-to(tablet) {
    display: flex;
  }
}

.hamburger {
  position: relative;
  width: 20px;
  height: 2px;
  background: $color-primary-dark;
  border-radius: 2px;
  transition: all 0.3s ease;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background: $color-primary-dark;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  
  &::before {
    top: -6px;
  }
  
  &::after {
    top: 6px;
  }
  
  &.active {
    background: transparent;
    
    &::before {
      top: 0;
      transform: rotate(45deg);
    }
    
    &::after {
      top: 0;
      transform: rotate(-45deg);
    }
  }
}
</style>
