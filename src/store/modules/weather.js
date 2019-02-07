import {
  getCurrentWeatherForLocation,
  getForecastForLocation,
} from '@/utils/weather';

export default {
  namespaced: true,
  state: {
    current: {},
    forecast: [],
  },
  mutations: {
    setCurrent(state, current) {
      state.current = current;
    },
    setForecast(state, forecast) {
      state.forecast = forecast;
    },
  },
  actions: {
    async updateWeatherCurrent(context, location) {
      let current;

      try {
        current = await getCurrentWeatherForLocation(location);
        context.commit('setCurrent', current);
      } catch (error) {
        console.error(error);
      }

      return current;
    },
    async updateWeatherForecast(context, location) {
      let forecast;

      try {
        forecast = await getForecastForLocation(location);
        context.commit('setForecast', forecast);
      } catch (error) {
        console.error(error);
      }

      return forecast;
    },
  },
};
