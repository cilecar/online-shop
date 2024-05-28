import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import Roofs from './pages/Roofs.vue'
import About from './pages/About.vue'
import Partners from './pages/Partners.vue'
import Customers from './pages/Customers.vue'
import Documents from './pages/Documents.vue'
import Contacts from './pages/Contacts.vue'
import ItemPage from './pages/ItemPage.vue'
import Login from './pages/Login.vue'
import Register from "./pages/Register.vue"
import store from "/store"
import Profile from "./pages/Profile.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '', name: 'home', component: HomePage },
    { path: '/roofs', name: 'roofs', component: Roofs },
    { path: '/item/:id', name: 'ItemPage', component: ItemPage },
    { path: '/about', name: 'about', component: About },
    { path: '/partners', name: 'partners', component: Partners },
    { path: '/customers', name: 'customers', component: Customers },
    { path: '/documents', name: 'documents', component: Documents },
    { path: '/contacts', name: 'contacts', component: Contacts },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile },
    { 
      path: '/protected', 
      name: 'Protected', 
      component: () => import('./pages/Protected.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next('/login')
        } else {
          next()
        }
      }
    }
  ]
})

export default router
