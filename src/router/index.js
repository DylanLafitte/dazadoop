import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import CommissionsPage from '../pages/CommissionsPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import TosPage from '../pages/TosPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/commissions', component: CommissionsPage },
  { path: '/contact', component: ContactPage },
  { path: '/tos', component: TosPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
