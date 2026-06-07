<template>
  <div class="questionnaire-view">
    <div class="container">
      <div class="page-header">
        <h1>🎯 智能匹配问卷</h1>
        <p>回答几个简单的问题，让我们为您找到最适合的猫咪伙伴</p>
      </div>
      
      <QuestionnaireForm />
    </div>
  </div>
</template>

<script setup>
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm.vue'
</script>

<style lang="scss" scoped>
.questionnaire-view {
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
