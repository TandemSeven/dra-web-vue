<template>
  <div class="content">
    <main>
      <WeatherCurrent />
      <WeatherForecast />
    </main>
    <router-view />
  </div>
</template>

<script>
import WeatherForecast from '@/containers/WeatherForecast.vue';
import WeatherCurrent from '@/containers/WeatherCurrent.vue';

export default {
  components: {
    WeatherForecast,
    WeatherCurrent,
  },
};
</script>
