import { mount } from '@vue/test-utils';
import { jest, test, beforeAll, afterAll, expect } from '@jest/globals';
import DateTimePicker from '../../views/date-time-picker/picker.vue';

// 测试组件渲染时间：
let startTime: number;
let endTime: number;

beforeAll(() => {
  startTime = performance.now();
});

afterAll(() => {
  endTime = performance.now();
  //   console.log(`渲染时间: ${endTime - startTime} ms`);
  expect(endTime - startTime).toBeLessThan(100);
});

test('渲染组件', () => {
  mount(DateTimePicker, {
    props: {
      show: true,
      modelValue: '2022/02/22 22:22:22',
    },
  });
});

// 测试组件滚动性能
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test('滚动组件', () => {
  const wrapper = mount(DateTimePicker, {
    props: {
      show: true,
      modelValue: '2022/02/22 22:22:22',
    },
  });

  const scrollTargets = wrapper.findAll('.date_time_item');

  scrollTargets.forEach((el) => {
    const scrollEvent = { target: el.element };
    jest.advanceTimersByTime(2000);
    el.trigger('touchstart', scrollEvent);
    jest.advanceTimersByTime(2000);
    el.trigger('scroll', scrollEvent);
    jest.advanceTimersByTime(2000);
    el.trigger('touchend', scrollEvent);
  });
});
// 测试组件点击性能
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test('点击组件', () => {
  const wrapper = mount(DateTimePicker, {
    props: {
      show: true,
      modelValue: '2022/02/22 22:22:22',
    },
  });

  const clickTargets = wrapper.findAll('span');

  clickTargets.forEach((el) => {
    jest.advanceTimersByTime(2000);
    el.trigger('click');
  });
});
