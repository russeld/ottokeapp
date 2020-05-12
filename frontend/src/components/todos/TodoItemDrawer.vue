<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    :width="350"
    :breakpoint="500"
    bordered
    class="fit"
    side="right"
    content-class="bg-grey-3 text-weight-medium">

    <div class="q-gutter-y-md q-pa-sm" v-if="todo">
      <q-card flat square>
        <q-card-section class="q-pa-none">
          <todo-item :todo="todo" :clickable="false" :showDueDate="false"/>
        </q-card-section>
      </q-card>

      <q-card flat square>
        <q-card-section class="q-pa-none">
          <q-list separator flat>
            <q-item>
              <q-item-section side @click="$refs.qDateProxy.show()">
                <q-icon name="calendar_today" size="sm">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model.trim="date" @input="() => updateDueDate()" square mask="YYYY-MM-DD"/>
                  </q-popup-proxy>
                </q-icon>
              </q-item-section>
              <q-item-section v-if="!todo.due_date" @click="$refs.qDateProxy.show()">Set Due Date</q-item-section>
              <q-item-section
                v-else-if="todo.status !== 1"
                :class="{'text-primary': (!todo.is_overdue && todo.status !== 1), 'text-warning': (todo.is_overdue && todo.status !== 1)}">
                  {{ todo.is_overdue ? 'Overdue since' : 'Due on' }} {{ formatDueDate() }}
              </q-item-section>
              <q-item-section v-else>
                  Due {{ formatDueDate() }}
              </q-item-section>
              <q-item-section v-if="todo.due_date" side>
                <q-icon name="close" color="negative" size="xs" @click="removeDueDate"/>
              </q-item-section>
            </q-item>
            <q-item :clickable="!todo.is_myday" @click="onClickAddToMyDay">
              <q-item-section side :class="{'text-green-5': todo.is_myday}">
                <q-icon flat name="wb_sunny"/>
              </q-item-section>
              <q-item-section :class="{'text-green-5': todo.is_myday}">
                {{ todo.is_myday ? "Added to My Day" : "Add to My Day" }}
              </q-item-section>
              <q-item-section v-if="todo.is_myday" side>
                <q-icon name="close" color="negative" size="xs" @click="clickRemoveFromMyDay"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card flat square>
        <q-input
          placeholder="Add notes"
          square
          outlined
          debounce="600"
          v-model.trim="notes"
          type="textarea"
          autogrow

          @input="updateNotes"
        />
      </q-card>

      <div class="flex justify-between items-center fixed-bottom q-pa-sm" :style="{borderTop: '1px solid #ccc'}">
        <q-btn unelevated dense icon="chevron_right" color="info" size="sm" @click="onClickHideDrawer" />
        <span class="text-weight-regular" :style="{fontSize: '12px'}" v-if="!todo.status">Created on {{ formatTime(todo.created_at) }}</span>
        <span class="text-weight-regular" :style="{fontSize: '12px'}" v-if="todo.status">Completed on {{ formatTime(todo.completed_at) }}</span>
        <q-btn unelevated dense icon="delete" color="negative" size="sm" @click="confirm" />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TodoItem from '@/components/todos/TodoItem'
import moment from 'moment'

export default {
  name: 'item-todo-drawer',

  data () {
    return {
      isOpen: true,
      notes: null,
      date: null
    }
  },

  components: {
    TodoItem
  },

  computed: {
    ...mapState({
      todo: s => s.client.todo
    })
  },

  watch: {
    todo: function (todo) {
      this.isOpen = todo !== null
      if (todo) {
        this.date = todo.due_date ? todo.due_date : moment().format('YYYY-MM-DD')
        this.notes = todo.notes
      }
    }
  },

  methods: {
    ...mapActions({
      deleteTodo: 'client/deleteTodo',
      updateTodo: 'client/updateTodo',
      getSheets: 'client/getSheets',
      getMyDay: 'client/getMyDay',
      removeFromMyDay: 'client/removeFromMyDay',
      addToMyDay: 'client/addToMyDay'
    }),
    formatTime (time) {
      return moment.utc(time).format('ddd MMMM D, Y')
    },
    onClickHideDrawer () {
      this.$store.commit('client/setTodo', null)
    },
    updateDueDate () {
      const todo = { ...this.todo, due_date: this.date }
      this.updateTodo(todo).then(response => {
        this.$refs.qDateProxy.hide()
      })
    },
    removeDueDate () {
      const todo = { ...this.todo, due_date: null }
      this.updateTodo(todo).then(response => {
        this.$refs.qDateProxy.hide()
      })
    },
    formatDueDate () {
      return moment(this.todo.due_date, 'YYYY-MM-DD').format('ddd, MMMM D')
    },
    updateNotes (val) {
      const todo = { ...this.todo, notes: val }
      this.updateTodo(todo).then(response => {
        this.$refs.qDateProxy.hide()
      })
    },
    confirm () {
      this.$q.dialog({
        title: `Delete "${this.todo.title}"`,
        message: 'You won\'t be able to undo this action.',
        ok: {
          color: 'negative',
          flat: true,
          label: 'Delete'
        },
        cancel: {
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.deleteTodo(this.todo)
          .then(() => this.getSheets())
      })
    },
    onClickAddToMyDay () {
      this.addToMyDay(this.todo.id)
        .then(() => {
          if (this.$route.name === 'myday-page') {
            this.getMyDay()
          }
        })
    },
    clickRemoveFromMyDay () {
      this.removeFromMyDay(this.todo.id)
        .then(() => {
          if (this.$route.name === 'myday-page') {
            this.getMyDay()
          }
        })
    }
  },

  mounted () {
    this.isOpen = this.todo !== null
  }
}
</script>
