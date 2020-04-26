<template>
  <q-item clickable ripple class="q-pa-md text-weight-medium bg-white">
    <q-item-section side>
      <q-checkbox v-model="val" :val="todo.id" color="green" @input="updateInput" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strike': todo.status === 1 }">{{ todo.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'todo-item',
  data () {
    return {
      val: true
    }
  },

  props: {
    todo: {
      type: Object
    }
  },

  methods: {
    ...mapActions({
      updateTodo: 'client/updateTodo'
    }),
    updateInput () {
      const todo = { ...this.todo, status: this.val ? 1 : 0 }
      this.updateTodo(todo)
    }
  },

  mounted () {
    this.val = this.todo.status === 1
  }
}
</script>
