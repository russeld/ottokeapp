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
  },
  deleteSheet(state, sheetId) {
    var sheets = state.sheets.filter(s => s.id != sheetId);
    state.sheets = [ ...sheets ]
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
  setSheet({ commit }, payload) {
    var { sheetId, uuid } = payload

    axios.get(`/api/clients/${uuid}/sheets/${sheetId}`)
         .then(response => {
            commit('setSheet', response.data)
         })
         .catch(err => console.log(err))
  },
  deleteSheet({ commit }, payload) {
    var { sheetId, uuid } = payload

    axios.delete(`/api/clients/${uuid}/sheets/${sheetId}`)
         .then(response => {
            commit('deleteSheet', sheetId)
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