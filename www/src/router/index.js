import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'User',
      component: User
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
