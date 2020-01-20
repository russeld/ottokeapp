import axios from 'axios';

const state = {
  todos: [],
  todo: null
}

const getters = {
}

const mutations = {
  listTodos(state, todos) {
    state.todos = [...todos]
  },
  updateTodo(state, todo) {
    var index = state.todos.findIndex(t => t.id == todo.id)

    var todos = [ ...state.todos ]
    todos[index] = todo;
    state.todos = [ ...todos ]
  },
  addTodo(state, todo) {
    state.todos = [ todo, ...state.todos ]
  },
  deleteTodo(state, todo) {
    var todos = state.todos.filter(t => t.id != todo.id)
    state.todos = [ ...todos ]
  },
}

const actions = {
  getTodos({ commit }, payload) {
    var { uuid, sheetId } = payload

    axios
      .get(`/api/clients/${uuid}/sheets/${sheetId}/todos`)
      .then(res => commit('listTodos', res.data))
      .catch(err => console.log(err))
  },
  updateTodo({ commit }, payload) {
    var { todo, sheetId, uuid } = payload

    axios
      .put(`/api/clients/${uuid}/sheets/${sheetId}/todos/${todo.id}`, todo)
      .then(res => commit('updateTodo', res.data))
      .catch(err => console.log(err))
  },
  addTodo({ commit }, payload) {
    var { uuid, sheetId, title } = payload

    axios
      .post(`/api/clients/${uuid}/sheets/${sheetId}/todos`, { title: title })
      .then(res => commit('addTodo', res.data))
      .catch(err => console.log(err))
  },
  deleteTodo({ commit }, payload) {
    var { todo, sheetId, uuid } = payload

    axios
      .delete(`/api/clients/${uuid}/sheets/${sheetId}/todos/${todo.id}`)
      .then(res => commit('deleteTodo', todo))
      .catch(err => console.log(err))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}