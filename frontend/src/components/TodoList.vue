<template>
  <q-card-section class="q-pa-none">
    <q-list separator bordered>
      <q-item
        clickable
        class="q-pa-md text-weight-medium bg-white"
        v-for="todo in todos"
        :key="todo.id">
          <q-item-section side>
            <q-radio v-model="selectedTodo" :val="todo.id"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ todo.title }}</q-item-label>
          </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'todo-list',

  props: {
    todos: {
      type: Array
    }
  },

  data () {
    return {
      selectedTodo: null
    }
  },

  methods: {
    ...mapActions({
      updateTodo: 'client/updateTodo',
      deleteTodo: 'client/deleteTodo'
    }),
    createdFromNow (date) {
      return moment(date).fromNow()
    },
    onDelete (todo) {
      this.deleteTodo(todo)
    },
    onClickDone (todo) {
      this.updateTodo({ ...todo, status: !todo.status })
    }
  }
}
</script>
