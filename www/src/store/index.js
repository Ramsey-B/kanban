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
    login({dispatch, commit}, payload) {
      server.post('/login', payload)
       .then(user => {
        commit('setUser', user)
       })
    },
    register({dispatch, commit}, payload) {
      server.post('/register', payload) 
       .then(newUser => {
         commit('setUser', newUser)
       })
    }
  }
})