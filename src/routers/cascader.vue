<script lang="ts" setup>
import JustCacsader from '../views/Cascader/cascader.vue';
import JustDropSelect from '../views/dropselect/drop-select.vue';
</script>
<template>
  <space wrap>
    <div class="cascader-wrapper">
      <JustCacsader />
      <JustCacsader disabled />
      <JustDropSelect type="single-cascader" />
      <JustDropSelect type="single-cascader" disabled />
    </div>
  </space>
</template>
<style lang="scss">
@import '../styles/common/themes.module.scss';
.cascader-wrapper {
  text-align: left;
  //   flex-direction: row;
  //   display: flex;
  //   flex-wrap: wrap;
  color: $--color-primary;
  // span {
  //   padding-left: 50px;
  // }
}
</style>
