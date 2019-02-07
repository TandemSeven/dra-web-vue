<template>
  <component class="weather-icon" :is="renderedIcon" />
</template>

<script>
import Cloudy from '@/assets/svg/weather/021-cloudy-1.svg';
import CloudyWindy from '@/assets/svg/weather/021-cloud.svg';
import PartlyCloudyWindy from '@/assets/svg/weather/021-cloudy.svg';
import Clear from '@/assets/svg/weather/021-sun.svg';
import Rain from '@/assets/svg/weather/021-rain.svg';
import RainHighClouds from '@/assets/svg/weather/021-rain-2.svg';
import RainLowClouds from '@/assets/svg/weather/021-rain-1.svg';
import Sleet from '@/assets/svg/weather/021-snowing-1.svg';
import Snowflake from '@/assets/svg/weather/021-snowflake.svg';
import Snowing from '@/assets/svg/weather/021-snowing-3.svg';
import Storm from '@/assets/svg/weather/021-storm.svg';
import Sun from '@/assets/svg/weather/021-sun.svg';
import Sunset from '@/assets/svg/weather/021-sunset.svg';
import Tornado from '@/assets/svg/weather/021-tornado.svg';

const iconMap = {
  bkn: Cloudy,
  blizzard: Snowflake,
  cold: Snowflake,
  dust: Tornado,
  few: Cloudy,
  fog: Sunset,
  fzra: Sleet,
  haze: Sunset,
  hot: Sun,
  hurricane: Tornado,
  ovc: Cloudy,
  rain: Rain,
  rain_fzra: Snowflake,
  rain_showers: RainHighClouds,
  rain_showers_hi: RainLowClouds,
  rain_snow: Sleet,
  rain_sleet: Sleet,
  sct: Cloudy,
  skc: Clear,
  sleet: Sleet,
  smoke: Tornado,
  snow: Snowing,
  snow_fzra: Sleet,
  snow_sleet: Sleet,
  tornado: Tornado,
  tropical_storm: Storm,
  tsra: Storm,
  tsra_sct: Storm,
  tsra_hi: Storm,
  wind_bkn: CloudyWindy,
  wind_ovc: CloudyWindy,
  wind_sct: PartlyCloudyWindy,
  wind_skc: Clear,
  wind_few: PartlyCloudyWindy,
};

export default {
  computed: {
    renderedIcon() {
      return iconMap[this.icon] || Clear;
    },
  },
  props: ['icon'],
};
</script>

<style scoped>
.weather-icon {
  height: 3.75rem;
}
</style>
