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
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, items) {
      var sortedBoards = items.sort((board1, board2) => {
        return board2.created - board1.created
      })
      state.boards = sortedBoards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setBoard(state, board) {
      state.boards.unshift(board)
    },
    updateBoards(state, id) {
      var index = state.boards.findIndex(board => {
        return board._id == id
      })
      state.boards.splice(index, 1)
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
          commit('setUser', res.data.data)
          router.push('/')
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    getBoards({ commit, dispatch }) {
      server.get('/boards')
        .then(res => {
          commit('setBoards', res.data)
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    selectBoard({ commit, dispatch, state }, id) {
      var index = state.boards.findIndex(board => {
        return board._id == id
      })
      var activeBoard = state.boards[index]
      commit('setActiveBoard', activeBoard)
    },
    selectList({ commit, dispatch, state }, id) {
      var index = state.activeBoard.lists.findIndex(list => {
        return list._id == id
      })
      var activeList = state.activeBoard.lists[index]
      commit('setActiveList', activeList)
    },
    signOut({ commit, dispatch, state }) {
      server.delete('/logout')
        .then(res => {
          commit('setUser', {})
          router.push({ name: 'User' })
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    addBoard({dispatch, commit, state}, board) {
      board['author'] = state.user.displayName
      var date = new Date()
      board['created'] = date.getTime()
      server.post('/board', board)
      .then(res => {
        commit('setBoard', res.data)
       })
       .catch(err => {
        console.log(err)
      })
    },
    addTask({dispatch, commit, state}, task) {
      task['author'] = state.user.displayName
      var date = new Date()
      task['created'] = date.getTime()
      server.put('/board/' +state.activeBoard._id+'/list/'+task.listId+'/task/', task) 
       .then(res => {
         commit('setActiveBoard', res.data)
       })
       .catch(err => {
        console.log(err)
      })
    },
    addList({dispatch, commit, state}, list) {
      list['author'] = state.user.displayName
      var date = new Date()
      list['created'] = date.getTime()
      server.put('/board/'+state.activeBoard._id+'/list/', list) 
       .then(res => {
         commit('setActiveBoard', res.data)
       })
       .catch(err => {
        console.log(err)
      })
    },
    deleteBoard({dispatch, commit}, id) {
      server.delete('/board/'+id)
       .then(res => {
         commit('updateBoards', id)
       })
       .catch(err => {
         console.log(err)
       })
    }
  }
})