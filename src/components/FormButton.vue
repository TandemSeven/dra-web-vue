<template>
  <button
    :class="{
      button: true,
      'button--primary': primary,
      'button--secondary': secondary,
      'button--tertiary': tertiary,
    }"
    :type="buttonType"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    primary: {
      default: false,
      type: Boolean,
    },
    secondary: {
      default: false,
      type: Boolean,
    },
    tertiary: {
      default: false,
      type: Boolean,
    },
    buttonType: {
      default: 'button',
      type: String,
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped>
.button {
  box-sizing: border-box;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  height: 46px;
  outline: none;
  width: 100%;
}

.button--primary,
.button--secondary {
  color: #fff;
}

.button--primary {
  background-color: #ff545e;
}

.button--secondary {
  background-color: #00adcf;
}

.button--tertiary {
  background-color: transparent;
  border: 1px solid #00adcf;
  color: #00adcf;
}
</style>
