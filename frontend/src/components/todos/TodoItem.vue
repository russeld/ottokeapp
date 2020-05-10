<template>
  <q-item :clickable="clickable" ripple class="q-pa-sm text-weight-medium bg-white" @click="onClick">
    <q-item-section side>
      <q-checkbox v-model="val" :val="todo.id" color="green" @input="updateInput" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strike': todo.status === 1 }">{{ todo.title }}</q-item-label>
      <q-item-label caption v-if="showDueDate">
        <span v-if="todo.due_date" :class="{'text-primary': (!todo.is_overdue && todo.status !== 1), 'text-warning': (todo.is_overdue && todo.status !== 1)}" class="flex align-center q-gutter-x-sm">
          <q-icon name="calendar_today" />
          <span>Due on {{ formatDueDate() }}</span>
        </span>
        <span v-if="todo.is_myday" class="text-green-5">
          <q-icon flat name="wb_sunny"/> My Day
        </span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

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
    },
    showDueDate: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    todo (todo) {
      this.val = todo.status === 1
    }
  },

  methods: {
    ...mapActions({
      updateTodo: 'client/updateTodo',
      getSheets: 'client/getSheets'
    }),
    updateInput () {
      const todo = { ...this.todo, status: this.val ? 1 : 0 }
      this.updateTodo(todo)
    },
    onClick () {
      this.$store.commit('client/setTodo', this.todo)
    },
    formatDueDate () {
      return moment(this.todo.due_date, 'YYYY-MM-DD').format('ddd, MMMM D')
    }
  },

  mounted () {
    this.val = this.todo.status === 1
  }
}
</script>
