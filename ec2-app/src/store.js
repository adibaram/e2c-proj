import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    instances:[],
    filter: '',
    isLoading: false
  },
  getters: {

    getInstances(state) {
      let term = new RegExp(state.filter, 'i')
      return state.instances.filter(instance => {
          return instance.type.match(term)
      })
  },

    getFilter(state) {
      return state.filter;
    },

  },
  mutations: {

    setInstances(state, payload) {
      state.instances = payload;
    },
    setLoading(state, {isLoading}) {
      state.isLoading = isLoading;
      // console.log('DEBUG:store-setLoading:isLoading', isLoading);
    },
    setFilter(state, {filter}) {
      state.filter = filter;
    }
  },
  actions: {

    loadFilter(context,  {filter}) {
      context.commit({ type: 'setFilter', filter });
    },

    setLoading(context, {isLoading}) {
      context.commit({ type: 'setLoading', isLoading });
    },

    setFilter(context,{filter}) {
      context.commit({ type: 'setFilter', filter });
    },
  }
})


