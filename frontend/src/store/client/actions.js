import axios from 'axios'
import { LocalStorage } from 'quasar'
import { randomString } from '@/utils/strings'

export async function checkClientUuid ({ commit }) {
  let uuid = LocalStorage.getItem('uuid')

  if (!uuid) {
    uuid = randomString(255)
    await axios.post('/clients', { uuid })
      .then(response => {
        LocalStorage.set('uuid', uuid)
        commit('setUuid', uuid)
      })
      .catch(err => console.log(err))
  } else {
    commit('setUuid', uuid)
  }
}

export async function getSheets ({
  commit,
  state
}) {
  const response = await axios.get(`/clients/${state.uuid}/sheets`)
  commit('setSheets', response.data)
}

export async function getSheet ({
  commit,
  state
}, sheetId) {
  const response = await axios.get(`/clients/${state.uuid}/sheets/${sheetId}`)
  commit('setSheet', response.data)
}

export async function createSheet ({ commit, state }, text) {
  const data = {
    name: text
  }
  const response = await axios.post(`/clients/${state.uuid}/sheets`, data)
  commit('addSheet', response.data)
}

export async function deleteSheet ({ commit, state }, sheet) {
  await axios.delete(`clients/${state.uuid}/sheets/${state.sheet.id}/`)
  commit('removeSheet', sheet)
}

export async function updateSheet ({ commit, state }, sheet) {
  const response = await axios.put(`clients/${state.uuid}/sheets/${state.sheet.id}/`, sheet)
  commit('updateSheet', response.data)
}

export async function getTodos ({ commit, state }, query) {
  const response = await axios.get(`clients/${state.uuid}/sheets/${state.sheet.id}/todos`, { params: query })
  commit('setTodos', response.data)
}

export async function createTask ({ commit, state }, text) {
  const data = {
    title: text
  }
  const response = await axios.post(`clients/${state.uuid}/todos`, data)
  commit('addTodo', response.data)
  return response
}

export async function getTasks ({ commit, state }, text) {
  const response = await axios.get(`clients/${state.uuid}/todos`)
  commit('setTodos', response.data)
  return response
}

export async function createTodo ({ commit, state }, text) {
  const data = {
    title: text
  }
  const response = await axios.post(`clients/${state.uuid}/sheets/${state.sheet.id}/todos`, data)
  commit('addTodo', response.data)
  return response
}

export async function getMyDay ({ commit, state }) {
  const response = await axios.get(`clients/${state.uuid}/day`)
  commit('setTodos', response.data)
}

export async function createMyDay ({ commit, state }, text) {
  const data = {
    title: text
  }
  const response = await axios.post(`clients/${state.uuid}/day`, data)
  commit('addTodo', response.data)
  return response
}

export async function addToMyDay ({ commit, state }, todoId) {
  const response = await axios.put(`clients/${state.uuid}/day/${todoId}`)
  commit('updateTodo', response.data)
  return response
}

export async function removeFromMyDay ({ commit, state }, todoId) {
  const response = await axios.delete(`clients/${state.uuid}/day/${todoId}`)
  commit('setTodo', response.data)
  return response
}

export async function deleteTodo ({ commit, state }, todo) {
  await axios.delete(`clients/${state.uuid}/todos/${todo.id}`)
  commit('deleteTodo', todo)
}

export async function updateTodo ({ commit, state }, todo) {
  const response = await axios.put(`clients/${state.uuid}/todos/${todo.id}`, todo)
  commit('updateTodo', response.data)
}
