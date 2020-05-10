<template>
  <q-layout view="hHh lpr fFf">
    <app-header />

    <sheet-list-drawer />

    <todo-item-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from '@/components/general/AppHeader'
import SheetListDrawer from '@/components/sheets/SheetListDrawer'
import TodoItemDrawer from '@/components/todos/TodoItemDrawer'

export default {
  name: 'SheetLayout',

  data () {
    return {
    }
  },

  components: {
    AppHeader,
    TodoItemDrawer,
    SheetListDrawer
  }
}
</script>
