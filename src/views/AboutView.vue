<template>
  <div class="about-view">
    <div class="container">
      <div class="page-header">
        <h1>🏠 关于我们</h1>
        <p>了解喵星之家流浪猫救助站的故事</p>
      </div>
      
      <div class="about-content">
        <section class="about-section story-section">
          <div class="section-grid">
            <div class="section-text">
              <h2>我们的故事</h2>
              <p>
                喵星之家流浪猫救助站成立于2018年，位于上海市浦东新区。我们是一家由爱心人士自发组织的非营利性流浪动物救助机构，致力于为流浪猫提供救助、医疗、领养等服务。
              </p>
              <p>
                过去的一年里，我们共救助了327只流浪猫咪，其中41%成功找到了温暖的家。但我们也发现，很多领养人因为不了解猫咪的性格特点，带回家后又因各种原因送回救助站，给猫咪造成了二次伤害。
              </p>
              <p>
                为了解决这个问题，我们开发了这套智能领养匹配系统，希望通过科学的匹配算法，让每一只猫咪都能找到真正适合它的家，让每一次领养都能成为最美的遇见。
              </p>
            </div>
            <div class="section-image">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20shelter%20volunteers%20caring%20for%20stray%20cats%20warm%20cozy%20atmosphere&image_size=landscape_4_3" 
                alt="救助站日常"
                loading="lazy"
              >
            </div>
          </div>
        </section>
        
        <section class="about-section mission-section">
          <div class="section-grid reverse">
            <div class="section-text">
              <h2>我们的使命</h2>
              <div class="mission-cards">
                <div class="mission-card">
                  <span class="mission-icon">🐱</span>
                  <h3>救助流浪猫咪</h3>
                  <p>为城市中的流浪猫提供及时的救助和医疗照顾</p>
                </div>
                <div class="mission-card">
                  <span class="mission-icon">🏠</span>
                  <h3>寻找温暖归宿</h3>
                  <p>通过科学匹配，为每只猫咪找到真正适合的领养家庭</p>
                </div>
                <div class="mission-card">
                  <span class="mission-icon">📚</span>
                  <h3>普及科学养猫</h3>
                  <p>向公众传播科学的养猫知识，减少弃养行为</p>
                </div>
                <div class="mission-card">
                  <span class="mission-icon">💖</span>
                  <h3>传递爱心善意</h3>
                  <p>让更多人关注流浪动物问题，共建人与动物和谐共处的社会</p>
                </div>
              </div>
            </div>
            <div class="section-image">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20cat%20being%20adopted%20warm%20family%20scene&image_size=landscape_4_3" 
                alt="幸福的领养"
                loading="lazy"
              >
            </div>
          </div>
        </section>
        
        <section
          id="contact"
          class="about-section contact-section"
        >
          <h2 class="text-center">
            联系我们
          </h2>
          <div class="contact-grid">
            <div class="contact-card">
              <span class="contact-icon">📍</span>
              <h3>地址</h3>
              <p>上海市浦东新区爱心路888号</p>
              <p>喵星之家流浪猫救助站</p>
            </div>
            <div class="contact-card">
              <span class="contact-icon">📞</span>
              <h3>电话</h3>
              <p>400-888-9999</p>
              <p>服务时间：10:00-18:00</p>
            </div>
            <div class="contact-card">
              <span class="contact-icon">📧</span>
              <h3>邮箱</h3>
              <p>contact@miao-home.org</p>
              <p>adopt@miao-home.org</p>
            </div>
            <div class="contact-card">
              <span class="contact-icon">💬</span>
              <h3>微信公众号</h3>
              <p>喵星之家</p>
              <p>关注获取最新领养信息</p>
            </div>
          </div>
        </section>
        
        <section class="about-section volunteer-section">
          <div class="volunteer-card">
            <div class="volunteer-content">
              <h2>💝 成为志愿者</h2>
              <p>
                我们欢迎所有热爱动物、有责任心的朋友加入我们的志愿者团队。
                无论是日常照料、宣传推广还是专业医疗，您的每一份付出都能帮助更多的流浪猫咪。
              </p>
              <button class="volunteer-btn">
                申请成为志愿者
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.about-view {
  padding: 24px 0 48px;
  min-height: calc(100vh - 70px);
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
  
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.about-section {
  h2 {
    font-size: 1.75rem;
    color: $color-text-primary;
    margin-bottom: 20px;
    
    @include respond-to(tablet) {
      font-size: 1.4rem;
    }
  }
  
  p {
    color: $color-text-secondary;
    line-height: 2;
    margin-bottom: 16px;
  }
  
  &.text-center {
    text-align: center;
  }
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  
  @include respond-to(laptop) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  &.reverse {
    @include respond-to(laptop) {
      .section-image {
        order: -1;
      }
    }
  }
}

.section-image img {
  width: 100%;
  border-radius: $border-radius-lg;
  @include card-shadow;
}

.mission-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 24px;
  
  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.mission-card {
  padding: 24px;
  background: white;
  border-radius: $border-radius-md;
  @include card-shadow;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    @include card-hover;
  }
  
  .mission-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 12px;
  }
  
  h3 {
    font-size: 1.1rem;
    color: $color-text-primary;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.contact-card {
  padding: 32px 24px;
  text-align: center;
  background: white;
  border-radius: $border-radius-lg;
  @include card-shadow;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    @include card-hover;
  }
  
  .contact-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 1.1rem;
    color: $color-primary-dark;
    margin-bottom: 12px;
  }
  
  p {
    margin: 4px 0;
    font-size: 0.95rem;
  }
}

.volunteer-section {
  .volunteer-card {
    background: linear-gradient(135deg, $color-primary-light 0%, $color-secondary-light 100%);
    border-radius: $border-radius-lg;
    overflow: hidden;
  }
  
  .volunteer-content {
    padding: 48px;
    text-align: center;
    
    @include respond-to(tablet) {
      padding: 32px 24px;
    }
    
    h2 {
      font-size: 1.75rem;
      color: $color-text-primary;
      margin-bottom: 16px;
      
      @include respond-to(tablet) {
        font-size: 1.4rem;
      }
    }
    
    p {
      max-width: 600px;
      margin: 0 auto 24px;
      color: $color-text-secondary;
      line-height: 1.8;
    }
  }
  
  .volunteer-btn {
    @include button-primary;
    font-size: 1.1rem;
    padding: 14px 36px;
  }
}
</style>
