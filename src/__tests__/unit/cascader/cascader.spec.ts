import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
import Cascader from '../../../views/Cascader/cascader.vue';

describe('Cascader', () => {
  it('should render correctly when show is true', async () => {
    const wrapper = mount(Cascader, {
      props: {
        show: true,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain('my-dropselect');
    expect(wrapper.classes()).toContain('my-dropselect-multiple');
    expect(wrapper.classes()).toContain('my-dropselect-M');

    const inputBox = wrapper.find('.dropinput--input-box');
    expect(inputBox.exists()).toBe(true);

    const arrowDown = wrapper.find('.dropinput--select-arrow-down');
    expect(arrowDown.exists()).toBe(true);

    const optionList = wrapper.find('.--optionlist');
    expect(optionList.exists()).toBe(false); // 在未点击前下拉菜单不渲染

    wrapper.unmount();
  });

  it('should hide option list when show is false', async () => {
    const wrapper = mount(Cascader, {
      props: {
        show: false,
      },
    });

    await wrapper.vm.$nextTick();

    const optionList = wrapper.find('.--optionlist');
    expect(optionList.exists()).toBe(false);

    wrapper.unmount();
  });

  it('should toggle option list when click input box or arrow', async () => {
    const wrapper = mount(Cascader, {
      props: {
        show: false,
      },
    });

    const inputBox = wrapper.find('.dropinput--input-box');
    const arrowDown = wrapper.find('.dropinput--select-arrow-down');

    await inputBox.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:show')).toBeTruthy();
    expect(wrapper.emitted('update:show')[0]).toEqual([true]);

    await arrowDown.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:show')[1]).toEqual([false]);

    wrapper.unmount();
  });

  it('should update single when level item clicked', async () => {
    const wrapper = mount(Cascader, {
      props: {
        levelList: [
          {
            text: 'Province 1',
            children: [
              { text: 'City 1-1', children: [{ text: 'Area 1-1-1' }] },
            ],
          },
          {
            text: 'Province 2',
            children: [
              { text: 'City 2-1', children: [{ text: 'Area 2-1-1' }] },
            ],
          },
        ],
        multiple: false,
      },
    });

    const province1 = wrapper
      .findAll('.--optionlist .level-0 .level-item')
      .at(0);
    const city11 = wrapper.findAll('.--optionlist .level-1 .level-item').at(0);
    const area111 = wrapper.findAll('.--optionlist .level-2 .level-item').at(0);

    await province1.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.single).toBe('Province 1');

    await city11.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.single).toBe('Province 1/City 1-1');

    await area111.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$refs.single).toBe('Province 1/City 1-1/Area 1-1-1');
  });
});
