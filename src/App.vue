<template>
  <Space wrap>
    <div class="btn-able-wrapper" v-if="type == 'btnAble'">
      <div>
        <ButtonPrimary type="primary" >主要按钮</ButtonPrimary>
        <ButtonPrimary type="secondary" >次级按钮</ButtonPrimary>
        <ButtonPrimary type="revert" >回退按钮</ButtonPrimary>
        <ButtonPrimary type="icon"></ButtonPrimary>
        <ButtonPrimary type="icon" icon="clear"></ButtonPrimary>
        <ButtonPrimary type="icon" icon="download"></ButtonPrimary>
      </div>

      
      <ButtonPrimary type="danger">危险按钮</ButtonPrimary>
    </div>

    <div class="btn-disable-wrapper" v-if="type == 'btnDisable'">
      <div>
        <ButtonPrimary disabled>默认按钮</ButtonPrimary>
        <ButtonPrimary type="primary" disabled>主要按钮</ButtonPrimary>
        <ButtonPrimary type="secondary" disabled>次级按钮</ButtonPrimary>
        <ButtonPrimary type="revert" disabled>回退按钮</ButtonPrimary>
        <ButtonPrimary type="warning" disabled>警告按钮</ButtonPrimary>
        <ButtonPrimary type="danger" disabled>危险按钮</ButtonPrimary>
      </div>

      <div>
        <ButtonPrimary plain disabled>朴素按钮</ButtonPrimary>
        <ButtonPrimary type="primary" plain disabled>主要按钮</ButtonPrimary>
        <ButtonPrimary type="secondary" plain disabled>成功按钮</ButtonPrimary>
        <ButtonPrimary type="revert" plain disabled>信息按钮</ButtonPrimary>
        <ButtonPrimary type="warning" plain disabled>警告按钮</ButtonPrimary>
        <ButtonPrimary type="danger" plain disabled>危险按钮</ButtonPrimary>
      </div>
    </div>

    <div class="input-wrapper" v-if="type == 'input'">
      <div class="input_test">
        <!-- <MyInput></MyInput> -->
        <my-input v-model="value"></my-input>
        <my-input v-model="value" icon="search"></my-input>
        <my-input disabled></my-input>
        <my-input showPassword></my-input>
        <my-input clearable></my-input>
        <my-input v-model="value1" type="textarea"></my-input>
        <my-input readonly placeholder="输入"></my-input>
        <my-input placeholder="输入"></my-input>
        <my-input placeholder="输入" type="textarea"></my-input>
      </div>
    </div>
    <div class="avatar-wrapper" v-if="type == 'avatar'">
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
          <avatar size="default" color="white" background-color="gray"
            >Hi</avatar
          >
          <avatar size="large" background-color="gray">Hi</avatar>
          <avatar :size="100" background-color="gray">Hi</avatar>
        </div>
      </div>
    </div>
    <div>
      <div class="btn-shape-wrapper" v-if="type == 'btnShape'">
        <div>
          <ButtonPrimary round="square">方角</ButtonPrimary>
          <ButtonPrimary round="round">圆角</ButtonPrimary>
          <ButtonPrimary round="other1">平行四边形</ButtonPrimary>
          <ButtonPrimary round="other2">椭圆</ButtonPrimary>
          <ButtonPrimary round="other3">平行四边形</ButtonPrimary>
          <ButtonPrimary round="other4">活力标题</ButtonPrimary>
        </div>
      </div>
      <div class="btn-size-wrapper" v-if="type == 'btnSize'">
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
      </div>
      <div class="btn-loading-wrapper" v-if="type == 'btnLoading'">
        <div style="display: flex">
          <!--防止点击后更换位置，需要在父级块状元素处增加style="display: flex;"-->
          <ButtonLoading type="primary"
            >点击切换loading的主要按钮</ButtonLoading
          >
          <ButtonLoading type="secondary"
            >点击切换loading的次级按钮</ButtonLoading
          >
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
      </div>
      
    </div>

    <div class="dropselect-wrapper" v-if="type == 'dropselect'">
      <DropSelect type='multiple' />
      <DropSelect type='multiple' disabled />
      <DropSelect type='multiple-search' />
      <DropSelect type='multiple-cascader' />

      <DropSelect type='single' />
      <DropSelect type='single' disabled />
      
      <DropSelect type='single-group' />
      <DropSelect type='single-description' />
      <DropSelect type='single-cascader' />
     
    </div>
  </Space>
</template>

<style lang="scss" scoped>

body {
  margin: 0;
  display: flex;
  place-items: center!important;
  min-width: 320px;
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0 auto;
  max-width: 1280px;
  padding: 2rem;
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
import { ref, onMounted } from 'vue';
import ButtonPrimary from './views/button/button.vue';
import ButtonLoading from './views/button/loadingbutton.vue';
import avatar from './views/avatar/avatar.vue';
import imgUrl from './assets/image/avatar.png';
import DropSelect from "./views/dropselect/dropselect.vue"
import MyInput from './views/input/input.vue';

const value = ref('请输入');
const value1 = ref('输入文本');
const type = ref('');

onMounted(() => {
  // 获取地址栏参数
  // type == 'btnAble'
  const key = window.location.href.split('?')[1].split('=')[1];
  type.value = key;
});

// const isLoading = ref(false);

// function switchloading() {
//   isLoading.value = !isLoading.value;
// }
</script>
