<template>
  <div class="col-lg-3 col-md-6">
    <b-card class="mb-2 sheet-container" @click="handleClick(sheet)">
      <b-card-title class="mb-0"><p  class="display-4 sheet-title mb-1">{{ sheet.name }}</p></b-card-title>
      <b-card-text class="mb-1"><small>{{ displayCreated(sheet.created_at) }}</small></b-card-text>
      <b-card-text class="mb-1" v-if="sheet.recent"><small >Recent: <b>{{ sheet.recent.title }}</b></small></b-card-text>
      <b-card-text class="mb-1" v-else><small><i>Click to start adding tasks</i></small></b-card-text>

      <b-progress class="mt-2" :max="total" height="20px" show-value v-if="total">
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
  min-height: 165px;
}

.sheet-container:hover {
  background: #ccc;
}

.sheet-title {
  font-size: 1.5rem;
}
</style>