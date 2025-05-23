import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import PortfolioPage from '../pages/PortfolioPage.vue'
import CommissionsPage from '../pages/CommissionsPage.vue'
import ContactPage from '../pages/ContactPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/portfolio', component: PortfolioPage },
  { path: '/commissions', component: CommissionsPage },
  { path: '/contact', component: ContactPage },
]

const router = createRouter({
  history: createWebHashHistory('/dazadoop/'),
  routes
})

export default router