<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section brand">
          <div class="footer-logo">
            <img src="/cat-paw.svg" alt="logo" />
            <span>喵星之家</span>
          </div>
          <p class="slogan">用爱给每一只流浪猫一个温暖的家</p>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">327</span>
              <span class="stat-label">年救助量</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">41%</span>
              <span class="stat-label">领养率</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">∞</span>
              <span class="stat-label">爱心传递</span>
            </div>
          </div>
        </div>
        
        <div class="footer-section links">
          <h4>快速导航</h4>
          <router-link to="/cats">浏览猫咪</router-link>
          <router-link to="/questionnaire">智能匹配</router-link>
          <router-link to="/about">关于我们</router-link>
          <router-link to="/about#contact">联系我们</router-link>
        </div>
        
        <div class="footer-section contact">
          <h4>联系方式</h4>
          <p>📍 上海市浦东新区爱心路888号</p>
          <p>📞 400-888-9999</p>
          <p>📧 contact@miao-home.org</p>
          <p>🕐 周一至周日 10:00-18:00</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 喵星之家流浪猫救助站 版权所有</p>
        <p class="warm-tip">💝 领养代替购买，用爱终结流浪</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background: linear-gradient(135deg, #4A4A4A 0%, #5D5D5D 100%);
  color: white;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 32px;
  
  @include respond-to(tablet) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-section {
  h4 {
    color: $color-primary-light;
    margin-bottom: 16px;
    font-size: 1.1rem;
  }
}

.brand {
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 12px;
    
    img {
      width: 40px;
      height: 40px;
    }
  }
  
  .slogan {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 24px;
    font-size: 1rem;
  }
  
  .stats {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    min-width: 100px;
  }
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: $color-primary-light;
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 4px;
  }
}

.links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  a {
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    
    &:hover {
      color: $color-primary-light;
      padding-left: 8px;
    }
  }
}

.contact {
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 10px;
    font-size: 0.95rem;
  }
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }
  
  .warm-tip {
    color: $color-primary-light;
  }
  
  @include respond-to(mobile) {
    justify-content: center;
    text-align: center;
  }
}
</style>
