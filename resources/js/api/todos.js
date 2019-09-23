
export default {
  fetchTodoList (cb) {
    fetch('/api/todos')
    .then((response) => {
      return response.json()
    }).then((json) => {
      cb(json)
    }).catch((error) => {
      console.log(error)
    })
  }
}