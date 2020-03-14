import Vuex from 'vuex'
import Vue from 'vue'

import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)


export default new Vuex.Store({
  modules:{
    user,
  },
  getters,
}) 
