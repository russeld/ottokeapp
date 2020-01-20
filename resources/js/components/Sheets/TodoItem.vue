<template>
  <b-list-group-item>
    <div class="row">
      <div class="col-md-6">
        <div class="custom-control custom-checkbox mr-sm-2">
          <input type="checkbox" class="custom-control-input" :id="todo.id" :checked="todo.status" @change="handleCheckboxChange">
          <label class="custom-control-label" :class="{ done: todo.status }" :for="todo.id">{{ todo.title }}</label>
        </div>
      </div>
      <div class="col-md-6 text-right">
        <b-button size="sm" variant="danger" @click="handleDelete(todo)">
          <font-awesome-icon icon="trash" size="sm" />
        </b-button>
      </div>
    </div>
    <div class="row">
        <div class="col-md-6">
          <span class="ml-4 small">{{ toAgo(todo.created_at) }}</span>
        </div>
    </div>
  </b-list-group-item>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'TodoItem',
  props: ['todo', 'sheetId'],
  computed: {
    ...mapState('sheets', ['sheet']),
    ...mapState('todos', ['todos']),
    ...mapState('client', ['uuid'])
  },
  methods: {
    ...mapActions({
      'updateTodo': 'todos/updateTodo',
      'deleteTodo': 'todos/deleteTodo'
    }),
    toAgo(date) {
      return moment.utc(date).fromNow()
    },
    handleCheckboxChange() {
      var todo = { ...this.todo }
      todo.status = !todo.status

      var payload = {
        uuid: this.uuid,
        sheetId: this.sheetId,
        todo: todo
      }

      this.updateTodo(payload)
    },
    handleDelete(todo) {
      var payload = {
        uuid: this.uuid,
        sheetId: this.sheetId,
        todo: todo
      }
      this.deleteTodo(payload)
    }
  }
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>