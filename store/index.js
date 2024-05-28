import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    LOGOUT(state) {
      state.user = null
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        const token = response.data.token
        const user = response.data.user
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        console.error('Error logging in:', error)
        throw error
      }
    },
    async register({ commit }, userData) {
      try {
        await axios.post('/api/register', userData)
      } catch (error) {
        console.error('Error registering:', error)
        throw error
      }
    },
    logout({ commit }) {
      commit('LOGOUT')
      delete axios.defaults.headers.common['Authorization']
    },
    async fetchUser({ commit, state }) {
      if (state.token) {
        try {
          const response = await axios.get('/api/user')
          commit('SET_USER', response.data)
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user
  }
})

export default store
