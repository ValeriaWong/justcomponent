<!-- // button.vue -->
<template>
  <button
    class="my-button"
    :class="[
      type ? `my-button-${type}` : '',
      size ? `my-button-${size}` : '',
      round ? `my-button--${round}` : '',
    ]"
  >
    <span v-if="loading"
      ><img src="../../assets/loading.png" alt="loading"
    /></span>
    <span v-else><slot>这是使用scss文件的button</slot></span>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'M',
  },
  loading: {
    type: Boolean, // delete default value
  },
  round: {
    type: String,
    default: 'square',
  },
  iconPlacement: {
    type: String,
    default: 'left',
  },
});
</script>

<style lang="scss">
@import '../../styles/index';
.my-button {
  @include button-wrapper;
}
</style>
