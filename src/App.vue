<template>
  <div>
    <ButtonPrimary></ButtonPrimary>
    <ButtonPrimary type="primary">主要按钮</ButtonPrimary>
    
    <ButtonPrimary type="secondary">次级按钮</ButtonPrimary>
    <ButtonPrimary :loading="!isLoading" type="primary">带loading的主要按钮</ButtonPrimary>
    <ButtonPrimary :loading="!isLoading" type="secondary">带loading的次级按钮</ButtonPrimary>
    <ButtonPrimary :loading="!isLoading" type="revert">带loading的回退按钮</ButtonPrimary>
    <!-- component event should use emit, default event like 'click' may block -->
    <button @click="isLoading = !isLoading">Switch Loading</button>
    <ButtonPrimary type="revert">回退按钮</ButtonPrimary>
    <ButtonPrimary type="warning">警告按钮</ButtonPrimary>
    <ButtonPrimary type="danger">危险按钮</ButtonPrimary>
  </div>

  <div>
    <p>这是另一段</p>
  </div>

  <div>
    <Button style="height: 180px; width: 180px" />
  </div>
  <div>
    <Button style="height: 120px; width: 120px" />
  </div>
  <div>
    <Button style="height: 60px; width: 60px" />
  </div>
  <div>
    <Button style="height: 30px; width: 30px" />
  </div>
  <div>
    <Button />
  </div>
  <div>
    <Button />
  </div>
  <div>
    <Button />
  </div>
</template>

<style lang="scss">
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

const isLoading = ref(true)
</script>
