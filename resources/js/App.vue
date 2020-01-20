<template>
  <div>
    <b-navbar type="dark" variant="dark" class="navbar-expand-lg sticky-top">
      <div class="container">
        <div class="col-md-12">
          <router-link to="/"><span class="navbar-brand mb-0 h1">Ottoke</span></router-link>
        </div>
      </div>
    </b-navbar>
    <router-view></router-view>
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
