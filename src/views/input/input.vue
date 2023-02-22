<!-- eslint-disable import/no-unresolved -->
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
        :class="size ? `my-input-inner-${size}` : ''"
        autocomplete="off"
        :readonly="readonly"
        :value="nativeInputValue"
        @input="onChange"
        @blur="onBlur"
        @focus="onFocus"
        :placeholder="placeholder"
        :icon="icon"
      />
      <!-- prefix slot -->
      <!-- 待定，后面有需要可以补充 -->

      <!-- suffix slot -->
      <!-- v-if="showIcon==true" -->
      <div class="my-input-suffix-icon">
        <span class="suffix-icon-img">
          <img v-if="icon == 'search'" src="../../assets/search.svg" alt="" />
          <img v-if="icon == 'clear'" src="../../assets/clear.svg" alt="" />
          <img
            v-if="icon == 'clearable'"
            src="../../assets/clearable.svg"
            alt=""
          />
        </span>
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
      </div>
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
  size,
  icon,
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
@import '../../styles/index';
@include input-wrapper;
</style>
