import { createStore } from 'vuex'

const store =  createStore ({
    state: {
      name: '',
      role: '',
      s_id: '',
    },
    mutations: {
      name: (state, newValue) => {
        state.name = newValue
      },
      role: (state, newValue) => {
        state.role = newValue
      },
      s_id: (state, newValue) => {
        state.s_id = newValue
      },
    },
    actions: {
      setName: (ctx, value) => {
        ctx.commit('name', value)
      },
      setRole: (ctx, value) => {
        ctx.commit('role', value)
      },
      setSid: (ctx, value) => {
        ctx.commit('s_id', value)
      },
    },
    getters: {
      getName: (state) => {
        return state.name
      },
      getRole: (state) => {
        return state.role
      },
      getSid: (state) => {
        return state.s_id
      },
    }
})


export default store