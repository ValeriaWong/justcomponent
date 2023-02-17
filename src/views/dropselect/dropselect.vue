<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { areaList } from '@vant/area-data';

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

const optionActive = ref(false);
// 单选
const single = ref();
const show = ref(false);
const handleSingleClick = (cityName: string) => {
  single.value = cityName;
};

// 级联选择

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
// const formatData = computed(() => selected.value.join(','));
const handleInput = (e: any) => {
  // eslint-disable-next-line no-console
  console.log('handleInput::', e);
};

const toggle = () => {
  if (props.disabled) return;
  show.value = !show.value;
};

const clearable = () => {
  selected.value = [];
  single.value = undefined;
};
// const removeClick = ()=> {
//   show.value=!show.value;
//   // selected.value.splice(index, 1);
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
      v-if="
        type == 'multiple' ||
        type == 'multiple-group' || //多选有分类
        type === 'multiple-search'
      "
    >
      <div class="dropinput">
        <!-- v-text="formatData" -->
        <div
          class="dropinput--input-box"
          :disabled="props.disabled"
          @focus="!props.disabled ? (show = true) : ''"
          placeholder="select multiple"
          @input="handleInput"
        >
        
        <span class="dropinput--muti-option-box" v-text = "selected[-1]" ></span>
        <img
          src="../../assets/clearable.svg"
          class="dropinput--clearable"
          @click="clearable()"
          v-if="selected.length != 0"
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
      </div>
    </div>
      <div class="--optionlist" v-if="show">
        <input type="text" v-if="type === 'multiple-search'"/>
        <div
          class="--optionlist-item"
          :class="{ active: selected.indexOf(city) != -1 }"
          v-for="(city, index, $index) in areaList.city_list"
          :key="index"
          @click="handleClick(city, $index)"
        >
          <span v-text="city"></span
          ><span
            class="--optionlist-item-selected"
            v-if="selected.indexOf(city) != -1"
          ></span>
        </div>
      </div>
    </div>

    <!-- single -->
    <div
      class="common-wrapper"
      v-if="
        type == 'single' ||
        type == 'single-group' ||
        type == 'single-description' ||
        type == 'single-cascader'
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
        <img
          src="../../assets/clearable.svg"
          class="dropinput--clearable"
          @click="clearable()"
          v-if="single != undefined"
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
      </div>

      <div v-if="show" class="--optionlist">
        <div v-if="type == 'single-cascader'" class="--optionlist-cascader">
          <div v-for="(city, index) in areaList.city_list" :key="index">
            <!-- <div class="groupName" v-text="group.label"></div> -->
            <div
              class="--optionlist-item"
              :class="{ active: city == single }"
              :key="index"
              @click="handleSingleClick(city)"
            >
              <span v-text="city"></span
              ><span
                class="--optionlist-item-selected"
                v-if="city == single"
              ></span>
            </div>
          </div>
        </div>
        <div v-else v-for="(group, index) in groupareaList" :key="index">
          <div
            v-if="type == 'single-group'"
            class="groupName"
            v-text="group.label"
          ></div>
          <div
            class="--optionlist-item"
            :class="{ active: city.text == single }"
            v-for="(city, cIndex) in group.children"
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
