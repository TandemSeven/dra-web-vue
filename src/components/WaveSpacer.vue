<template>
  <WaveImage class="wave-image" />
</template>

<script>
import WaveImage from '@/assets/svg/utility/wave.svg';

export default {
  components: {
    WaveImage,
  },
};
</script>

<style>
.wave-image {
  fill: #fff;
}
.wave-image path:first-child {
  fill: #00adcf;
}
</style>
