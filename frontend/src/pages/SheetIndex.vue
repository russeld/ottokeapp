<template>
  <div>
    <sheet-list-drawer />

    <todo-item-drawer />

    <q-page-container>
      <q-page padding>
        <div v-if="sheet" class="q-gutter-md">
          <div class="text-weight-medium text-blue-7">
            {{ sheet.name }}
            <q-icon size="sm" name="more_vert" />
          </div>

          <todo-input />

          <q-list separator bordered v-if="hasTodos" class="">
            <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
          </q-list>
        </div>
      </q-page>
    </q-page-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SheetListDrawer from '@/components/sheets/SheetListDrawer'
import TodoItemDrawer from '@/components/todos/TodoItemDrawer'
import TodoItem from '@/components/todos/TodoItem'
import TodoInput from '@/components/todos/TodoInput'

export default {
  name: 'sheet-index',

  data () {
    return {
      text: null
    }
  },

  computed: {
    ...mapState({
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
    TodoItem,
    TodoInput,
    TodoItemDrawer,
    SheetListDrawer
  },

  watch: {
    '$route.params.id': {
      handler: function (id) {
        this.getSheet(id)
        this.getTodos(id)
        this.$store.commit('client/setTodo', null)
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
    this.$store.commit('client/setTodo', null)
  }
}
</script>
