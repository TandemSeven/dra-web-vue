<template>
  <section class="weather-forecast">
    <div class="weather-forecast__container">
      <ul v-if="!isLoading">
        <li class="weather-forecast__period" :key="day.number" v-for="day in forecast">
          <p class="weather-forecast__period__name">{{day.name}}</p>
          <WeatherIcon class="weather-forecast__period__icon" :icon="day.icon" />
          <p>
            <span v-if="typeof day.high === 'object'" class="weather-forecast__period__temperature weather-forecast__period__temperature--high"><strong>{{day.high.temperature}}&deg;{{day.high.temperatureUnit}}</strong></span>
            <span v-else-if="typeof current === 'object'" class="weather-forecast__period__temperature weather-forecast__period__temperature--high"><strong>{{current.temperature}}&deg;{{current.temperatureUnit}}</strong></span>
            <span v-if="typeof day.low === 'object'" class="weather-forecast__period__temperature weather-forecast__period__temperature--low">{{day.low.temperature}}&deg;{{day.low.temperatureUnit}}</span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers, mapState as mapGlobalState } from 'vuex';
import WeatherIcon from '@/components/WeatherIcon.vue';

const { mapState: mapWeatherState } = createNamespacedHelpers('weather');

export default {
  components: {
    WeatherIcon,
  },
  computed: {
    ...mapGlobalState({
      isLoading: state => state.isLoading,
    }),
    ...mapWeatherState({
      current: state => state.current,
      forecast: state => state.forecast,
    }),
  },
};
</script>

<style scoped lang="postcss">
.weather-forecast {
  box-sizing: border-box;
  min-height: 50vh;
  padding: 20px;
}

.weather-forecast__container {
  margin-inline: auto;
  max-width: 65rem;
  text-align: center;
  overflow-x: scroll;
}

.weather-forecast p {
  margin: 0;
}

.weather-forecast ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
}

.weather-forecast ul li {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  text-align: center;
}

.weather-forecast__period {
  padding: 20px 30px;
  text-align: center;
}

.weather-forecast__period__name {
  font-size: 1.5rem;
}

.weather-forecast__period:first-of-type .weather-forecast__period__name {
  font-weight: 700;
}

.weather-forecast__period__icon {
  margin-inline: auto;
  height: 3.75rem;
  width: auto;
}

.weather-forecast__period__temperature {
  font-size: 1rem;
}

.weather-forecast__period__temperature
  + .weather-forecast__period__temperature {
  margin-left: 5px;
}
</style>
