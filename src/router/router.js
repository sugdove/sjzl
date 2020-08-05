export const routes = [
  {
    path: '/',
    name: 'link',
    // redirect: '/layout',
    component: () => import('@/views/index')

  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')

  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')

  },
  {
    path: '/promise',
    name: 'promise',
    component: () => import('@/views/promise.vue')

  },
]
