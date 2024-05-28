import '/src/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '/src/router.js'
import store from '/store/index.js'
import axios from '/store/axios.js'

const app = createApp(App)

app.use(store)
app.use(router)
app.config.globalProperties.$axios = axios

store.dispatch('fetchUser')

app.mount('#app')
