import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import Roofs from './pages/Roofs.vue'
import About from './pages/About.vue'
import Partners from './pages/Partners.vue'
import Customers from './pages/Customers.vue'
import Documents from './pages/Documents.vue'
import Contacts from './pages/Contacts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomePage
    },
    {
      path: '/roofs',
      name: 'roofs',
      component: Roofs
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/partners',
      name: 'partners',
      component: Partners
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    }
  ]
})

export default router
