import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
import Input from '../../views/input/input.vue';

describe('Input performance', () => {
  it('renders and updates value quickly', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'initial value',
      },
    });

    // Measure initial render
    const renderStart = performance.now();

    // Wait for the next animation frame to ensure the component has finished rendering
    await new Promise(requestAnimationFrame);

    const renderEnd = performance.now();

    // Check if initial render is below 50ms
    expect(renderEnd - renderStart).toBeLessThan(50);

    // Measure value update
    const updateStart = performance.now();

    await wrapper.setProps({
      modelValue: 'new value',
    });

    await new Promise(requestAnimationFrame);

    const updateEnd = performance.now();

    // Check if value update is below 50ms
    expect(updateEnd - updateStart).toBeLessThan(50);
  });
});
