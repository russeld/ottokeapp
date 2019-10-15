<template>
  <b-list-group-item  href="#" class="d-flex justify-content-between align-items-center">
    <b-col sm="10">
      <h1 class="display-5" v-if="todo.status == 0">{{ todo.title }}</h1>
      <h1 class="display-5 text-muted" v-else>{{ todo.title }}</h1>
      <small class="text-muted">{{ displayAgo(todo.created_at) }}</small>
    </b-col>
    <b-col class="d-flex flex-row-reverse" id="action-container" sm="2">
      <b-button pill variant="outline-danger" @click="deleteTodo(todo)">
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button pill variant="outline-success" @click="todoIsDone(todo)" v-if="todo.status == 0">
        <small><font-awesome-icon icon="check" /></small>
      </b-button>
      <b-button pill variant="outline-secondary" v-else :disabled="!todo.status">
        <small><font-awesome-icon icon="check" /></small>
      </b-button>
    </b-col>
  </b-list-group-item>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    todo: {
      type: Object
    },
    displayAgo: {
      type: Function
    },
    todoIsDone: {
      type: Function
    },
    deleteTodo: {
      type: Function
    }
  }
}
</script>

<style scoped>
#action-container button {
  margin-left: 10px;
}
</style>