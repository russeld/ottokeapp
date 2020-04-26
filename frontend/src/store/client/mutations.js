export function setUuid (state, uuid) {
  state.uuid = uuid
}

export function setActiveSheetId (state, sheetId) {
  state.activeSheetId = sheetId
}

export function setSheets (state, sheets) {
  state.sheets = sheets
}

export function setSheet (state, sheet) {
  state.sheet = sheet
}

export function addSheet (state, sheet) {
  state.sheets = state.sheets.push(sheet)
}

export function removeSheet (state, sheet) {

}

export function addTodo (state, todo) {
  state.todos.unshift(todo)
}

export function setTodos (state, todos) {
  state.todos = todos
}

export function deleteTodo (state, todo) {
  const index = state.todos.findIndex(t => t.id === todo.id)
  state.todos.splice(index, 1)
}

export function updateTodo (state, todo) {
  const index = state.todos.findIndex(t => t.id === todo.id)
  state.todos.splice(index, 1, { ...todo })
}
