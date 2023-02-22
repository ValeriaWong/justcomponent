import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
// import { Component } from 'vue';
import MyButton from '../../../views/button/button.vue';

// test('mounts a component', () => {
//   const div = document.createElement('div')
//   document.body.appendChild(div)
//   const wrapper = shallowMount(<any>MyButton, {});
//   expect(wrapper.classes()).toContain('my-button');
//   expect(wrapper.classes()).toContain('my-button-primary');
//   expect(wrapper.classes()).toContain('my-button-M');
//   expect(wrapper.classes()).toContain('my-button--square');
//   expect(wrapper.text()).toBe('这是使用scss文件的button');
// });

describe('MyButton.vue', () => {
  it('renders default class and text', () => {
    const wrapper = mount(<any>MyButton, {});
    expect(wrapper.classes()).toContain('my-button');
    expect(wrapper.classes()).toContain('my-button-primary');
    expect(wrapper.classes()).toContain('my-button-M');
    expect(wrapper.classes()).toContain('my-button--square');
    expect(wrapper.text()).toBe('这是使用scss文件的button');
  });
  // });

  it('renders correct classes with different props', () => {
    const wrapper = mount(<unknown>MyButton, {
      propsData: {
        type: 'secondary',
        size: 'S',
        round: 'round',
        loading: true,
      },
    });
    expect(wrapper.classes()).toContain('my-button');
    expect(wrapper.classes()).toContain('my-button-secondary');
    expect(wrapper.classes()).toContain('my-button-S');
    expect(wrapper.classes()).toContain('my-button--round');
    expect(wrapper.find('img').exists()).toBe(true);
  });
});
