import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './layouts/Home'
import TodoList from './components/Sheets/TodoList'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sheets/:sheetId',
      name: 'todos',
      component: TodoList,
      props: true
    }
  ]
})