import axios from 'axios';

const state = {
  sheets: [],
  sheet: {}
}

const mutations = {
  createSheet(state, sheet) {
    state.sheets = [ ...state.sheets, sheet ]
  },
  listSheets(state, sheets) {
    state.sheets = [ ...sheets ];
  },
  setSheet(state, sheet) {
    state.sheet = { ...sheet }
  }
}

const actions = {
  newSheet({ commit }, payload) {
    var { name, uuid } = payload

    var data = { 'name': name }
    axios.post(`/api/clients/${uuid}/sheets`, data)
         .then(response => {
            commit('createSheet', response.data)
         })
         .catch(err => console.log(err))
  },
  getSheets({ commit }, uuid) {
    axios.get(`/api/clients/${uuid}/sheets`)
         .then(response => {
            commit('listSheets', response.data)
         })
         .catch(err => console.log(err))
  },
  setSheet({ commit }, payload, rootState) {
    var { sheetId, uuid } = payload

    axios.get(`/api/clients/${uuid}/sheets/${sheetId}`)
         .then(response => {
            commit('setSheet', response.data)
         })
         .catch(err => console.log(err))
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