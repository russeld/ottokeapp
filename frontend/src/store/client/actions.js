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

export async function deleteSheet ({ commit }, sheetId) {

}

export async function updateSheet ({ commit }, uuid) {

}

export async function getTodos ({ commit, state }, sheetId) {
  const response = await axios.get(`clients/${state.uuid}/sheets/${sheetId}/todos`)
  commit('setTodos', response.data)
}

export async function createTodo ({ commit, state }, text) {
  const data = {
    title: text
  }
  const response = await axios.post(`clients/${state.uuid}/sheets/${state.sheet.id}/todos`, data)
  commit('addTodo', response.data)
}

export async function deleteTodo ({ commit, state }, todo) {
  await axios.delete(`clients/${state.uuid}/sheets/${state.sheet.id}/todos/${todo.id}`, todo)
  commit('deleteTodo', todo)
}

export async function updateTodo ({ commit, state }, todo) {
  const response = await axios.put(`clients/${state.uuid}/sheets/${state.sheet.id}/todos/${todo.id}`, todo)
  commit('updateTodo', response.data)
}
