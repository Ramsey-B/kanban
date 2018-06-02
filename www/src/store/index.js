import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//kanban-ramsey-maddy.herokuapp.com/' : '//localhost:3000/';

vue.use(vuex)

var server = axios.create({
  baseURL: baseUrl,
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
    },
    updateLists(state, id) {
      var index = state.activeBoard.lists.findIndex(list => {
        return list._id == id
      })
      state.activeBoard.lists.splice(index, 1)
    },
    updateTasks(state, task) {
      var listIndex = state.activeBoard.lists.findIndex(list => {
        return list._id == task.listId
      })
      var index = state.activeBoard.lists[listIndex].tasks.findIndex(task => {
        return task._id == task._id
      })
      state.activeBoard.lists[listIndex].tasks.splice(index, 1)
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
    },
    deleteList({dispatch, commit, state}, id) {
      server.delete('/board/'+state.activeBoard._id+'/list/'+id)
       .then(res => {
         commit('updateLists', id)
       })
       .catch(err => {
         console.log(err)
       })
    },
    deleteTask({dispatch, commit, state}, task) {
      server.delete('/board/'+state.activeBoard._id+'/list/'+task.listId+'/task/' + task._id)
       .then(res => {
         commit('updateTasks', task)
       })
       .catch(err => {
         console.log(err)
       })
    },
    editBoard({dispatch, commit, state}, edit) {
      var index = state.boards.findIndex(board => {
        return board._id == edit._id
      })
      state.boards.splice(index, 1)
      server.put('/board/' +edit._id, edit)
       .then(res => {
         commit('setBoard', res.data)
       })
       .catch(err => {
        console.log(err)
      })
    },
    editList({dispatch, commit, state}, edit){
      var index = state.activeBoard.lists.findIndex(list => {
        return list._id == edit._id
      })
      edit['tasks'] = state.activeBoard.lists[index].tasks
      state.activeBoard.lists.splice(index, 1)
      edit['author'] = state.user.displayName
      var date = new Date()
      edit['created'] = date.getTime()
      state.activeBoard.lists.unshift(edit)
      dispatch('editBoard', state.activeBoard)
    },
    editTask({dispatch, commit, state}, edit) {
      var listIndex = state.activeBoard.lists.findIndex(list => {
        return list._id == edit.listId
      })
      var index = state.activeBoard.lists[listIndex].tasks.findIndex(task => {
        return task._id == edit._id
      })
      state.activeBoard.lists[listIndex].tasks.splice(index, 1)
      edit['author'] = state.user.displayName
      var date = new Date()
      edit['created'] = date.getTime()
      state.activeBoard.lists[listIndex].tasks.unshift(edit)
      dispatch('editBoard', state.activeBoard)
    },
    moveTask({dispatch, commit, state}, task) {
      debugger
      var startIndex = state.activeBoard.lists.findIndex(list => {
        return task.startList == list._id
      })
      var endIndex = state.activeBoard.lists.findIndex(list => {
        return task.endList == list._id
      })
      var startList = state.activeBoard.lists[startIndex]
      var endList = state.activeBoard.lists[endIndex]
      var taskIndex = startList.tasks.findIndex(startTask => {
        return startTask._id == task.task._id
      })
      state.activeBoard.lists[startIndex].tasks.splice(taskIndex, 1)
      state.activeBoard.lists[endIndex].tasks.unshift(task.task)
      dispatch('editBoard', state.activeBoard)
    }
  }
})