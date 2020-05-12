<template>
  <q-page padding>
    <div v-if="sheet" class="q-gutter-y-md">
      <div class="row text-weight-medium text-blue-7 flex align-center justify-between">
        <div class="col-2 flex items-center">
          <p class="text-h5 q-ma-none">{{ text }}</p>
          <q-popup-edit v-model="text" @save="updateSheetName" buttons>
            <q-input v-model="text" dense autofocus>
              <template v-slot:append>
                <q-icon name="edit" />
              </template>
            </q-input>
          </q-popup-edit>
        </div>
        <div class="col-8">
          <q-input dense outlined square v-model.trim="query.search">
            <template v-slot:append>
              <q-icon v-if="query.search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="query.search = ''" />
            </template>
          </q-input>
        </div>
        <div class="col-2 flex items-center q-gutter-x-sm justify-end">
          <q-btn unelevated dense :color="sheet.hide_completed ? 'positive' : 'grey'" size="sm" icon="check_circle" @click="hide"/>
          <q-btn unelevated dense color="negative" size="sm" icon="delete" @click="confirm"/>
        </div>
      </div>

      <todo-input :text="todo" v-on:submit="onSubmit" v-on:input="onInput" />

      <q-list separator bordered v-if="hasTodos">
        <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TodoItem from '@/components/todos/TodoItem'
import TodoInput from '@/components/todos/TodoInput'

export default {
  name: 'sheet-page',

  data () {
    return {
      text: null,
      todo: 'ftest',
      borderless: true,
      query: {
        search: ''
      }
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
    TodoInput
  },

  watch: {
    '$route.params.id': {
      handler: function (id) {
        this.getSheet(this.sheetId)
          .then(() => { this.getTodos(this.query) })
          .then(() => { this.$store.commit('client/setTodo', null) })
      },
      deep: true,
      immediate: true
    },
    sheet (sheet) {
      if (sheet) {
        this.text = sheet.name
      }
    },
    'query.search' () {
      this.getTodos(this.query)
    }
  },

  methods: {
    ...mapActions({
      getTodos: 'client/getTodos',
      createTodo: 'client/createTodo',
      updateSheet: 'client/updateSheet',
      getSheet: 'client/getSheet',
      getSheets: 'client/getSheets',
      deleteSheet: 'client/deleteSheet'
    }),

    updateSheetName () {
      if (this.text === '') {
        return
      }

      const sheet = { ...this.sheet, name: this.text }
      this.updateSheet(sheet)
    },
    confirm () {
      this.$q.dialog({
        title: `Delete "${this.sheet.name}"`,
        message: 'You won\'t be able to undo this action.',
        ok: {
          color: 'negative',
          flat: true,
          label: 'Delete'
        },
        cancel: {
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.deleteSheet(this.sheet)
      })
    },
    hide () {
      const sheet = { ...this.sheet, hide_completed: this.sheet.hide_completed === 0 ? 1 : 0 }
      this.updateSheet(sheet)
        .then(() => { this.getTodos(this.sheet.id) })
    },
    onSubmit (text) {
      if (!text) {
        return
      }

      this.createTodo(text)
        .then(response => { this.todo = '' })
        .then(() => this.getSheets())
    },
    onInput (text) {
      this.todo = text
    }
  },

  mounted () {
    this.getSheet(this.sheetId)
      .then(() => { this.getTodos(this.query) })
      .then(() => { this.$store.commit('client/setTodo', null) })
  }
}
</script>
