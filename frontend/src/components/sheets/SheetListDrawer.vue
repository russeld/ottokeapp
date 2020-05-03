<template>
  <q-drawer
    v-model="display"
    :mini="isOpen"
    show-if-above
    :width="250"
    :breakpoint="500"
    bordered
    content-class="white text-weight-medium">

    <q-scroll-area class="fit">
      <q-list>
        <q-item clickable @click="isOpen = !isOpen" >
          <q-item-section avatar>
            <q-icon flat name="menu"/>
          </q-item-section>
        </q-item>
        <q-item
          :to="{ name: 'sheet-index', params: { id: sheet.id } }"
          active-class="bg-blue-2 text-blue-7"
          v-for="sheet in sheets"
          :key="sheet.id"
          clickable
          v-ripple>
          <q-item-section class="text-capitalize">
            {{ sheet.name }}
          </q-item-section>
          <q-item-section avatar>
            <div class="flex inline flex-center" v-if="!isOpen">
              {{ sheet.ongoing ? sheet.ongoing : '' }}
            </div>
            <div class="flex inline flex-cener text-capitalize" v-else>
              {{ sheet.name.substring(0, 2) }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-input square filled placeholder="New List" bg-color="white" v-model.trim="text" class="col-12" @keypress.enter="onSubmit" @focus="isOpen = false">
        <template v-slot:prepend>
          <q-icon color="bg-blue-1" size="md" name="add_circle" />
        </template>
        <template v-slot:append>
          <q-icon v-if="text" name="clear" color="blue-12" class="cursor-pointer" @click="text = ''" />
        </template>
      </q-input>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'sheet-list-drawer',
  data () {
    return {
      text: null,
      isOpen: false,
      display: false
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
