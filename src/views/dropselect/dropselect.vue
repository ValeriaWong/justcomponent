<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { areaList } from '@vant/area-data';
import MyInput from '../input/input.vue';

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
const optionActive = ref(false);
// 单选
const single = ref();
const handleSingleClick = (cityName: string) => {
  single.value = cityName;
};

// 联动选择


const levelSelected = ref([0]);
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
    // setCascaderBox.value='width: 255px!important;';
  }
  single.value = tmp.join('/');
};

// 多选
// const show = ref(false);
const selected = ref([]);
// const levelSelected = ref([0, 1,2]);
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

const handleInput = (e: any) => {
  // eslint-disable-next-line no-console
  console.log('handleInput::', e);
};
const searchData = ref('');

const clearByIndex = (index: number) => {
  selected.value.splice(index, 1);
};

const clearable = () => {
  selected.value = [];
  single.value = undefined;
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

// const getPanelData = (level: Number) => {
//   let data = [];
//   if (level === 0) {
//     data = levelList.value;
//   } else if (level === 1) {
//     data = levelList.value[levelSelected.value[0]].children;
//   } else {
//     data =
//       levelList.value[levelSelected.value[0]].children[levelSelected.value[1]]
//         .children;
//   }

//   return data;
// };
</script>

<template>
  <div
    class="my-dropselect"
    :class="[
      type ? `my-dropselect-${type}` : '',
      size ? `my-dropselect-${size}` : '',
    ]"
  >
    <div
      class="common-wrapper"
      :class="disabled ? 'disabled' : ''"
      v-if="type == 'multiple' || type === 'multiple-search'"
    >
      <div class="dropinput">
        <div
          class="dropinput--input-box"
          :disabled="props.disabled"
          @focus="!props.disabled ? (show = true) : ''"
          :placeholder="type"
          @input="handleInput"
          contenteditable="true"
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
      <div class="--optionlist" v-if="show">
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
            <span class="--optionlist-item-content" v-text="city"></span>
          </div>
        </div>
        <div class="--optionlist-clear-options" @click="clearable()">
          <slot><img src="../../assets/clearoption.svg" />清空选项 </slot>
        </div>
      </div>
    </div>

    <!-- single -->
    <div
      class="common-wrapper"
      v-else-if="
        type == 'single' ||
        type == 'single-group' ||
        type == 'single-description'
      "
      :class="disabled ? 'disabled' : ''"
    >
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

    <!-- type == 'single-cascader' -->
    <div v-else class="common-wrapper" :class="disabled ? 'disabled' : ''">
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
        <!-- <div
          v-for="(level, index) in levelSelected"
          :key="index"
          v-show="show"
          class="--optionlist"
          :style="setCascaderBox"
        >
          <div v-for="(item, fIndex) in getPanelData(level)" :key="fIndex">
            <div
              :class="{ active: fIndex == levelSelected[level] }"
              :key="fIndex"
              @click="handleLevelSelect(level, fIndex, item.text)"
            >
              <span v-text="item.text"></span>
            </div>
          </div>
        </div> -->

        <div v-if="show" class="--optionlist" style="border:none!important;">
          <div v-for="(first, fIndex) in levelList" :key="fIndex">
            <div class="--optionlist-item"
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
          <div class="--optionlist-item"
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
          <div class="--optionlist-item"
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
