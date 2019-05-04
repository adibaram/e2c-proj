import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'


import axios from 'axios'
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

Vue.use(VueResource);

Vue.http.options.root = (process.env.NODE_ENV !== 'development') ?
  '/api/data' : 'http://localhost:3003/api';



Vue.http.get('data')
  .then(response => response.json())
  .then((data) => {
    new Vue({
      router,
      store,
      axios,
      render: h => h(App)
    }).$mount('#app')
    var instancesToReturn = [];
    for (let i = 0; i < data.config.regions.length; i++) {
      let temp = data.config.regions[i].instanceTypes;
      for (let j = 0; j < temp.length; j++) {
        temp[j]['region'] = data.config.regions[i].region
        instancesToReturn.push(temp[j])
      }
    }
    return instancesToReturn
  })
  .then(res => {
    store.commit('setInstances', res)
  })





