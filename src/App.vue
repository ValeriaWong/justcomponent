<template>
  <div class="input_test">
    <!-- <MyInput><MyInput> -->
  </div>

  <div class="avatar_test">
    <div class="c1">
      <avatar :src="imgUrl" size="small" alt="小头像" />
      <avatar :src="imgUrl" size="default" />
      <avatar :src="imgUrl" size="large" />
      <avatar :src="imgUrl" :size="100" isRotated="isRotated" />
    </div>

    <!-- <div class="c2">
      <avatar :src="imgUrl" size="small" shape="square" />
      <avatar :src="imgUrl" size="default" shape="square" />
      <avatar :src="imgUrl" size="large" shape="square" />
      <avatar :src="imgUrl" :size="100" shape="square" />
    </div>

    <div class="c3">
      <avatar size="small">Hi</avatar>
      <avatar size="default">Hi</avatar>
      <avatar size="large">Hi</avatar>
      <avatar :size="100">Hi</avatar>
    </div>

    <div class="c4">
      <avatar size="small" shape="square">Hi</avatar>
      <avatar size="default" shape="square">Hi</avatar>
      <avatar size="large" shape="square">Hi</avatar>
      <avatar :size="100" shape="square">Hi</avatar>
    </div>

    <div class="c5">
      <avatar size="small" color="red">Hi</avatar>
      <avatar size="default" color="white" background-color="gray">Hi</avatar>
      <avatar size="large" background-color="gray">Hi</avatar>
      <avatar :size="100" background-color="gray">Hi</avatar>
    </div> -->
  </div>

  <div>
    <div>
      <ButtonPrimary round="square">方角</ButtonPrimary>
      <ButtonPrimary round="round">圆角</ButtonPrimary>
      <ButtonPrimary round="other1">平行四边形</ButtonPrimary>
      <ButtonPrimary round="other2">椭圆</ButtonPrimary>
      <ButtonPrimary round="other3">平行四边形</ButtonPrimary>
      <ButtonPrimary round="other4">活力标题</ButtonPrimary>
    </div>
    <p></p>
    <div>
      <ButtonPrimary type="primary" size="S">主要按钮</ButtonPrimary>
      <ButtonPrimary type="primary" size="M">主要按钮</ButtonPrimary>
      <ButtonPrimary type="primary" size="L">主要按钮</ButtonPrimary>
    </div>
    <p></p>
    <div>
      <ButtonPrimary type="secondary" size="S">次级按钮</ButtonPrimary>
      <ButtonPrimary type="secondary" size="M">次级按钮</ButtonPrimary>
      <ButtonPrimary type="secondary" size="L">次级按钮</ButtonPrimary>
    </div>
    <p></p>
    <div>
      <ButtonPrimary type="revert" size="S">回退按钮</ButtonPrimary>
      <ButtonPrimary type="revert" size="M">回退按钮</ButtonPrimary>
      <ButtonPrimary type="revert" size="L">回退按钮</ButtonPrimary>
    </div>
    <p></p>
    <div>
      <button @click="isLoading = !isLoading">Switch Loading</button>
      <br />
      <ButtonPrimary :loading="!isLoading" type="primary"
        >带loading的主要按钮</ButtonPrimary
      >
      <br />
      <ButtonPrimary :loading="!isLoading" type="secondary"
        >带loading的次级按钮</ButtonPrimary
      >
      <br />
      <ButtonPrimary :loading="!isLoading" type="revert"
        >带loading的回退按钮</ButtonPrimary
      >
      <!-- component event should use emit, default event like 'click' may block -->
    </div>
    <p></p>
    <ButtonPrimary type="warning">警告按钮</ButtonPrimary>
    <ButtonPrimary type="danger">危险按钮</ButtonPrimary>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonPrimary from './views/button/button.vue';

import avatar from './views/avatar/avatar.vue';
import imgUrl from './assets/image/avatar.png';
// import MyInput from './views/input/input.vue';
const isLoading = ref(true);
</script>
