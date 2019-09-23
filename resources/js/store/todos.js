const state = {
  all: [],
  text: ""
}

const getters = {
  pendingTodos (state) {

  }
}

const mutations = {
  setTodos (state, todos) {
    state.all = todos
  },
  addTodo (state, todo) {
    state.all.push(todo)
    state.text = ""
  },
  deleteTodo (state, todo) {
    state.all.splice(state.all.indexOf(todo), 1)
  },
  updateText (state, value) {
    state.text = value;
  },
  todoIsDone(state, todo) {
    state.all = [
      ...state.all.filter(e => e.id !== todo.id),
      todo
    ]
  },
}

const actions = {
  getTodos ({ commit }) {
    fetch('/api/todos')
    .then((response) => {
      return response.json()
    }).then((json) => {
      commit('setTodos', json)
    }).catch((error) => {
      console.log(error)
    })
  },
  addTodo ({ commit }, title) {
    console.log(title);
    fetch('/api/todos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      commit('addTodo', json)
    }).catch((error) => {
      console.log(error)
    })
  },
  todoIsDone ({ commit }, todo) {
    fetch(`/api/todos/${todo.id}/done`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json()
    }).then((json) => {
      commit('todoIsDone', json)
    }).catch((error) => {
      console.log(error)
    })
  },
  deleteTodo: function({ commit }, todo) {
    fetch(`/api/todos/${todo.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      commit('deleteTodo', todo)
    }).catch((error) => {
      console.log(error)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}