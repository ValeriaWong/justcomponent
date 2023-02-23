<script lang="ts" setup>
import { ref } from 'vue';
import JustInput from '../views/input/input.vue';

const value = ref('请输入');
const value1 = ref('输入文本');
</script>
<template>
  <space wrap>
    <div class="input-wrapper">
      <div class="input_test">
        <!-- <MyInput></MyInput> -->
        <JustInput v-model="value"></JustInput>
        <JustInput v-model="value" icon="search"></JustInput>
        <JustInput disabled></JustInput>
        <JustInput showPassword></JustInput>
        <JustInput clearable></JustInput>
        <JustInput v-model="value1" type="textarea"></JustInput>
        <JustInput readonly placeholder="输入"></JustInput>
        <JustInput placeholder="输入"></JustInput>
        <JustInput placeholder="输入" type="textarea"></JustInput>
      </div>
    </div>
  </space>
</template>
