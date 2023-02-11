<!-- // button.vue -->
<template>
  <ButtonPrimary @click="switchloading">
    <div class="my-button-wrapper" v-if="isLoading">
      <img src="../../assets/loading.png" alt="loading" />加载中
    </div>
    <div class="my-button-wrapper" v-else>
      <slot>这是使用scss文件的button</slot>
    </div>
  </ButtonPrimary>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonPrimary from './button.vue';

const isLoading = ref(false);

function switchloading() {
  isLoading.value = !isLoading.value;
}
</script>

<style lang="scss">
@import '../../styles/index';
.my-button {
  @include button-wrapper;
}
</style>
