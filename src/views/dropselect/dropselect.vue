<script setup lang="ts">
import { defineProps } from 'vue';
import singleDropselct from './single-dropselct.vue';
import cascader from '../cascader/cascader.vue';
import multipleDropselect from './multiple-dropselect.vue';
import singleLinkage from './single-linkage.vue';

defineProps({
  show: Boolean,
  search: Boolean,
  group: Boolean,
  clearable: Boolean,
  disabled: Boolean,
  placement: {
    type: String,
    // validator(value) {
    //   return oneOf(value, [
    //     'left-bottom', //常规位置,控件位置在左侧,下方左对⻬
    //     'right-bottom', //当控件位置在浏览器右侧,且内容宽度被浏览器遮挡。下方右对⻬
    //     'left-top', //当控件位置在左下⻆,并且内容易被遮挡,上方左对⻬
    //     'right-top', //当控件位置在右下⻆,并且内容易被遮挡,上方右对⻬
    //     'left-aside', //当下拉菜单过高,且上下位置不可展示,可侧边展开菜单
    //     'right-aside',
    //   ]);
    // },
    default: 'left-bottom',
  },
  type: {
    type: String,
    // validator(value) {
    //   return oneOf(value, [
    //     'single',
    //     'single-group',
    //     'single-description',
    //     'single-cascader',
    //     'single-linkage',
    //     'multiple',
    //     'multiple-search', ]);
    // },
    default: 'multiple',
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  size: {
    // L,M,S
    type: String,
    default: 'M',
  },
});
</script>

<template>
  <div
    class="my-dropselect"
    :class="[
      type ? `my-dropselect-${type}` : '',
      size ? `my-dropselect-${size}` : '',
    ]"
  >
    <!-- multiple -->
    <multipleDropselect
      v-if="type == 'multiple' || type === 'multiple-search'"
      :disabled="disabled"
      :size="size"
      :type="type"
    ></multipleDropselect>

    <!-- single -->
    <singleDropselct
      v-else-if="
        type == 'single' ||
        type == 'single-group' ||
        type == 'single-description'
      "
      :disabled="disabled"
      :size="size"
      :type="type"
    ></singleDropselct>

    <!-- single-cascader -->
    <cascader
      v-else-if="type == 'single-cascader'"
      :disabled="disabled"
      :size="size"
      :type="type"
    ></cascader>

    <!-- 联动选择 -->
    <singleLinkage
      v-else
      :disabled="disabled"
      :size="size"
      :type="type"
    ></singleLinkage>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/index';
@include dropselect-wrapper;
</style>
