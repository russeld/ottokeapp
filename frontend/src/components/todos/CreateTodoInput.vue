<template>
  <q-input outlined square placeholder="Add todo">
    <template v-slot:prepend>
      <q-icon name="add" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'create-todo',
  props: {
    sheet: {
      type: Object
    }
  }
}
</script>
