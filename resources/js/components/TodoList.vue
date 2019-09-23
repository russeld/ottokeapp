<template>
  <b-row>
    <b-col sm="12">
      <b-list-group>
          <b-list-group-item v-for="todo in todos" v-bind:key="todo.id" href="#" class="d-flex justify-content-between align-items-center">
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
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    displayAgo: function(date) {
      return moment.utc(date).fromNow()
    },
    ...mapActions('todos', ['todoIsDone', 'deleteTodo'])
  },
  computed: {
    ...mapState({
      todos: state => state.todos.all
    })
  },
  mounted () {
    this.$store.dispatch('todos/getTodos')
  }
}
</script>

<style scoped>
#action-container button {
  margin-left: 10px;
}
</style>