import {
  getCurrentLocation,
  getLocationByZipCode,
  getImageForLocation,
} from '@/utils/location';

export default {
  namespaced: true,
  state: {
    current: {},
    image: undefined,
  },
  mutations: {
    setCurrent(state, current) {
      state.current = current;
    },
    setImage(state, image) {
      state.image = image;
    },
  },
  actions: {
    async updateLocationCurrent({ commit, dispatch }, zipCode) {
      let current;

      commit('setIsLoading', true, { root: true });

      try {
        current = zipCode
          ? await getLocationByZipCode(zipCode)
          : await getCurrentLocation();

        commit('setCurrent', current);

        await Promise.all([
          dispatch('updateLocationImage', current),
          dispatch('weather/updateWeatherCurrent', current, { root: true }),
          dispatch('weather/updateWeatherForecast', current, { root: true }),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        commit('setIsLoading', false, { root: true });
      }

      return current;
    },
    async updateLocationImage({ commit }, current) {
      let image;

      try {
        image = await getImageForLocation(current);
      } catch (error) {
        image = process.env.VUE_APP_DEFAULT_IMAGE;
      }

      commit('setImage', image);
    },
  },
};
