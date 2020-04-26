<template>
  <q-page padding>
    <div v-if="sheet" class="q-gutter-md">
      <div class="text-weight-medium text-blue-7">
        {{ sheet.name }}
        <q-icon size="sm" name="more_vert" />
      </div>

      <q-input outlined square placeholder="Add a task" v-model.trim="text" @keypress.enter="onSubmit">
        <template v-slot:prepend>
          <q-icon name="add" />
        </template>
      </q-input>

      <q-list separator bordered v-if="hasTodos" class="">
        <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TodoItem from '@/components/todos/TodoItem'

export default {
  name: 'sheet-index',

  data () {
    return {
      text: null
    }
  },

  computed: {
    ...mapState({
      uuid: s => s.client.uuid,
      todos: s => s.client.todos,
      sheet: s => s.client.sheet
    }),
    sheetId () {
      return this.$route.params.id
    },
    hasTodos () {
      return (this.todos.length > 0)
    }
  },

  components: {
    TodoItem
  },

  watch: {
    '$route.params.id': {
      handler: function (id) {
        this.getSheet(id)
        this.getTodos(id)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    ...mapActions({
      getTodos: 'client/getTodos',
      getSheet: 'client/getSheet',
      createTodo: 'client/createTodo'
    }),

    onSubmit () {
      if (!this.text) {
        return
      }

      this.createTodo(this.text).then(response => { this.text = '' })
    }
  },

  mounted () {
    this.getSheet(this.sheetId)
    this.getTodos(this.sheetId)
  }
}
</script>
