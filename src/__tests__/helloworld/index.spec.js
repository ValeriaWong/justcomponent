// 测试
import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-unresolved
import HelloWorld from '@/HelloWorld.vue';

// eslint-disable-next-line no-undef
test('displays message', async () => {
  const wrapper = await mount(HelloWorld, {
    props: {
      msg: 'test msg',
    },
  });

  // Assert the rendered text of the component
  // eslint-disable-next-line no-undef
  expect(wrapper.find('h1').text()).toBe('test msg');
  // eslint-disable-next-line no-undef
  expect(wrapper.find('button').text()).toBe('count is 0');
  await wrapper.find('button').trigger('click');
  // eslint-disable-next-line no-undef
  expect(wrapper.find('button').text()).toBe('count is 1');
});
