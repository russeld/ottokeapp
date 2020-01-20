<template>
  <div class="col-lg-3 col-md-6">
    <b-card class="mb-2 sheet-container" @click="handleClick(sheet)">
      <b-card-title>{{ sheet.name }}</b-card-title>
      <b-card-text class="mb-1"><small>Created: {{ displayCreated(sheet.created_at) }}</small></b-card-text>
      <b-card-text class="mb-1"><small>Done: Create some task</small></b-card-text>

      <b-progress class="mt-2" :max="total" height="20px" show-value>
        <b-progress-bar :value="sheet.completed" variant="success"></b-progress-bar>
        <b-progress-bar :value="sheet.ongoing" variant="info"></b-progress-bar>
      </b-progress>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'SheetCard',
  props: {
    sheet: Object
  },
  computed: {
    total: function () { return this.sheet.ongoing + this.sheet.completed }
  },
  methods: {
    ...mapActions({
      'setSheet': 'sheets/setSheet',
    }),
    handleClick(sheet) {
      this.$router
          .push({ name: 'todos', params: { sheetId: sheet.id } })
          .then( router => this.setSheet({ sheet: this.sheet }))
    },
    displayCreated(date) {
      return moment.utc(date).format('MMM d, Y')
    }
  }
}
</script>

<style scoped>
.sheet-container {
  cursor: pointer;
}

.sheet-container:hover {
  background: #ccc;
}
</style>