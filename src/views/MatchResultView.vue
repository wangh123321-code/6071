<template>
  <div class="match-result-view">
    <div class="container">
      <div class="page-header">
        <h1>🎉 匹配结果</h1>
        <p>根据您的生活习惯和偏好，为您找到最适合的猫咪</p>
      </div>
      
      <MatchResult />
    </div>
  </div>
</template>

<script setup>
import MatchResult from '@/components/match/MatchResult.vue'
</script>

<style lang="scss" scoped>
.match-result-view {
  padding: 24px 0 48px;
  min-height: calc(100vh - 70px);
  background: $color-bg-primary;
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
</style>
