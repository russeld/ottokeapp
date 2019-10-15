<template>
  <b-container class="app-container pb-5">
    <Header />
    <Form />
    <TodoList />
  </b-container>
</template>

<script>

import Header from './components/Header'
import Form from './components/Form'
import TodoList from './components/TodoList'

export default {
  components: {
    Header,
    Form,
    TodoList
  }
}
</script>
