<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <div>
        <p class="text-h5 q-ma-none text-blue-7">My Day</p>
        <p class="text-caption text-blue-4">{{ today }}</p>
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
import { date } from 'quasar'
import TodoItem from '@/components/todos/TodoItem'
import TodoInput from '@/components/todos/TodoInput'

export default {
  name: 'myday-page',

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
    today () {
      return date.formatDate(Date.now(), 'ddd, MMM DD, YYYY')
    },
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
      getMyDay: 'client/getMyDay',
      createMyDay: 'client/createMyDay'
    }),
    onSubmit (text) {
      if (!text) {
        return
      }

      this.createMyDay(text)
        .then(response => { text = '' })
        .then(() => this.getMyDay())
    }
  },

  mounted () {
    this.getMyDay()
  }
}
</script>
