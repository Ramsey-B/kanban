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
    user: {},
    boards: [],
    activeBoard: {},
    activeList: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, items) {
      state.boards = items
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setActiveList(state, list) {
      state.activeList = list
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
          router.push('/')
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    getBoards({commit, dispatch}) {
      server.get('/boards')
       .then(res => {
         commit('setBoards', res.data)
       })
       .catch(res => {
        console.log(res.data)
      })
    },
    selectBoard({commit, dispatch, state}, id) {
      var index = state.boards.findIndex(board => {
        return board._id == id
      })
      var activeBoard = state.boards[index]
      commit('setActiveBoard', activeBoard)
    },
    selectList({commit, dispatch, state}, id) {
      var index = state.activeBoard.lists.findIndex(list => {
        return list._id == id
      })
      var activeList = state.activeBoard.lists[index]
      commit('setActiveList', activeList)
    }
  }
})