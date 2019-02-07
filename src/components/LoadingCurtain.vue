<template>
  <div :class="{ 'loading': true, 'loading--visible': isLoading }">
    <RefreshIcon />
  </div>
</template>

<script>
import { mapState as mapGlobalState } from 'vuex';
import RefreshIcon from '@/assets/svg/utility/refresh.svg';

export default {
  components: {
    RefreshIcon,
  },
  computed: {
    ...mapGlobalState({
      isLoading: state => state.isLoading,
    }),
  },
  props: ['active'],
};
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading {
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  font-size: 21px;
  height: 0;
  justify-content: center;
  opacity: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100vw;
}

.loading--visible {
  height: 100vh;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.loading svg {
  animation: spin 2s infinite linear;
  width: 100px;
}
</style>
