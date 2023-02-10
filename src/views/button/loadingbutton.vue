<!-- // button.vue -->
<template>
  <ButtonPrimary @click="switchloading">
    <span  v-if="isLoading"
      ><img src="../../assets/loading.png" alt="loading"
    />加载中</span>
    <span v-else><slot>这是使用scss文件的button</slot></span>
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
