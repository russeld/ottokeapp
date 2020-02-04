<template>
  <div class="col-lg-3 col-md-6">
    <b-card class="mb-2 sheet-container" bg-variant="secondary" text-variant="white">
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <p class="ml-2 pl-1 my-0">{{ sheet.name }}</p>
          <b-dropdown variant="btn-outline-link" toggle-class="text-decoration-none" class="m-0" size="sm" no-caret>
            <template v-slot:button-content>
              <font-awesome-icon icon="cog" size="lg" /><span class="sr-only">Settings</span>
            </template>
            <b-dropdown-item @click="handleDeleteSheet(sheet)"><small class="text-danger">Delete</small></b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
      <b-card-body @click="handleClick(sheet)" class="p-0">
        <small>Created: {{ displayCreated(sheet.created_at) }}</small>
      </b-card-body>
      <!-- <b-card-text class="mb-1" v-if="sheet.recent"><small >Recent: <b>{{ sheet.recent.title }}</b></small></b-card-text>
      <b-card-text class="mb-1" v-else><small><i>Click to start adding tasks</i></small></b-card-text> -->
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'SheetCard',
  props: {
    sheet: Object
  },
  computed: {
    ...mapState('client', ['uuid']),
    total: function () { return this.sheet.ongoing + this.sheet.completed }
  },
  methods: {
    ...mapActions({
      'setSheet': 'sheets/setSheet',
      'deleteSheet': 'sheets/deleteSheet'
    }),
    handleClick(sheet) {
      this.$router
          .push({ name: 'todos', params: { sheetId: sheet.id } })
          .then( router => this.setSheet({ sheet: this.sheet }))
    },
    displayCreated(date) {
      return moment.utc(date).format('MMM D, Y')
    },
    handleDeleteSheet(sheet) {
      this.deleteSheet({ uuid: this.uuid, sheetId: sheet.id })
    }
  }
}
</script>

<style scoped>
.card-header {
  padding: 0.25rem 0.5rem;
}

.sheet-container .card-body {
  cursor: pointer;
}
</style>