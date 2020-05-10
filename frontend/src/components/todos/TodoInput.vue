<template>
  <q-input outlined square placeholder="Add a task" v-bind:value="text" @keypress.enter="$emit('submit', $event.target.value)">
    <template v-slot:prepend>
      <q-icon name="add" />
    </template>
  </q-input>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'todo-input',

  props: {
    text: {
      type: String
    }
  },

  data () {
    return {

    }
  },

  methods: {
    ...mapActions({
      getSheet: 'client/getSheet',
      createTodo: 'client/createTodo',
      getSheets: 'client/getSheets'
    })
  }
}
</script>
