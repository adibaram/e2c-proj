import Vue from 'vue'
import Vuex from 'vuex'
import instanceService from './services/instanceService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    instances:[],
    filter: '',
    isLoading: false
  },
  getters: {
    getInstances(state) {
      return state.instances;
    },
    getFilter(state) {
      return state.filter;
    },

  },
  mutations: {
    setInstances(state, { instances }) {
      state.instances = instances;
    },
    setLoading(state, {isLoading}) {
      state.isLoading = isLoading;
      console.log('DEBUG:store-setLoading:isLoading', isLoading);
    },
    setFilter(state, {filter}) {
      state.filter = filter;

      // console.log(filter)


    }
  },
  actions: {
    loadFilter(context,  {filter}) {
      context.commit({ type: 'setFilter', filter });
      context.dispatch({ type: 'loadInstances' });
    },

    setLoading(context, {isLoading}) {
      context.commit({ type: 'setLoading', isLoading });
    },

    setLoading(context, {isLoading}) {
      context.commit({ type: 'setLoading', isLoading });
    },

    setFilter(context,{filter}) {
      context.commit({ type: 'setFilter', filter });
    },

    loadInstances(context) {
      console.log('loading instances...');
      context.dispatch({ type: 'setLoading', isLoading: true});
      

      return instanceService.query(context.state.filter)
        .then(instances => {
          context.commit({ type: 'setInstances', instances });
          context.dispatch({ type: 'setLoading', isLoading: false});
        })
    },
  }
})


