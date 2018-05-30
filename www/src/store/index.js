import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

vue.use(vuex)

var server = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ dispatch, commit }, payload) {
      server.post('/login', payload)
        .then(user => {
          router.push('/')
          commit('setUser', user)
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    register({ dispatch, commit }, payload) {
      server.post('/register', payload)
        .then(newUser => {
          router.push('/')
          commit('setUser', newUser)
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    authenticate({ commit, dispatch }) {
      server.get('/authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
        .catch(res => {
          console.log(res.data)
        })
    }
  })