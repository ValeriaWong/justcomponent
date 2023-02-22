<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { areaList } from '@vant/area-data';
import MyInput from '../input/input.vue';

const props = defineProps({
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
    //     'single-cascader', //联动选择
    //     'single-group',
    //     'single-description',
    //     'multiple',
    //     'multiple-search',
    //   ]);
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

const optionActive = ref(false);
// 控制下拉菜单出现和隐藏
const show = ref(false);
const toggle = () => {
  if (props.disabled) return;
  show.value = !show.value;
};

// 多选
const selected = ref([]);
const searchData = ref('');
const handleClick = (cityName: string, index: number) => {
  if (props.disabled) return;
  optionActive.value = !optionActive.value;
  const len = selected.value.length;
  if (selected.value.indexOf(cityName) === -1) {
    selected.value.push(cityName);
  } else if (selected.value.indexOf(cityName) !== -1 && len > 1) {
    selected.value.splice(index, 1);
  } else {
    selected.value.pop();
  }
};
const formatList = (rawData: Record<string, string>) => {
  if (searchData.value === '') {
    return rawData;
  }
  const tmpData = JSON.parse(JSON.stringify(rawData));
  Object.keys(rawData).forEach((key) => {
    if (rawData[key].indexOf(searchData.value) === -1) {
      delete tmpData[key];
    }
  });
  return tmpData;
};
const clearByIndex = (index: number) => {
  selected.value.splice(index, 1);
};
// 全部清空选项
const clearable = () => {
  selected.value = [];
};
</script>

<template>
  <div
    class="my-dropselect"
    :class="[
      type ? `my-dropselect-${type}` : '',
      size ? `my-dropselect-${size}` : '',
    ]"
  >
    <div class="common-wrapper" :class="disabled ? 'disabled' : ''">
      <div class="dropinput">
        <!-- v-text="formatData" -->
        <div
          class="dropinput--input-box"
          :disabled="props.disabled"
          @focus="!props.disabled ? (show = true) : ''"
          :placeholder="type"
          @click="toggle()"
        >
          <div
            class="dropinput--muti-option-box"
            v-for="(item, iIndex) in selected"
            :key="iIndex"
          >
            <span class="dropinput--muti-option-box--text" v-text="item"></span>
            <span @click="clearByIndex(iIndex)">x</span>
          </div>
        </div>
        <!-- v-if=" type == 'single' || type == 'single-group' || type == 'single-description' || type == 'single-cascader' " -->

        <div class="dropinput--select-arrow" @click="toggle()">
          <img
            src="../../assets/dropdown.svg"
            class="dropinput--select-arrow-down"
            v-if="show == false"
          />
          <img
            src="../../assets/dropup.svg"
            class="dropinput--select-arrow-up"
            v-else
          />
        </div>

        <img
          src="../../assets/clearable.svg"
          class="dropinput--clearable"
          @click="clearable()"
          v-if="selected.length != 0"
        />
      </div>

      <div v-if="show" class="--optionlist">
        <div class="--optionlist--search-box">
          <my-input
            icon="search"
            v-if="type === 'multiple-search'"
            v-model="searchData"
          ></my-input>
        </div>

        <div class="--optionlist-item-box">
          <div
            class="--optionlist-item"
            :class="{ active: selected.indexOf(city) != -1 }"
            v-for="(city, index, $index) in formatList(areaList.city_list)"
            :key="index"
            @click="handleClick(city, $index)"
          >
            <input
              class="--optionlist-item-checkbox"
              type="checkbox"
              :checked="selected.indexOf(city) != -1"
            />
            <span class="--optionlist-item-content" v-text="city"></span
            ><span
              class="--optionlist-item-selected"
              v-if="selected.indexOf(city) != -1"
            ></span>
          </div>
        </div>
        <div class="--optionlist-clear-options" @click="clearable()">
          <slot><img src="../../assets/clearoption.svg" />清空选项 </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/index';
@include dropselect-wrapper;
</style>
