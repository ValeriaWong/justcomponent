import { mount } from '@vue/test-utils';
import { expect, describe ,test} from '@jest/globals';
import MyButton from '../../views/button/button.vue';
import loadingButton from '../../views/button/loadingbutton.vue';

// 通过 performance.now() 方法获取开始和结束时间戳。测试断言期望组件的渲染时间小于 10 毫秒
describe('MyButton Performance Test', () => {
  test('Render button in under 10ms', () => {
    const startTime = performance.now();

    const wrapper = mount(<any>MyButton, {
      props: {
        type: 'primary',
        size: 'M',
      },
    });

    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(10);
    wrapper.unmount();
  });
});



describe('loadingButton performance', () => {
  test('rendering performance', () => {
    const wrapper = mount(<any>loadingButton);
    const start = window.performance.now();

    // 模拟加载
    wrapper.vm.isLoading = true;
    wrapper.vm.$forceUpdate();

    const end = window.performance.now();

    // 输出测试结果
    console.log(`loadingButton loading performance: ${end - start}ms`);
    expect( end - start).toBeLessThan(10);
    wrapper.unmount();
  });
});

