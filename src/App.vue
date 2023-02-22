<template>
  <Space wrap>
    <div class="btn-wrapper">
      <div class="btn-able-wrapper" v-if="type == 'btnAble'">
        <div>
          <JustButton type="primary">主要按钮</JustButton>
          <JustButton type="secondary">次级按钮</JustButton>
          <JustButton type="revert">回退按钮</JustButton>
          <JustButton type="icon"></JustButton>
          <JustButton type="icon" icon="clear"></JustButton>
          <JustButton type="icon" icon="download"></JustButton>
        </div>

        <JustButton type="danger">危险按钮</JustButton>
      </div>
      <div class="btn-disable-wrapper" v-if="type == 'btnDisable'">
        <div>
          <JustButton disabled>默认按钮</JustButton>
          <JustButton type="primary" disabled>主要按钮</JustButton>
          <JustButton type="secondary" disabled>次级按钮</JustButton>
          <JustButton type="revert" disabled>回退按钮</JustButton>
          <JustButton type="warning" disabled>警告按钮</JustButton>
          <JustButton type="danger" disabled>危险按钮</JustButton>
        </div>

        <div>
          <JustButton plain disabled>朴素按钮</JustButton>
          <JustButton type="primary" plain disabled>主要按钮</JustButton>
          <JustButton type="secondary" plain disabled>成功按钮</JustButton>
          <JustButton type="revert" plain disabled>信息按钮</JustButton>
          <JustButton type="warning" plain disabled>警告按钮</JustButton>
          <JustButton type="danger" plain disabled>危险按钮</JustButton>
        </div>
      </div>
      <div v-if="type == 'btnIcon'">
        <JustButton type="icon"></JustButton>
        <JustButton type="icon" icon="clear"></JustButton>
        <JustButton type="icon" icon="download"></JustButton>
      </div>
      <div>
        <div class="btn-shape-wrapper" v-if="type == 'btnShape'">
          <div>
            <JustButton round="square">方角</JustButton>
            <JustButton round="round">圆角</JustButton>
            <JustButton round="other1">平行四边形</JustButton>
            <JustButton round="other2">椭圆</JustButton>
            <JustButton round="other3">平行四边形</JustButton>
            <JustButton round="other4">活力标题</JustButton>
          </div>
        </div>
        <div class="btn-size-wrapper" v-if="type == 'btnSize'">
          <div>
            <JustButton type="primary" size="S">主要按钮</JustButton>
            <JustButton type="primary" size="M">主要按钮</JustButton>
            <JustButton type="primary" size="L">主要按钮</JustButton>
          </div>

          <div>
            <JustButton type="secondary" size="S">次级按钮</JustButton>
            <JustButton type="secondary" size="M">次级按钮</JustButton>
            <JustButton type="secondary" size="L">次级按钮</JustButton>
          </div>

          <div>
            <JustButton type="revert" size="S">回退按钮</JustButton>
            <JustButton type="revert" size="M">回退按钮</JustButton>
            <JustButton type="revert" size="L">回退按钮</JustButton>
          </div>
        </div>
        <div class="btn-loading-wrapper" v-if="type == 'btnLoading'">
          <div style="display: flex">
            <!--防止点击后更换位置，需要在父级块状元素处增加style="display: flex;"-->
            <JustButtonLoading type="primary"
              >点击切换loading的主要按钮</JustButtonLoading
            >
            <JustButtonLoading type="secondary"
              >点击切换loading的次级按钮</JustButtonLoading
            >
            <JustButtonLoading type="revert"
              >点击切换loading的回退按钮</JustButtonLoading
            >
            <!-- component event should use emit, default event like 'click' may block -->
          </div>
        </div>
      </div>
    </div>
    <div class="input-wrapper" v-if="type == 'input'">
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
    <div class="avatar-wrapper" v-if="type == 'avatar'">
      <div class="avatar_test">
        <div class="c1">
          <JustAvatar :src="imgUrl" size="small" alt="小头像" />
          <JustAvatar :src="imgUrl" size="default" />
          <JustAvatar :src="imgUrl" size="large" />
          <JustAvatar :src="imgUrl" :size="100" isRotated="isRotated" />
        </div>

        <div class="c2">
          <JustAvatar :src="imgUrl" size="small" shape="square" />
          <JustAvatar :src="imgUrl" size="default" shape="square" />
          <JustAvatar :src="imgUrl" size="large" shape="square" />
          <JustAvatar :src="imgUrl" :size="100" shape="square" />
        </div>

        <div class="c3">
          <JustAvatar size="small">Hi</JustAvatar>
          <JustAvatar size="default">Hi</JustAvatar>
          <JustAvatar size="large">Hi</JustAvatar>
          <JustAvatar :size="100">Hi</JustAvatar>
        </div>

        <div class="c4">
          <JustAvatar size="small" shape="square">Hi</JustAvatar>
          <JustAvatar size="default" shape="square">Hi</JustAvatar>
          <JustAvatar size="large" shape="square">Hi</JustAvatar>
          <JustAvatar :size="100" shape="square">Hi</JustAvatar>
        </div>

        <div class="c5">
          <JustAvatar size="small" color="red">Hi</JustAvatar>
          <JustAvatar size="default" color="white" background-color="gray"
            >Hi</JustAvatar
          >
          <JustAvatar size="large" background-color="gray">Hi</JustAvatar>
          <JustAvatar :size="100" background-color="gray">Hi</JustAvatar>
        </div>
      </div>
    </div>

    <div class="dropselect-wrapper">
      <div v-if="type == 'dropselect'">
        <JustDropSelect type="multiple" />
        <JustDropSelect type="multiple" disabled />
        <JustDropSelect type="multiple-search" />

        <JustDropSelect type="single" />
        <JustDropSelect type="single" disabled />

        <JustDropSelect type="single-group" />
        <JustDropSelect type="single-description" />

        <JustDropSelect type="single-cascader" />
        <JustDropSelect type="single-linkage" />
      </div>
      <div v-if="type == 'dropselect-single-group'">
        <JustDropSelect type="single-group" />
      </div>
      <div v-if="type == 'dropselect-multiple'">
        <JustDropSelect type="multiple" />
        <JustDropSelect type="multiple" disabled />
        <JustDropSelect type="multiple-search" />
      </div>
      <div v-if="type == 'dropselect-mutiple-search'">
        <JustDropSelect type="multiple-search" />
      </div>
      <div v-if="type == 'dropselect-single-cascader'">
        <JustDropSelect type="single-linkage" />
      </div>
      <div v-if="type == 'cascader'">
        <JustDropSelect type="single-cascader" />
        <JustDropSelect type="single-cascader" disabled />
      </div>
    </div>

  </Space>
</template>

<style lang="scss" scoped>
body {
  margin: 0;
  display: flex;
  place-items: center !important;
  min-width: 320px;
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
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
import JustButton from './views/button/button.vue';
import JustButtonLoading from './views/button/loadingbutton.vue';
import JustAvatar from './views/avatar/avatar.vue';
import imgUrl from './assets/image/avatar.png';
import JustDropSelect from './views/dropselect/dropselect.vue';
import JustInput from './views/input/input.vue';

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
