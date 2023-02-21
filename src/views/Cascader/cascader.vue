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
const setCascaderBox = ref('');

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
    setCascaderBox.value = 'width: 170px!important;';
  } else if (level === 1) {
    levelSelected.value = [levelSelected.value[0]];
    levelSelected.value.push(index);
    tmp = [tmp[0], text];
    setCascaderBox.value = 'width: 255px!important;';
  } else {
    levelSelected.value = [levelSelected.value[0], levelSelected.value[1]];
    levelSelected.value.push(index);
    tmp = [tmp[0], tmp[1], text];
    // setCascaderBox.value='width: 255px!important;';
  }

  single.value = tmp.join('/');
};


// 全部清空选项
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
    <div class="common-wrapper" :class="disabled ? 'disabled' : ''">
      <div class="dropinput">
        <!-- v-text="formatData" -->

        <!-- v-if=" type == 'single' || type == 'single-group' || type == 'single-description' || type == 'single-cascader' " -->
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

        <img
          src="../../assets/clearable.svg"
          class="dropinput--clearable"
          @click="clearable()"
          v-if="single != undefined"
        />
      </div>
      <div v-if="show">
        <div class="--optionlist-cascader" :style="setCascaderBox">
          <div v-for="(first, fIndex) in levelList" :key="fIndex">
            <div
              :class="{ active: fIndex == levelSelected[0] }"
              :key="fIndex"
              @click="handleLevelSelect(0, fIndex, first.text)"
            >
              <span v-text="first.text"></span
              ><span class="--optionlist-nextlevel"
                ><slot><img src="../../assets/nextpage.svg" /></slot
              ></span>
            </div>

            <div
              v-show="
                levelSelected.length > 0 &&
                first.children.length > 0 &&
                fIndex == levelSelected[0]
              "
              v-for="(second, sIndex) in first.children"
              :key="sIndex"
            >
              <div
                :class="{ active: second == levelSelected[1] }"
                :key="sIndex"
                @click="handleLevelSelect(1, sIndex, second.text)"
              >
                <span v-text="second.text"></span
                ><span class="--optionlist-nextlevel"
                  ><slot><img src="../../assets/nextpage.svg" /></slot
                ></span>
              </div>

              <div
                v-show="
                  levelSelected.length > 1 &&
                  second.children.length > 0 &&
                  sIndex == levelSelected[1]
                "
                v-for="(last, lIndex) in second.children"
                :key="lIndex"
              >
                <div
                  class="--optionlist-item-third"
                  :class="{ active: last == levelSelected[2] }"
                  :key="lIndex"
                  @click="handleLevelSelect(2, lIndex, last.text)"
                >
                  <span v-text="last.text"></span
                  ><span
                    class="--optionlist-item-selected"
                    v-if="lIndex == levelSelected[2]"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/index';
@include cascader-wrapper;
</style>
