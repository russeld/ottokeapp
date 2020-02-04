<template>
  <div class="d-flex flex-column h-100">
    <header class="border-bottom">
      <b-navbar type="dark" variant="dark" class="sticky-top">
        <b-container>
          <router-link to="/"><span class="navbar-brand mb-0 h1">Ottoke</span></router-link>
        </b-container>
      </b-navbar>
    </header>
    <main role="main" class="flex-shrink-0">
      <router-view></router-view>
    </main>
    <footer class="footer text-muted mt-auto py-3 border-top">
      <b-container>
        <p class="m-0"><small>&#9400; Ottoke 2020</small></p>
      </b-container>
    </footer>
  </div>
</template>

<script>
import Home from './layouts/Home'
import { mapState, mapActions } from 'vuex'

import router from './router'

export default {
  name: 'App',
  router,
  components: {
    Home
  },
  methods: {
    ...mapActions({'getClientId': 'client/getClientId'}),
  },
  created () {
    this.getClientId();
  }
}
</script>

<style>
html {
  height: 100% !important;
}

body {
  height: 100% !important;
}

.footer {
  background-color: #f5f5f5;
}

.footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}

</style>
