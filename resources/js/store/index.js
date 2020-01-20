import Vue from 'vue'
import Vuex from 'vuex'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle)

import todos from './modules/todos'
import client from './modules/client'
import sheets from './modules/sheets'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    client,
    sheets,
    todos
  },
  strict: debug
})