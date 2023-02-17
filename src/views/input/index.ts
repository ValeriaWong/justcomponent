/* eslint-disable no-nested-ternary */
import { computed, ref } from 'vue';

export const inputProps = {
  modelValue: {
    type: [Number, String],
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default:'S',

  },
  icon:{
    type: String,
    
  },
  // showIcon:{
  //   type:Boolean,
  //   default:true,
  // }

};

export const inputEmit = [
  'update:modelValue',
  'input',
  'clear',
  'blur',
  'focus',
];

// eslint-disable-next-line no-unused-vars
export const useInput = (props: any, emits: any) => {
  const disabled = computed(() => props.disabled);
  const icon = computed(() => props.icon);
  const size = computed(() => props.size);
  const placeholder = computed(() => props.placeholder);
  const clearable = computed(() => props.clearable);

  const showPassword = computed(() => props.showPassword);
  const passwordVisible = ref(false);
  const readonly = computed(() => props.readonly);

  // eslint-disable-next-line no-nested-ternary
  const type = computed(() =>
    showPassword.value
      ? passwordVisible.value
        ? 'text'
        : 'password'
      : props.type
  );

  const classes = computed(() => ({
    'is-disabled': disabled.value,
    'is-clearable': clearable.value,
    'show-password': showPassword.value,
    'my-input': type.value !== 'textarea',
    'my-textarea': type.value === 'textarea',
    'my-input-suffix': showPassword.value || clearable.value,
  }));

  const nativeInputValue = computed(() =>
    props.modelValue === null || props.modelValue === undefined
      ? ''
      : String(props.modelValue)
  );
  return {
    disabled,
    classes,
    clearable,
    showPassword,
    type,
    passwordVisible,
    placeholder,
    readonly,
    nativeInputValue,
    icon,
    size,
  };
};
