<script lang="ts" setup>
import JustDropSelect from '../views/dropselect/dropselect.vue';

</script>

<template>
<space wrap>
    <div class="dropselect-wrapper">
       
      <span>
        单选
        <JustDropSelect type="single" />
        <JustDropSelect type="single" disabled />
      </span>
      <span>
        多选
        <JustDropSelect type="multiple" />
        <JustDropSelect type="multiple" disabled />
      </span> 
      <span>
        多选+搜索
        <JustDropSelect type="multiple-search" />
        <JustDropSelect type="multiple-search" disabled/>
      </span>
      <span>
        单选+分组
        <JustDropSelect type="single-group" />
        单选+带描述
        <JustDropSelect type="single-description" />
      </span>
      <span>
        级联选择
        <JustDropSelect type="single-cascader" />
      </span>
      <span>
          联动选择
        <JustDropSelect type="single-linkage" />
      </span>
      
    </div>
</space>
</template>
<style lang="scss">
@import '../styles/common/themes.module.scss';
.dropselect-wrapper{
  text-align: left;
  // flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  color:$--color-primary;
  // span {
  //   padding-left: 50px;
  // }
}

</style>