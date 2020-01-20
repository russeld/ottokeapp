import axios from "axios";

var generateId = function() {
  return Math.random().toString(36).substr(2, 9);
}

const state = {
  uuid: null
}

const mutations = {
  storeClientId (state, uuid) {
    state.uuid = uuid;
  }
}

const actions = {
  getClientId ({commit}) {
    const uuid = localStorage.getItem('uuid')
    if (!uuid) {
      uuid = generateId()
      axios
        .post('/api/clients', { 'uuid': uuid })
        .then( response => {
          commit('storeClientId', response.data.uuid)
          localStorage.setItem('uuid', response.data.uuid)
        })
        .catch( err => console.log(err) )
    } else {
      commit('storeClientId', uuid)
    }
  }
}

const getters = {
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}