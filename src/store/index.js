import { createStore } from "vuex"

export default createStore({
  state: {
    token: "",
    name:'',
    company:''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_COMPANY: (state, company) => {
      state.company = company
    },
  },
  actions: {

  },
  modules: {}
})
