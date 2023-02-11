<script lang="ts" setup>
import { ref} from 'vue';
// import { IosArrowDown } from "@vicons/ionicons4";
// import { CloseCircleOutline } from "@vicons/ionicons5";
// import { Check } from "@vicons/tabler";
import { selectProps, selectEmits, useSelect } from "./index";

const props = defineProps(selectProps);
const emits = defineEmits(selectEmits);
const selectRef = ref();
const {
  options,
  modelValue,
  
  multiple,
} = useSelect(props);
/* @ts-ignore */
const handleOptionClick = (item) => {
  if (!item.disabled) {
    if (multiple.value) {
      const isRemove = modelValue.value.includes(item.value)
        ? modelValue.value.splice(modelValue.value.indexOf(item.value), 1)
        : modelValue.value.push(item.value);
      emits("update:modelValue", modelValue.value);
      emits("change", modelValue.value);
    }
    if (!multiple.value) {
      selectRef.value.blur();
      emits("update:modelValue", item.value);
      emits("change", item.value);
    }
  }
};
/* @ts-ignore */
const handleClear = (e) => {
  if (!multiple.value) {
    emits("update:modelValue", "");
    emits("clear", "");
  }
  if (multiple.value) {
    const value = options.value.find((v) => v.label === e)?.value;
    if (modelValue.value.indexOf(value) > -1) {
      modelValue.value.splice(modelValue.value.indexOf(value), 1);
    } else {
      modelValue.value.splice(0, modelValue.value.length);
    }
    emits("update:modelValue", modelValue.value);
    emits("clear", modelValue.value);
  }
};
/* @ts-ignore */
const model = ref('');
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

<script lang="ts" setup>
import { ref ,watch } from 'vue'

const todoId = ref(0)
const inputData = ref(0)
const selectdatalist = ref([])

async function fetchData() {
  
  const res = await fetch(
    // `https://suggest.taobao.com/sug?${inputData.value}`
    `https://jsonplaceholder.typicode.com/todos/${inputData.value}`
  )
  selectdatalist.value = await res.json()
  console.log(inputData.value)
}
watch(todoId,(inputData)=>{
  fetchData()
  
})
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
  <input type="number" @input="fetchData" v-model="inputData" />
  <select
    filterable
    clearable
    style="width: 240px" 
    placeholder="input search text"
    remote
    @click="fetchData" 
  >
    <Option v-for="item in selectdatalist" :value="item.title" :key="item.userID">{{
      item.title
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
