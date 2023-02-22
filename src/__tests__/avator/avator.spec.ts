import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
import Avatar from '../../views/avatar/avatar.vue';

describe('Avatar', () => {
  it('should render with default props', () => {
    const wrapper = mount(Avatar);

    // 检查组件是否成功渲染
    expect(wrapper.exists()).toBe(true);

    // 检查默认props值是否正确
    expect(wrapper.props('size')).toBe('default');
    expect(wrapper.props('src')).toBe('');
    expect(wrapper.props('shape')).toBe('circle');
    expect(wrapper.props('alt')).toBeUndefined();
    expect(wrapper.props('color')).toBeUndefined();
    expect(wrapper.props('backgroundColor')).toBeUndefined();
    expect(wrapper.props('isRotated')).toBe('');

    // 检查是否正确应用了默认class和style
    expect(wrapper.classes()).toContain('avatar');
    expect(wrapper.classes()).toContain('avatar--default');
    expect(wrapper.classes()).toContain('avatar--circle');
    expect(wrapper.vm.$refs.styles).toEqual({
      width: '',
      height: '',
      color: undefined,
      backgroundColor: undefined,
    });
  });

  it('should render with custom props', () => {
    const propsData = {
      size: 'large',
      src: 'https://example.com/avatar.jpg',
      shape: 'square',
      alt: 'Avatar',
      color: 'black',
      backgroundColor: 'red',
      isRotated: 'isRotated',
    };

    const wrapper = mount(Avatar, { propsData });

    // 检查组件是否成功渲染
    expect(wrapper.exists()).toBe(true);

    // 检查自定义props值是否正确
    expect(wrapper.props('size')).toBe('large');
    expect(wrapper.props('src')).toBe('https://example.com/avatar.jpg');
    expect(wrapper.props('shape')).toBe('square');
    expect(wrapper.props('alt')).toBe('Avatar');
    expect(wrapper.props('color')).toBe('black');
    expect(wrapper.props('backgroundColor')).toBe('red');
    expect(wrapper.props('isRotated')).toBe('isRotated');

    // 检查是否正确应用了自定义class和style
    expect(wrapper.classes()).toContain('avatar');
    expect(wrapper.classes()).toContain('avatar--large');
    expect(wrapper.classes()).toContain('avatar--square');
    expect(wrapper.classes()).toContain('avatar--isRotated');
    expect(wrapper.vm.$props.styles).toEqual({
      width: '',
      height: '',
      color: 'black',
      backgroundColor: 'red',
    });

    // 检查是否正确渲染了img元素
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/avatar.jpg');
    expect(wrapper.find('img').attributes('alt')).toBe('Avatar');
  });

  it('should emit error event when image load fails', async () => {
    const propsData = { src: 'https://example.com/avatar.jpg' };
    const wrapper = mount(Avatar, { propsData });

    // 模拟图片加载失败事件
    wrapper.find('img').trigger('error');

    // 检查是否正确触发了error事件
    expect(wrapper.emitted('error')).toBeTruthy();

    // 检查hasLoadError是否正确响应
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.hasLoadError).toBe(true);
  });
});
