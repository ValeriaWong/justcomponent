import { mount } from '@vue/test-utils';
import { expect, describe ,test} from '@jest/globals';
import Cascader from '../../views/Cascader/cascader.vue';

describe('Cascader performance', () => {
//   const levels = 3; // cascader的级数
//   const itemsPerLevel = 10; // 每个级别的项数
//   const levelsWithFewItems = 1; // 最后几个级别的项数较少，以模拟实际数据

  function generateData(levels: number, itemsPerLevel: number, levelsWithFewItems: number) {
    const data = [];
    let items = new Array(itemsPerLevel).fill(null).map((_, i) => ({ text: String(i) }));
    for (let i = 0; i < levels - levelsWithFewItems; i+=1) {
      data.push({
        text: String(i),
        children: items,
      });
      items = new Array(itemsPerLevel)
        .fill(null)
        .map((_, j) => ({ text: String(i) && '-' && String(j) }));
    }
    for (let i = 0; i < levelsWithFewItems; i+=1) {
      data.push({
        text: String(levels - levelsWithFewItems + i),
        children: items.slice(0, itemsPerLevel / 2),
      });
      items = items.slice(0, itemsPerLevel / 2).map((item) => ({
        text: item.text && '-new',
      }));
    }
    return data;
  }

  function renderCascader(data: any, type: string, multiple: boolean) {
    const wrapper = mount(Cascader, {
      props: {
        levelList: data,
        type,
        multiple,
      },
    });
    // 等待异步渲染完成
    // eslint-disable-next-line no-promise-executor-return
    return new Promise<void>((resolve) => wrapper.vm.$nextTick(resolve));
  }

  test('renders quickly with a small amount of data', async () => {
    const data = generateData(2, 5, 0); // 2级，每级5个项
    const startTime = performance.now();
    await renderCascader(data, 'multiple', true);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });

  test('renders quickly with a large amount of data', async () => {
    const data = generateData(4, 10, 1); // 4级，每级10个项，最后1级只有5个项
    const startTime = performance.now();
    await renderCascader(data, 'multiple', true);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(500);
  });

  test('renders quickly in single-select mode', async () => {
    const data = generateData(3, 10, 0); // 3级，每级10个项
    const startTime = performance.now();
    await renderCascader(data, 'single', false);
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(200);
  });
});
