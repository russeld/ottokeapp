<template>
  <q-layout view="hHh lpr fFf">
    <q-header flat>
      <q-toolbar>
        <q-toolbar-title>
          Ottoke
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <router-view />
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>
