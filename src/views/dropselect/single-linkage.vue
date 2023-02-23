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
  showFirst: Boolean,
  search: Boolean,
  group: Boolean,
  clearable: Boolean,
  disabled: Boolean,
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

// 控制下拉菜单出现和隐藏
const showFirst = ref(false);
const showSecond = ref(false);
const showThird = ref(false);

// 联动选择

const firstLevel = ref('');
const secondLevel = ref('');
const thirdLevel = ref('');
const levelSelected = ref([]);
const isdisabled = ref(false);
const toggle = (level: number) => {
  if (props.disabled) return;

  switch (level) {
    case 0:
      showFirst.value = !showFirst.value;
      break;
    case 1:
      showSecond.value = !showSecond.value;
      break;
    case 2:
      showThird.value = !showThird.value;
      break;
    default:
      break;
  }
};
const handleLevelSelect = (level: number, index: number, text: string) => {
  if (level === 0) {
    levelSelected.value = [];
    levelSelected.value.push(index);
    secondLevel.value = '';
    thirdLevel.value = '';
    firstLevel.value = text;
    showFirst.value = false;
    showSecond.value = true;
  } else if (level === 1) {
    levelSelected.value = [levelSelected.value[0]];
    levelSelected.value.push(index);
    secondLevel.value = text;
    thirdLevel.value = '';
    if (
      !levelList.value[levelSelected.value[0]].children[index].children ||
      levelList.value[levelSelected.value[0]].children[index].children
        .length === 0
    ) {
      thirdLevel.value = '';
      levelSelected.value.splice(2, 1);
    }
    showFirst.value = false;
    showSecond.value = false;
    showThird.value =
      levelList.value[levelSelected.value[0]].children[index].children &&
      levelList.value[levelSelected.value[0]].children[index].children.length >
        0;
      isdisabled.value = showThird.value === false ;  
  } else {
    levelSelected.value = [levelSelected.value[0], levelSelected.value[1]];
    levelSelected.value.push(index);
    thirdLevel.value = text;
    showFirst.value = false;
    showSecond.value = false;
    showThird.value = false;
  }
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
      <div class="firstlevel-wrapper">
        <div class="dropinput">
          <div
            class="dropinput--input-box"
            @click="toggle(0)"
            v-text="firstLevel"
            :placeholder="'请选择'"
          ></div>
          <div class="dropinput--select-arrow" @click="toggle(0)">
            <img
              src="../../assets/dropdown.svg"
              class="dropinput--select-arrow-down"
              v-if="showFirst == false"
            />
            <img
              src="../../assets/dropup.svg"
              class="dropinput--select-arrow-up"
              v-else
            />
          </div>
        </div>

        <div v-if="showFirst" class="--optionlist">
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
      </div>
      <div class="secondlevel-wrapper">
        <div class="dropinput">
          <div
            class="dropinput--input-box"
            @click="toggle(1)"
            v-text="secondLevel"
            :placeholder="'请选择'"
          ></div>

          <div class="dropinput--select-arrow" @click="toggle(1)">
            <img
              src="../../assets/dropdown.svg"
              class="dropinput--select-arrow-down"
              v-if="showFirst == false"
            />
            <img
              src="../../assets/dropup.svg"
              class="dropinput--select-arrow-up"
              v-else
            />
          </div>
        </div>

        <div
          v-if="
            showSecond &&
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
      </div>
      <div class="thirdlevel-wrapper" :class="isdisabled ? `disabled` : ''">
        <div class="dropinput">
          <div
            class="dropinput--input-box"
            @click="toggle(2)"
            v-text="thirdLevel"
            :placeholder="'请选择'"
          ></div>

          <div class="dropinput--select-arrow" @click="toggle(2)">
            <img
              src="../../assets/dropdown.svg"
              class="dropinput--select-arrow-down"
              v-if="showFirst == false"
            />
            <img
              src="../../assets/dropup.svg"
              class="dropinput--select-arrow-up"
              v-else
            />
          </div>
        </div>

        <div
          v-if="
            showThird &&
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
.common-wrapper {
  display: flex;
  flex-direction: row;
  .firstlevel-wrapper,
  .secondlevel-wrapper,
  .thirdlevel-wrapper {
    display: flex;
    flex-direction: column;
    .--optionlist {
      height: fit-content;
    }
  }
}
</style>
