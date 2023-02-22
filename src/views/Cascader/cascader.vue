<script setup lang="ts">
import { ref, defineProps } from 'vue';

const levelList = ref([
  {
    text: '浙江省',
    children: [
      { text: '杭州', children: [{ text: '1' }, { text: '2' }, { text: '3' }] },
      { text: '温州', children: [{ text: '4' }, { text: '5' }, { text: '6' }] },
    ],
  },
  {
    text: '江苏省',
    children: [
      { text: '苏州', children: [{ text: '1' }, { text: '2' }] },
      { text: '昆山', children: [] },
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
    //     'multiple',
    //     'multiple-search',
    //     'multiple-group',
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

// 控制下拉菜单出现和隐藏
const show = ref(false);
const toggle = () => {
  if (props.disabled) return;
  show.value = !show.value;
};
// 单选
const single = ref();
// const handleSingleClick = (cityName: string) => {
//   single.value = cityName;
// };

// 级联选择

const levelSelected = ref([]);
const handleLevelSelect = (level: number, index: number, text: string) => {
  let tmp;
  if (single.value && single.value.indexOf('/') === -1) {
    tmp = [single.value];
  } else if (single.value && single.value.indexOf('/') !== -1) {
    tmp = single.value.split('/');
  } else {
    tmp = [];
  }

  if (level === 0) {
    levelSelected.value = [];
    levelSelected.value.push(index);
    tmp.push(text);
  } else if (level === 1) {
    levelSelected.value = [levelSelected.value[0]];
    levelSelected.value.push(index);
    tmp = [tmp[0], text];
  } else {
    levelSelected.value = [levelSelected.value[0], levelSelected.value[1]];
    levelSelected.value.push(index);
    tmp = [tmp[0], tmp[1], text];
  }

  single.value = tmp.join('/');
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
        <div
          class="dropinput--input-box"
          @click="toggle()"
          v-text="single"
          :placeholder="type"
        ></div>

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
      </div>

      <div class="panel-container">
        <div v-if="show" class="--optionlist" style="border: none !important">
          <div v-for="(first, fIndex) in levelList" :key="fIndex">
            <div
              class="--optionlist-item"
              :class="{ active: fIndex == levelSelected[0] }"
              :key="fIndex"
              @click="handleLevelSelect(0, fIndex, first.text)"
            >
              <span v-text="first.text"></span>
            </div>
          </div>
        </div>

        <div
          v-if="
            show &&
            levelSelected.length > 0 &&
            levelList[levelSelected[0]].children.length > 0
          "
          class="--optionlist"
        >
          <div
            class="--optionlist-item"
            v-for="(item, index) in levelList[levelSelected[0]].children"
            :key="index"
            :class="{ active: index == levelSelected[1] }"
            @click="handleLevelSelect(1, index, item.text)"
          >
            <span v-text="item.text"></span>
          </div>
        </div>

        <div
          v-if="
            show &&
            levelSelected.length > 1 &&
            levelList[levelSelected[0]].children[levelSelected[1]].children
              .length > 0
          "
          class="--optionlist"
        >
          <div
            class="--optionlist-item"
            v-for="(item, index) in levelList[levelSelected[0]].children[
              levelSelected[1]
            ].children"
            :key="index"
            :class="{ active: index == levelSelected[2] }"
            @click="handleLevelSelect(2, index, item.text)"
          >
            <span v-text="item.text"></span>
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
