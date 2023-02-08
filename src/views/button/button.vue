<!-- // button.vue -->
<template>
  <!-- <button
    class="simple-button"
    :class="[type ? `simple-button--${type} text-color` : '']"
  >
    <span><slot>这是style样式按钮</slot></span>
  </button> -->
  <button
    class="my-button"
    :class="[type ? `my-button-${type}` : '', size ? `my-button-${size}` : '',round ? `my-button--${round}` : '']"
  >
    <span v-if="loading"
      ><img
        src="../../assets/loading.png"
        alt="loading"
      /><!--  put loading icon to this section --></span
    >
    <span v-else><slot>这是使用scss文件的button</slot></span>
  </button>
</template>

<script lang="ts" setup>
// 工具函数，用于判断传入的值是否符合条件
// import { oneOf } from "../../utils/assist";
import { defineProps } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'M',
  },
  loading: {
    type: Boolean, // delete default value
  },
  round: {
    type: String,
    default: 'square',
  },
  iconPlacement: {
    type: String,
    default: 'left',
  },
});

// export default {
//   name: "ButtonPrimary",
//   data() {
//     return {};
//   },
// props: {
//   type: {
//     // validator(value: any) {
//       return oneOf(value, [
//         "primary",
//         "info",
//         "success",
//         "warning",
//         "text",
//         "error",
//       ]);
//     },
//     type: String,
//     default: "primary",
//   },
// },
// };
</script>
<!-- <script>
  export default {
    name: "ButtonPrimary",
    data() {
      return {};
    },
  };
  </script> -->
<style lang="scss">
@import '../../styles/index';

.my-button {
  @include button-wrapper;
}
</style>
