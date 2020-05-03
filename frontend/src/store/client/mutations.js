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
  state.sheets = [...state.sheets, sheet]
}

export function removeSheet (state, sheet) {

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

  const sindex = state.sheets.findIndex(s => s.id === state.sheet.id)
  state.sheet.ongoing += -1

  state.sheets.splice(sindex, 1, { ...state.sheet })

  state.todo = null
}

export function updateTodo (state, todo) {
  const tindex = state.todos.findIndex(t => t.id === todo.id)
  const oldTodo = state.todos[tindex]
  state.todos.splice(tindex, 1, { ...todo })

  const sindex = state.sheets.findIndex(s => s.id === state.sheet.id)

  if (oldTodo.status !== todo.status) {
    state.sheet.ongoing += todo.status === 0 ? 1 : -1
  }

  state.sheets.splice(sindex, 1, { ...state.sheet })

  state.todo = todo
}
