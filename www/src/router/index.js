import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Home from '@/components/Home'
import Lists from '@/components/Lists'
import Tasks from '@/components/Tasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'User',
      component: User
    },
    {
      path: '/board/:id',
      name: 'Lists',
      component: Lists
    },
    {
      path: '/list/:listId',
      name: 'Tasks',
      component: Tasks
    }
  ]
})
