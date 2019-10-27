<template>
  <b-row>
    <b-col sm="12" class="mb-5">
      <b-card header-bg-variant="success" v-if="doing.length">
        <template v-slot:header>
          <h4 class="mb-0 text-white">Backlog</h4>
        </template>
        <b-list-group class="list-group-flush">
          <TodoItem
            v-for="(todo, index) in doing"
            :displayAgo="displayAgo"
            :todoIsDone="todoIsDone"
            :deleteTodo="deleteTodo"
            :key="todo.id"
            :todo="todo"
            :index="index">
          </TodoItem>
        </b-list-group>
      </b-card>
        <p v-if="!doing.length" class="display-5 text-muted text-center m-3">Congrats you have no backlog!</p>
    </b-col>

    <b-col sm="12" class="mb-5">
      <b-card header-bg-variant="secondary" v-if="completed.length">
        <template v-slot:header>
          <h4 class="mb-0 text-white">Completed</h4>
        </template>
        <b-list-group class="list-group-flush" v-if="completed.length">
          <TodoItem
            v-for="(todo, index) in completed"
            :displayAgo="displayAgo"
            :todoIsDone="todoIsDone"
            :deleteTodo="deleteTodo"
            :key="todo.id"
            :todo="todo"
            :index="index">
          </TodoItem>
        </b-list-group>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'

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
      todos: state => state.todos.all,
    }),
    ...mapGetters('todos', ['doing', 'completed'])
  },
  mounted () {
    this.$store.dispatch('todos/getTodos')
  }
}
</script>

<style scoped>
.card-body {
  padding: 0;
}
</style>