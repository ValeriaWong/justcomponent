import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
import Dropselect from '../../views/dropselect/dropselect.vue'

describe('Dropselect', () => {
  it('renders in a reasonable time', () => {
    const start = performance.now();
    mount(Dropselect);
    const end = performance.now();
    const renderTime = end - start;
    expect(renderTime).toBeLessThan(1000); // 设置一个合理的时间阈值
  });
});
