<script setup lang="ts">
import { ref, defineProps } from 'vue';

const groupareaList = ref([
  {
    label: '浙江省',
    children: [
      { text: '杭州', description: '是一个好地方' },
      { text: '温州', description: '是一个好地方' },
      { text: '嘉兴', description: '是一个好地方' },
      { text: '宁波', description: '是一个好地方' },
    ],
  },
  {
    label: '江苏省',
    children: [
      { text: '苏州', description: '是一个好地方' },
      { text: '昆山', description: '是一个好地方' },
      { text: '南京', description: '是一个好地方' },
    ],
  },
]);

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
    //     'single-cascader',
    //     'single-group',
    //     'single-description',
    //   ]);
    // },
    default: 'single',
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

// 控制下拉菜单出现和隐藏
const show = ref(false);
const toggle = () => {
  if (props.disabled) return;
  show.value = !show.value;
};

// 单选
const single = ref();
const handleSingleClick = (cityName: string) => {
  single.value = cityName;
};

const clearable = () => {
  single.value = undefined;
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
    <!-- single -->
    <div class="common-wrapper" :class="disabled ? 'disabled' : ''">
      <div class="dropinput">
        <input
          class="dropinput--input-box"
          @click="toggle()"
          v-model="single"
          :placeholder="type"
        />

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
          v-if="single != undefined"
        />
      </div>

      <div v-if="show" class="--optionlist">
        <div v-for="(groupItem, index) in groupareaList" :key="index">
          <div
            v-if="type == 'single-group'"
            class="groupName"
            v-text="groupItem.label"
          ></div>
          <div
            class="--optionlist-item"
            :class="{ active: city.text == single }"
            v-for="(city, cIndex) in groupItem.children"
            :key="cIndex"
            @click="handleSingleClick(city.text)"
          >
            <span v-text="city.text"></span
            ><span
              class="--optionlist-item-selected"
              v-if="city.text == single"
            ></span
            ><span
              class="--optionlist-item-description"
              v-text="city.description"
              v-if="type == 'single-description'"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/index';
@include dropselect-wrapper;
</style>
