<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <div>
        <p class="text-h5 q-ma-none text-blue-7">Tasks</p>
      </div>

      <todo-input :text="text" v-on:submit="onSubmit"/>

      <q-list separator bordered v-if="hasTodos">
        <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TodoItem from '@/components/todos/TodoItem'
import TodoInput from '@/components/todos/TodoInput'

export default {
  name: 'task-page',

  data () {
    return {
      text: null,
      borderless: true,
      query: {
        search: ''
      }
    }
  },

  computed: {
    ...mapState({
      todos: s => s.client.todos
    }),
    hasTodos () {
      return (this.todos.length > 0)
    }
  },

  components: {
    TodoInput,
    TodoItem
  },

  methods: {
    ...mapActions({
      getTasks: 'client/getTasks',
      createTask: 'client/createTask'
    }),
    onSubmit (text) {
      if (!text) {
        return
      }

      this.createTask(text)
        .then(response => { text = '' })
        .then(() => this.getTasks())
    }
  },

  mounted () {
    this.getTasks()
  }
}
</script>
