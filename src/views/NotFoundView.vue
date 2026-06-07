<template>
  <div class="not-found-view">
    <div class="container">
      <div class="not-found-content">
        <div class="not-found-icon">
          <span class="cat-emoji">😿</span>
          <span class="code">404</span>
        </div>
        <h1>页面走丢了</h1>
        <p>这只猫咪好像找不到回家的路了...</p>
        <div class="actions">
          <router-link to="/" class="btn-primary">
            🏠 返回首页
          </router-link>
          <router-link to="/cats" class="btn-secondary">
            🐱 浏览猫咪
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.not-found-view {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  @include gradient-bg;
}

.not-found-content {
  text-align: center;
  padding: 40px 20px;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.not-found-icon {
  position: relative;
  margin-bottom: 24px;
  
  .cat-emoji {
    font-size: 8rem;
    display: block;
    animation: bounce 2s ease-in-out infinite;
  }
  
  .code {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4rem;
    font-weight: 700;
    color: rgba(232, 168, 124, 0.2);
    z-index: -1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.not-found-content h1 {
  font-size: 2rem;
  color: $color-text-primary;
  margin-bottom: 12px;
  
  @include respond-to(tablet) {
    font-size: 1.6rem;
  }
}

.not-found-content p {
  color: $color-text-secondary;
  margin-bottom: 32px;
  font-size: 1.05rem;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  @include button-primary;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  @include button-secondary;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
