<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    :width="300"
    :breakpoint="500"
    bordered
    content-class="white text-weight-medium">

    <q-list padding>
      <q-item
        class="text-capitalize"
        :to="{ name: 'sheet-index', params: { id: sheet.id } }"
        active-class="bg-blue-2 text-blue-7"
        v-for="sheet in sheets"
        :key="sheet.id"
        clickable
        v-ripple>
        <q-item-section>
          {{ sheet.name }}
        </q-item-section>
        <q-item-section avatar>
          <div class="flex inline flex-center">
            {{ sheet.ongoing ? sheet.ongoing : '' }}
          </div>
        </q-item-section>
      </q-item>

      <q-input square filled placeholder="New List" bg-color="white" v-model.trim="text" class="col-12" @keypress.enter="onSubmit">
        <template v-slot:prepend>
          <q-icon color="bg-blue-1" size="sm" name="add_circle" />
        </template>
        <template v-slot:append>
          <q-icon v-if="text" name="clear" color="blue-12" class="cursor-pointer" @click="text = ''" />
        </template>
      </q-input>
    </q-list>
  </q-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'sheet-list-drawer',
  data () {
    return {
      text: null
    }
  },

  props: {
    isOpen: {
      type: Boolean
    }
  },

  computed: {
    ...mapState({
      uuid: s => s.client.uuid,
      sheets: s => s.client.sheets
    })
  },

  watch: {
    uuid (id) {
      this.getSheets()
    }
  },

  methods: {
    ...mapActions({
      getSheets: 'client/getSheets',
      createSheet: 'client/createSheet'
    }),
    onSubmit () {
      if (!this.text) {
        return
      }
      this.createSheet(this.text).then(response => { this.text = '' })
    }
  },

  mounted () {
    if (this.uuid) {
      this.getSheets()
    }
  }
}
</script>
