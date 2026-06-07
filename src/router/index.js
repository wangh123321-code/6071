import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页 - 喵星之家' }
  },
  {
    path: '/cats',
    name: 'Cats',
    component: () => import('@/views/CatsView.vue'),
    meta: { title: '猫咪列表 - 喵星之家' }
  },
  {
    path: '/cat/:id',
    name: 'CatDetail',
    component: () => import('@/views/CatDetailView.vue'),
    meta: { title: '猫咪详情 - 喵星之家' }
  },
  {
    path: '/questionnaire',
    name: 'Questionnaire',
    component: () => import('@/views/QuestionnaireView.vue'),
    meta: { title: '领养问卷 - 喵星之家' }
  },
  {
    path: '/match-result',
    name: 'MatchResult',
    component: () => import('@/views/MatchResultView.vue'),
    meta: { title: '匹配结果 - 喵星之家' }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/FavoritesView.vue'),
    meta: { title: '我的收藏 - 喵星之家' }
  },
  {
    path: '/my-applications',
    name: 'MyApplications',
    component: () => import('@/views/MyApplicationsView.vue'),
    meta: { title: '我的申请 - 喵星之家' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于我们 - 喵星之家' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面未找到 - 喵星之家' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title || '喵星之家'
  next()
})

export default router
