import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
import Input from '../../../views/input/input.vue';

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Please input your username',
        modelValue: 'admin',
      },
    });

    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.props('placeholder')).toBe('Please input your username');
    expect(wrapper.props('modelValue')).toBe('admin');
  });

  it('should emit "update:modelValue" event when user input text', async () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Please input your username',
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('admin');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['admin']);
  });

  it('should emit "clear" event when user click clear icon', async () => {
    const wrapper = mount(Input, {
      props: {
        clearable: true,
        modelValue: 'admin',
      },
    });

    const clearIcon = wrapper.find('.close-icon');
    await clearIcon.trigger('click');

    expect(wrapper.emitted('clear')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);
  });

  it('should toggle password visibility when user click password icon', async () => {
    const wrapper = mount(Input, {
      props: {
        showPassword: true,
        modelValue: 'admin',
      },
    });

    const passwordIcon = wrapper.find('.password-icon');
    await passwordIcon.trigger('click');

    expect(wrapper.vm.$refs.passwordVisible).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');

    await passwordIcon.trigger('click');

    expect(wrapper.vm.$refs.passwordVisible).toBe(false);
    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  it('should disable input when "disabled" prop is true', async () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
        modelValue: 'admin',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBe('disabled');

    await input.setValue('guest');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should not emit events when "readonly" prop is true', async () => {
    const wrapper = mount(Input, {
      props: {
        readonly: true,
        modelValue: 'admin',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('guest');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('input')).toBeUndefined();
    expect(wrapper.emitted('clear')).toBeUndefined();
    expect(wrapper.emitted('focus')).toBeUndefined();
    expect(wrapper.emitted('blur')).toBeUndefined();
  });
});
