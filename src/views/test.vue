<!-- 登录页 -->
<script setup lang="ts">
import { ref } from 'vue';

const cityList = ref(['wz', 'hz', 'jx']);
const selected = ref([]);
const handleClick = (cityName: string, index: number) => {
  if (selected.value.indexOf(cityName) === -1) {
    selected.value.push(cityName);
  } else {
    selected.value.splice(index, 1);
  }
};

const removeClick = (index: number) => {
  selected.value.splice(index, 1);
};
</script>
<template>
  <div class="container">
    <div>
      <span
        v-for="(city, index) in selected"
        :key="index"
        v-text="city"
        @click="removeClick(index)"
      ></span>
    </div>
    <div
      v-for="(city, index) in cityList"
      :key="index"
      @click="handleClick(city, index)"
      v-text="city"
    ></div>
  </div>
</template>
<style lang="less" scoped></style>
