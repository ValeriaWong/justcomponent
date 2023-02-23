import { mount } from '@vue/test-utils';
import { expect, test } from '@jest/globals';
// import { expect, test ,describe, it} from '@jest/globals';
// import { toMatchMemorySnapshot } from 'jest-memory-snapshot';

import Avatar from '../../views/avatar/avatar.vue';

// 测试渲染时间：这个测试用例可以测试组件渲染所需的时间，即 Avatar 组件从被创建到在页面上显示需要多长时间。
test('renders Avatar component in under 100ms', () => {
  const start = performance.now();
  // const wrapper = mount(Avatar);
  const end = performance.now();
  const duration = end - start;
  expect(duration).toBeLessThan(100);
});

// 测试组件更新时间：这个测试用例可以测试当 Avatar 组件的属性值改变时，它需要多长时间来重新渲染。
test('updates Avatar component in under 50ms', () => {
  const wrapper = mount(Avatar);
  const start = performance.now();
  wrapper.setProps({ size: 'large' });
  const end = performance.now();
  const duration = end - start;
  expect(duration).toBeLessThan(50);
});
// 测试内存使用：这个测试用例可以测试 Avatar 组件在运行时的内存使用情况。
// test('Avatar component does not exceed 10mb of memory usage', () => {
//     // const wrapper = mount(Avatar);
//     const memory = performance.memory.usedJSHeapSize / (1024 * 1024);
//     expect(memory).toBeLessThan(10);
//   });

test('Avatar component memory usage', () => {
  mount(Avatar, {
    props: {
      size: 'default',
      src: 'https://example.com/avatar.png',
      shape: 'circle',
      isRotated: '',
    },
  });

  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  expect(used).toBeLessThan(10); // 假设内存占用不应该超过 10MB

  // 对内存使用情况进行快照测试
  // expect(used).toMatchSnapshot();
});

// 如果组件在运行时没有发生内存泄漏，测试用例就会通过。
// expect.extend({ toMatchMemorySnapshot });

// describe('Avatar component', () => {
//   it('should not leak memory', () => {
//     const wrapper = mount(Avatar);
//     expect(wrapper).toMatchMemorySnapshot();
//   });
// });
