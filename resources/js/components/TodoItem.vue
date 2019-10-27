<template>
  <b-list-group-item class="d-flex justify-content-between align-items-center">
    <b-col sm="10">
      <h2 class="display-5" v-bind:class="{'text-muted': todo.status}">{{ todo.title }}</h2>
      <small class="text-muted" v-if="todo.status == 0">Added {{ displayAgo(todo.created_at) }}</small>
      <small class="text-muted" v-if="todo.status != 0">Completed {{ displayAgo(todo.updated) }}</small>
    </b-col>
    <b-col class="d-flex flex-row-reverse" id="action-container" sm="2">
      <b-button pill variant="outline-danger" @click="deleteTodo(todo)">
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button pill variant="outline-success" @click="todoIsDone(todo)" v-if="todo.status == 0">
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