<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 text-center">
        <h2 class="mb-0 mt-2">{{ sheet.name }}</h2>
        <p class="mb-0"><small>{{ displayCreated(sheet.created_at) }}</small></p>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
              :state="titleState"
              label-for="title-input"
              invalid-feedback="Title is required">
          <b-form-input id="title-input" v-model="title" :state="titleState" class="mt-2 mb-4" placeholder="What do you need to do?" required></b-form-input>
          </b-form-group>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <b-list-group>
          <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" :sheetId="sheetId" />
        </b-list-group>
        <p v-if="todos.length == 0" class="font-weight-light text-center">You got this!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

import TodoItem from './TodoItem'

export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  data: function() {
    return {
      title: '',
      titleState: null
    }
  },
  props: ['sheetId'],
  computed: {
    ...mapState('sheets', ['sheet']),
    ...mapState('todos', ['todos']),
    ...mapState('client', ['uuid'])
  },
  methods: {
    ...mapActions({
      'addTodo': 'todos/addTodo',
      'getTodos': 'todos/getTodos',
      'updateTodo': 'todos/updateTodo',
      'setSheet': 'sheets/setSheet',
    }),
    toAgo(date) {
      return moment(date).fromNow()
    },
    displayCreated(date) {
      return moment.utc(date).format('MMM d, Y')
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.titleState = valid
      return valid
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }

      this.addTodo({ uuid:this.uuid, sheetId: this.sheetId, title: this.title})

      this.title = ''
      this.titleState = null
    }
  },
  created() {
    this.setSheet({ uuid: this.uuid, sheetId: this.sheetId })
    this.getTodos({ uuid: this.uuid, sheetId: this.sheetId })
  }
}
</script>