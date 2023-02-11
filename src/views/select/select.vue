<script lang="ts" setup>

const cityList = [
  {
    value: 'New York',
    label: 'New York',
  },
  {
    value: 'London',
    label: 'London',
  },
  {
    value: 'Sydney',
    label: 'Sydney',
  },
  {
    value: 'Ottawa',
    label: 'Ottawa',
  },
  {
    value: 'Paris',
    label: 'Paris',
  },
  {
    value: 'Canberra',
    label: 'Canberra',
  },
];
</script>

<script lang="ts">
export default {
  name: "SelectPrimary",
};
</script>
<template>

  <select
    filterable
    clearable
    prefix="ios-home"
    style="width: 240px"
  >
     
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
      item.label
    }}</Option>
  </select> 
  

  

  <select disabled name="default">
    <option>wer</option>
    <option>1</option>
    <option>1sdf f wesdf</option>
  </select>
  <select name="group">
    <optgroup label="one">
      <option>wer</option>
      <option>1</option>
      <option>1sdf f wesdf</option>
    </optgroup>
    <optgroup label="two">
      <option>wer</option>
      <option>1</option>
      <option>1sdf f wesdf</option>
    </optgroup>
  </select>
  <select name="group multiple" multiple size="8">
    <optgroup label="one">
      <option>df</option>
      <option disabled>1</option>
      <option>1sdf f wesdf</option>
    </optgroup>
    <optgroup label="two">
      <option>wer</option>
      <option>1</option>
      <option>1sdf f wesdf</option>
    </optgroup>
  </select>
</template>

<style lang="scss">
@import '../../styles/index';
.my-select {
  @include select-wrapper;
}
</style>
