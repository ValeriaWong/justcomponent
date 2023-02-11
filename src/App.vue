<template>
  <Space wrap>
  <div class="input_test">
    <!-- <MyInput></MyInput> -->
    <my-input v-model="value"></my-input>
    <my-input disabled></my-input>
    <my-input showPassword></my-input>
    <my-input clearable></my-input>
    <my-input v-model="value1" type="textarea"></my-input>
    <my-input readonly placeholder="输入"></my-input>
    <my-input placeholder="输入"></my-input>
    <my-input placeholder="输入" type="textarea"></my-input>
  </div>

  <div class="avatar_test">
    <div class="c1">
      <avatar :src="imgUrl" size="small" alt="小头像" />
      <avatar :src="imgUrl" size="default" />
      <avatar :src="imgUrl" size="large" />
      <avatar :src="imgUrl" :size="100" isRotated="isRotated" />
    </div>

    <div class="c2">
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
    </div>
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
    
    <div>
      <ButtonPrimary type="primary" size="S">主要按钮</ButtonPrimary>
      <ButtonPrimary type="primary" size="M">主要按钮</ButtonPrimary>
      <ButtonPrimary type="primary" size="L">主要按钮</ButtonPrimary>
    </div>
    
    <div>
      <ButtonPrimary type="secondary" size="S">次级按钮</ButtonPrimary>
      <ButtonPrimary type="secondary" size="M">次级按钮</ButtonPrimary>
      <ButtonPrimary type="secondary" size="L">次级按钮</ButtonPrimary>
    </div>
    
    <div>
      <ButtonPrimary type="revert" size="S">回退按钮</ButtonPrimary>
      <ButtonPrimary type="revert" size="M">回退按钮</ButtonPrimary>
      <ButtonPrimary type="revert" size="L">回退按钮</ButtonPrimary>
    </div>
    
    
    <div style="display: flex;">
      <!--防止点击后更换位置，需要在父级块状元素处增加style="display: flex;"-->
      <ButtonLoading type="primary">点击切换loading的主要按钮</ButtonLoading>
      <ButtonLoading type="secondary">点击切换loading的次级按钮</ButtonLoading>
      <ButtonLoading type="revert">点击切换loading的回退按钮</ButtonLoading>
    
      <!-- <ButtonPrimary @click="switchloading" :loading="!isLoading" type="primary"
        >点击切换loading的主要按钮</ButtonPrimary
      >
      
      <ButtonPrimary  @click="switchloading" :loading="!isLoading" type="secondary"
        >点击切换loading的次级按钮</ButtonPrimary
      >
     
      <ButtonPrimary @click="switchloading" :loading="!isLoading" type="revert"
        >点击切换loading的回退按钮</ButtonPrimary
      > -->
      <!-- component event should use emit, default event like 'click' may block -->
   
    </div>
    
    <ButtonPrimary type="warning">警告按钮</ButtonPrimary>
    <ButtonPrimary type="danger">危险按钮</ButtonPrimary>
  </div>

  <div>
    <SelectPrimary></SelectPrimary>
  </div>
</Space>
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
import ButtonLoading from './views/button/loadingbutton.vue';
import avatar from './views/avatar/avatar.vue';
import imgUrl from './assets/image/avatar.png';
import SelectPrimary from "./views/select/select-search.vue"
import MyInput from './views/input/input.vue';


const value = ref('请输入');
const value1 = ref('输入文本');

// const isLoading = ref(false);

// function switchloading() {
//   isLoading.value = !isLoading.value;
// }

</script>
