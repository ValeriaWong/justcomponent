<template>
  <span class="avatar" :class="classes" :style="styles">
    <img v-if="src && !hasLoadError" :src="src" :alt="alt" @error="onError" />
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  size: {
    type: [String, Number],
    default: 'default',
  },
  src: {
    type: String,
    default: '',
  },
  shape: {
    type: String,
    default: 'circle',
  },
  // eslint-disable-next-line vue/require-default-prop
  alt: {
    type: String,
  },
  // eslint-disable-next-line vue/require-default-prop
  color: {
    type: String,
  },
  // eslint-disable-next-line vue/require-default-prop
  backgroundColor: {
    type: String,
  },
});

const emits = defineEmits(['error']);

const hasLoadError = ref(false);

// eslint-disable-next-line vue/no-setup-props-destructure
const { size, shape, color, backgroundColor } = props;

const classes = computed(() => ({
  [`avatar--${size}`]: typeof size === 'string',
  [`avatar--${shape}`]: typeof shape === 'string',
  // [`avatar--${isRotate}`]: true
}));

const styles = computed(() => ({
  width: typeof size === 'number' ? `${size}px` : '',
  height: typeof size === 'number' ? `${size}px` : '',
  color,
  backgroundColor,
}));

watch(
  () => props.src,
  // eslint-disable-next-line no-return-assign
  () => (hasLoadError.value = false)
);

const onError = (e: Event) => {
  emits('error', e);
};
</script>

<script lang="ts">
export default {
  name: 'Avatar',
};
</script>

<style lang="scss" scoped>
$font-size: 15px;
$small-size: 25px;
$default-size: 40px;
$large-size: 55px;

$white: #fff;
// 从这里修改默认背景色
$default-background: rgb(34, 167, 242);

.avatar {
  margin: 1px;
  background-color: $default-background;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size;
  color: $white;

  > img {
    width: 100%;
    height: 100%;
  }

  //class添加"avatar--isRotated" 实现头像旋转
  &--isRotated {
    transition: all 2s;
  }
  &:hover {
    transform: rotate(360deg);
  }

  //尺寸大小
  &--default {
    width: $default-size;
    height: $default-size;
  }
  &--small {
    width: $small-size;
    height: $small-size;
  }
  &--large {
    width: $large-size;
    height: $large-size;
  }

  //圆还是方
  &--circle {
    border-radius: 100%;

    > img {
      border-radius: 100%;
    }
  }
  &--square {
    border-radius: 10px;

    > img {
      border-radius: 10px;
    }
  }
}
</style>
