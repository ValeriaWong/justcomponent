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
    <div v-if="loading">
      <img src="../../assets/loading.png" alt="loading" />
    </div>
    <div v-else>
      <slot v-if="type == 'icon'">
        <img v-if="icon == 'search'" src="../../assets/search.svg" />
        <img v-if="icon == 'clear'" src="../../assets/clear.svg" />
        <img v-if="icon == 'download'" src="../../assets/download.svg" />
      </slot>
      <slot v-else>这是使用scss文件的button</slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'primary', // primary,secondary,revert,icon
  },
  size: {
    type: String,
    default: 'M',
  },
  loading: Boolean,
  round: {
    type: String,
    default: 'square',
  },
  icon: {
    type: String,
    default: 'search',
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
