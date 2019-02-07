<template>
  <div class="app">
    <router-view />
    <LoadingCurtain />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import LoadingCurtain from '@/components/LoadingCurtain.vue';

const { mapState: mapSidebarState } = createNamespacedHelpers('sidebar');
const { mapActions: mapLocationActions } = createNamespacedHelpers('location');
const { mapActions: mapWeatherActions } = createNamespacedHelpers('weather');

export default {
  components: {
    LoadingCurtain,
  },
  computed: {
    ...mapSidebarState({
      isSidebarOpened: state => state.isOpened,
    }),
  },
  methods: {
    ...mapLocationActions(['updateLocationCurrent']),
    ...mapWeatherActions(['updateWeatherCurrent', 'updateWeatherForecast']),
  },
  async mounted() {
    try {
      await this.updateLocationCurrent();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
body {
  margin: 0;
}

.app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  position: relative;
}

.content {
  width: 100vw;
}

.content:after {
  background-color: rgba(0, 0, 0, 0.8);
  content: '';
  display: block;
  height: 0vh;
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 0;
}
</style>
