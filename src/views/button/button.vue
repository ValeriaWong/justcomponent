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
    :class="[type ? `my-button-${type} text-color` : '']"
  >
    <span v-if="loading"
      ><img
        src="../../assets/loading.png"
        alt="loading"
        
      /><!--  put loading icon to this section --></span
    >
    <span v-else><slot>这是使用scss文件的button</slot></span>
  </button>
  <br />
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
  loading: {
    type: Boolean, // delete default value
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

.simple-button {
  /* 设置宽度自适应 */
  width: auto {

  }
  height: 35px {

  }

  /* 将按钮左右边距调大一些显得美观 */
  padding: 0 10px {

  }

  /* 居中 */
  text-align: center {

  }
  justify-content: center {

  }
  align-items: center {

  }

  /* 边框不显示 */
  border: none {

  }

  /* 圆角框 */
  border-radius: 3px {

  }

  /* 盒子阴影 */
  box-shadow: 0 0 3px gray {

  }
  font-family: inherit {

  }

  /* 鼠标变为小手标识 */
  cursor: pointer {

  }
  font-size: 14px;
}

.simple-button--primary {
  background-color: rgb(74 130 212);
}

.simple-button--info {
  background-color: rgb(163 191 233);
}

.simple-button--success {
  background-color: rgb(92 218 180);
}

.simple-button--warning {
  background-color: rgb(221 219 77);
}

.simple-button--danger {
  background-color: rgb(233 56 56);
}

// .text-color {
//   color: rgb(250, 250, 250);
// }
</style>
