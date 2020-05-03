<template>
  <q-input outlined square placeholder="Add a task" v-model.trim="text" @keypress.enter="onSubmit">
    <template v-slot:prepend>
      <q-icon name="add" />
    </template>
  </q-input>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'todo-input',

  data () {
    return {
      text: null
    }
  },

  methods: {
    ...mapActions({
      getSheet: 'client/getSheet',
      createTodo: 'client/createTodo'
    }),
    onSubmit () {
      if (!this.text) {
        return
      }

      this.createTodo(this.text)
        .then(response => { this.text = '' })
    }
  }
}
</script>
