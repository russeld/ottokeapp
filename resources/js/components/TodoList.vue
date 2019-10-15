<template>
  <b-row>
    <b-col sm="12">
      <b-list-group>
        <TodoItem
          v-for="(todo, index) in todos"
          :displayAgo="displayAgo"
          :todoIsDone="todoIsDone"
          :deleteTodo="deleteTodo"
          :key="todo.id"
          :todo="todo"
          :index="index">
        </TodoItem>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

import TodoItem from "./TodoItem"

export default {
  components: {
    TodoItem
  },
  methods: {
    displayAgo: function(date) {
      return moment.utc(date).fromNow()
    },
    ...mapActions('todos', ['todoIsDone', 'deleteTodo'])
  },
  computed: {
    ...mapState({
      todos: state => state.todos.all
    })
  },
  mounted () {
    this.$store.dispatch('todos/getTodos')
  }
}
</script>