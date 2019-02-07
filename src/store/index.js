import Vue from 'vue';
import Vuex from 'vuex';
import location from './modules/location';
import weather from './modules/weather';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
  },
  mutations: {
    setIsLoading(state, isLoading = true) {
      state.isLoading = isLoading;
    },
  },
  modules: {
    location,
    weather,
  },
});
