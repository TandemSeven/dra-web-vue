<template>
  <input @input="handleInput" :value="inputValue" class="input" />
</template>

<script>
export default {
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
  },
  props: {
    inputValue: {
      default: '',
      type: String,
    },
  },
};
</script>

<style scoped>
.input {
  box-sizing: border-box;
  border: none;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  height: 46px;
  outline: none;
  padding: 15px;
}
</style>
