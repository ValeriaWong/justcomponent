<!-- eslint-disable no-unused-vars -->
<template>
  <div :class="classes">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <input
        ref="input"
        :disabled="disabled"
        :type="type"
        class="my-input-inner"
        autocomplete="off"
        :readonly="readonly"
        :value="nativeInputValue"
        @input="onChange"
        @blur="onBlur"
        @focus="onFocus"
        :placeholder="placeholder"
      />
      <!-- prefix slot -->
      <!-- 待定，后面有需要可以补充 -->

      <!-- suffix slot -->
      <span class="my-input-suffix-icon">
        <!-- <img class="suffix-icon-img" src="../../assets/image/search.png" alt="" /> -->

        <!-- clearable -->
        <div
          class="close-icon"
          v-if="clearable && nativeInputValue.length > 0 && !disabled"
          @click="onClear"
        >
          <!-- <img v-if="clearable && nativeInputValue.length > 0 && !disabled" class="close-icon-img" src="../../assets/image/close.png" alt="" /> -->
        </div>

        <!-- password -->
        <div
          class="password-icon"
          v-if="showPassword && !disabled"
          @click="onPasswordVisible"
        >
          <!-- <img v-if="showPassword && !disabled" class="password-icon-img" src="../../assets/image/eye.png" alt="" /> -->
        </div>
      </span>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textarea"
        :readonly="readonly"
        class="my-textarea-inner"
        autocomplete="off"
        :placeholder="placeholder"
        :value="nativeInputValue"
        @input="onChange"
        @blur="onBlur"
        @focus="onFocus"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { inputEmit, inputProps, useInput } from './index';

type TargetElement = HTMLInputElement | HTMLTextAreaElement;

const props = defineProps(inputProps);
const emits = defineEmits(inputEmit);

const {
  disabled,
  classes,
  clearable,
  type,
  passwordVisible,
  placeholder,
  readonly,
  nativeInputValue,
} = useInput(props, emits);

const input = ref<HTMLInputElement>();
const textarea = ref<HTMLTextAreaElement>();
const inputOrTextarea = computed(() => input.value || textarea.value);

const onChange = (e: Event) => {
  const { value } = e.target as TargetElement;
  if (value === nativeInputValue.value) return;
  emits('update:modelValue', value);
  emits('input', value);
};

const onClear = () => {
  emits('update:modelValue', '');
  emits('input', '');
  emits('clear', '');
};

const onBlur = (e: any) => {
  emits('blur', e);
};

const onFocus = (e: any) => {
  emits('focus', e);
};

const focus = () => {
  nextTick(() => {
    inputOrTextarea.value?.focus();
  });
};

const blur = () => {
  nextTick(() => {
    inputOrTextarea.value?.blur();
    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNode(inputOrTextarea.value);
    selection.removeAllRanges();
  });
};

const onPasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

const select = () => {
  nextTick(() => {
    inputOrTextarea.value?.focus();

    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNode(inputOrTextarea.value);
    selection.removeAllRanges();
    selection.addRange(range);
  });
};

defineExpose({
  input,
  inputOrTextarea,
  textarea,
  blur,
  focus,
  select,
});
</script>
<script lang="ts">
export default {
  name: 'MyInput',
};
</script>

<style lang="scss">
$active-color: #87ceeb;
// https: //encycolorpedia.cn/ 可查各种颜色

.my-input {
  margin: 1px;
  width: 100%;
  cursor: pointer;
  position: relative;

  // &.my-input-suffix-icon  {
  //   padding-right: 30px;
  // }

  &-inner {
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: none;
    padding: 0 15px;
    //适合白色背景，后面可以调整，比如黑色背景选白字
    color: black;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      border-color: #87cefa;
    }

    &:active,
    &:focus {
      outline: none;
      border-color: $active-color;
      box-shadow: 0 0 0 2px rgba(100, 149, 237, 0.3);
    }

    &::placeholder {
      color: rgb(213, 215, 220);
      font-size: inherit;
    }
  }

  &.is-disabled {
    .my-input-inner {
      cursor: not-allowed;
      background-color: #fafafc;
      color: rgba(194, 194, 194, 1);

      &:hover,
      &:focus,
      &:active {
        border: 1px solid #dcdfe6;
        box-shadow: none;
      }
    }
  }

  .close-icon,
  .password-icon {
    display: none;
  }

  &:hover .close-icon,
  &:focus .close-icon,
  &:hover .password-icon,
  &:focus .password-icon,
  .suffix-icon {
    margin: 0 1px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .my-icon {
      color: #dcdfe6;

      &:hover {
        color: #c0c4cc;
      }
    }
  }

  .suffix-icon .my-icon:hover {
    color: #dcdfe6;
  }
}

.my-textarea {
  width: 100%;

  .my-textarea-inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: black;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      border-color: #87cefa;
    }

    &:active,
    &:focus {
      outline: none;
      border-color: $active-color;
      box-shadow: 0 0 0 2px rgba(100, 149, 237, 0.3);
    }

    &::placeholder {
      color: rgb(213, 215, 220);
      font-size: inherit;
    }
  }
}
</style>
