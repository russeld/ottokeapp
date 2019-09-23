<template>
  <b-row>
    <b-col sm="12" class="mb-5">
      <b-form-input
        v-model="text"
        @keyup.enter="addTodo(text)" size="lg">
      </b-form-input>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    text: {
      get() {
        return this.$store.state.todos.text
      },
      set (value) {
        this.$store.commit('todos/updateText', value)
      }
    }
  },
  methods: mapActions('todos', [
    'addTodo'
  ])
}
</script>