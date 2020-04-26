<template>
  <q-layout view="hHh lpr fFf">
    <q-header flat>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="openLeftDrawer = !openLeftDrawer" round dense icon="menu" />
          Ottoke
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <sheet-list-drawer :isOpen="openLeftDrawer"/>

    <!-- right-drawer -->
    <q-drawer
      side="right"
      v-model="openLeftDrawer"
      :breakpoint="500"
      bordered
      content-class="white text-weight-medium">
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import SheetListDrawer from '@/components/sheets/SheetListDrawer'

export default {
  name: 'MainLayout',

  components: {
    SheetListDrawer
  },

  data () {
    return {
      openLeftDrawer: true
    }
  },

  computed: {
    ...mapState({
      showRightDrawer: s => s.clients.showRightDrawer
    })
  }
}
</script>
