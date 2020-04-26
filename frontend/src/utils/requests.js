import axios from 'axios'

export function deleteTodo (payload) {
  const { uuid, sheetId, todo } = payload
  return axios.delete(`/clients/${uuid}/sheets/${sheetId}/todos/${todo.id}`)
}

export function updateTodo (payload) {
  const { uuid, sheetId, todo } = payload
  return axios.put(`/clients/${uuid}/sheets/${sheetId}/todos/${todo.id}`, todo)
}

export function createTodo (payload) {
  const { uuid, sheetId, todo } = payload
  return axios.post(`clients/${uuid}/sheets/${sheetId}/todos`, todo)
}
