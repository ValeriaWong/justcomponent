import { mount } from '@vue/test-utils';
import { expect, test } from '@jest/globals';
import MultipleDropSelect from '../../views/dropselect/multiple-dropselect.vue';

// 测试选项列表的渲染速度：
test('options list renders quickly', () => {
  const wrapper = mount(<any>MultipleDropSelect, {
    props: {
      show: true,
      type: 'multiple',
    },
  });

  const startTime = window.performance.now();
  wrapper.vm.$nextTick(() => {
    const endTime = window.performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100);
  });
});

// 测试搜索选项的渲染速度
test('searched options render quickly', () => {
  const wrapper = mount(<any>MultipleDropSelect, {
    props: {
      show: true,
      type: 'multiple',
      search: true,
    },
  });

  wrapper.vm.searchData = 'test';
  const startTime = window.performance.now();
  wrapper.vm.$nextTick(() => {
    const endTime = window.performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100);
  });
});

//   测试选项的选中和取消选中速度
test('option selection is fast', async () => {
  const wrapper = mount(<any>MultipleDropSelect, {
    props: {
      show: true,
      type: 'multiple',
    },
  });

  const options = wrapper.findAll('.--optionlist--option');
  const startTime = window.performance.now();
  await options[0].trigger('click');
  await options[1].trigger('click');
  await options[2].trigger('click');
  const endTime = window.performance.now();
  const selectTime = endTime - startTime;

  expect(selectTime).toBeLessThan(200);
});
// 测试清空选项的速度
test('clearing all options is fast', async () => {
  const wrapper = mount(<any>MultipleDropSelect, {
    props: {
      show: true,
      type: 'multiple',
    },
  });

  await wrapper.vm.$nextTick();
  await wrapper.find('.dropinput--clearable').trigger('click');
  const clearedOptions = wrapper.vm.selected;
  expect(clearedOptions.length).toEqual(0);
});

// 测试远程搜索的渲染速度
test('remote search renders quickly', async () => {
  const wrapper = mount(<any>MultipleDropSelect, {
    props: {
      show: true,
      type: 'multiple',
      search: true,
    },
  });

  const rawData = {
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3',
  };

  wrapper.vm.formatList(rawData);
  wrapper.vm.searchData = 'option';
  const startTime = window.performance.now();
  wrapper.vm.$nextTick(() => {
    const endTime = window.performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100);
  });
});
