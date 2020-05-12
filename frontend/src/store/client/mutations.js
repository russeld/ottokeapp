export function setUuid (state, uuid) {
  state.uuid = uuid
}

export function setActiveSheetId (state, sheetId) {
  state.activeSheetId = sheetId
}

export function setSheets (state, sheets) {
  state.sheets = [...sheets]
}

export function setSheet (state, sheet) {
  state.sheet = sheet
}

export function addSheet (state, sheet) {
  state.sheets = [...state.sheets, sheet]
}

export function updateSheet (state, sheet) {
  const sindex = state.sheets.findIndex(s => s.id === sheet.id)
  state.sheets.splice(sindex, 1, { ...sheet })
  state.sheet = { ...sheet }
}

export function removeSheet (state, sheet) {
  const sindex = state.sheets.findIndex(s => s.id === sheet.id)
  state.sheets.splice(sindex, 1)
  state.sheet = null
  state.todos = []
}

export function setTodo (state, todo) {
  state.todo = todo
}

export function addTodo (state, todo) {
  state.todos.unshift(todo)
}

export function setTodos (state, todos) {
  state.todos = todos
}

export function deleteTodo (state, todo) {
  const tindex = state.todos.findIndex(t => t.id === todo.id)
  state.todos.splice(tindex, 1)

  state.todo = null
}

export function updateTodo (state, todo) {
  const tindex = state.todos.findIndex(t => t.id === todo.id)
  state.todos.splice(tindex, 1, { ...todo })
  state.todo = todo
}
