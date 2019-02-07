<template>
  <section class="current-weather" :style="{ backgroundImage: `url(${image})` }">
    <WaveSpacer class="current-weather__wave" />
    <div class="current-weather__container">
      <header class="current-weather__header">
        <button @click="openSidebar" class="current-weather__header__button">
          <MenuIcon class="current-weather__header__icon" />
        </button>
      </header>
      <div class="current-weather__grid" v-if="!isLoading">
        <span class="current-weather__location">{{location.city}}, <strong>{{location.region}}</strong></span>
        <span class="current-weather__date">{{date}}</span>
        <span class="current-weather__forecast">{{weather.shortForecast}}</span>
      </div>
      <span class="current-weather__temperature" v-if="!isLoading">
        <WeatherIcon class="current-weather__temperature__icon" :icon="weather.icon" />
        <span class="current-weather__temperature__value">{{weather.temperature}}<sup class="current-weather__temperature__symbol">&deg;{{weather.temperatureUnit}}</sup></span>
      </span>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers, mapState as mapGlobalState } from 'vuex';

import MenuIcon from '@/assets/svg/utility/menu.svg';
import WaveSpacer from '@/components/WaveSpacer.vue';
import WeatherIcon from '@/components/WeatherIcon.vue';

const { mapState: mapLocationState } = createNamespacedHelpers('location');
const { mapState: mapWeatherState } = createNamespacedHelpers('weather');

const getFormattedDate = () => {
  return new Date().toLocaleString('en-us', {
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export default {
  components: {
    MenuIcon,
    WaveSpacer,
    WeatherIcon,
  },
  data() {
    return {
      date: getFormattedDate(),
    };
  },
  computed: {
    ...mapGlobalState({
      isLoading: state => state.isLoading,
    }),
    ...mapLocationState({
      location: state => state.current,
      image: state => state.image,
    }),
    ...mapWeatherState({
      weather: state => state.current,
    }),
  },
  methods: {
    openSidebar() {
      this.$router.replace('/settings');
    },
  },
  async mounted() {
    setInterval(() => {
      this.date = getFormattedDate();
    }, 1000);
  },
};
</script>

<style scoped lang="postcss">
.current-weather {
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  color: white;
  font-size: 1.5rem;
  min-height: 50vh;
  padding-bottom: 10vw;
  position: relative;
}

.current-weather:before {
  background-color: rgba(0, 0, 0, 0.5);
  content: '';
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
}

.current-weather__wave {
  bottom: 0;
  position: absolute;
  width: 100%;
}

.current-weather h1 {
  margin: 0;
}

.current-weather__header {
  text-align: right;
}
.current-weather__header__icon {
  fill: white;
  height: 20px;
}
.current-weather__header__button {
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  padding: 5px;
}

.current-weather__container {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  color: white;
  margin-inline: auto;
  max-width: 65rem;
  padding-block: 4rem;
  padding-inline: 2rem;
}

.current-weather__grid {
  align-items: center;
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    'date'
    'location'
    'forecast';
  text-align: center;
}
@media screen and (min-width: 768px) {
  .current-weather__grid {
    grid-template-areas:
      'location date'
      'forecast -';
    text-align: left;
  }
}

.current-weather__location {
  grid-area: location;
  font-size: 2em;
  line-height: 1em;
}

.current-weather__date {
  grid-area: date;
}
@media screen and (min-width: 768px) {
  .current-weather__date {
    text-align: right;
  }
}

.current-weather__forecast {
  grid-area: forecast;
}

.current-weather__temperature {
  align-items: flex-start;
  display: inline-flex;
  justify-content: center;
  font-size: 5em;
  line-height: 1em;
}
@media screen and (min-width: 768px) {
  .current-weather__temperature {
    justify-content: flex-start;
  }
}

.current-weather__temperature {
  display: flex;
}

.current-weather__temperature__icon {
  width: 0.5em;
}

.current-weather__temperature__symbol {
  font-size: 0.3em;
  line-height: 1em;
  margin-top: 0.75em;
}
</style>
