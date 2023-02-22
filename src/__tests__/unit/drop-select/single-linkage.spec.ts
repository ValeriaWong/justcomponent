import { mount } from '@vue/test-utils'
import { expect, describe, it } from '@jest/globals';
import SingleLinkageDropselect from '../../../views/dropselect/single-dropselct.vue'

describe('SingleLinkageDropselect', () => {
  it('renders a placeholder when no option is selected', () => {
    const wrapper = mount(SingleLinkageDropselect, {
      props: {
        // 默认情况下，no option is selected
        firstLevel: '',
        secondLevel: '',
        thirdLevel: '',
      },
    })
    expect(wrapper.find('.dropinput--input-box').text()).toBe('请选择')
  })

  it('toggles the first level dropdown on click', async () => {
    const wrapper = mount(SingleLinkageDropselect)
    await wrapper.find('.dropinput').trigger('click')
    expect(wrapper.vm.$refs.showFirst).toBe(true)
  })

  it('updates the first level text when an option is selected', async () => {
    const wrapper = mount(SingleLinkageDropselect)
    await wrapper.find('.dropinput').trigger('click')
    await wrapper
      .findAll('.--optionlist .option')
      .at(0)
      .trigger('click')
    expect(wrapper.vm.$refs.firstLevel).toBe('浙江省')
  })

  it('updates the second level text when an option is selected', async () => {
    const wrapper = mount(SingleLinkageDropselect, {
      props: {
        firstLevel: '浙江省',
      },
    })
    await wrapper.find('.dropinput').trigger('click')
    await wrapper
      .findAll('.--optionlist .option')
      .at(0)
      .trigger('click')
    await wrapper
      .findAll('.--optionlist .option')
      .at(0)
      .trigger('click')
    expect(wrapper.vm.$refs.secondLevel).toBe('杭州')
  })

  it('updates the third level text when an option is selected', async () => {
    const wrapper = mount(SingleLinkageDropselect, {
      props: {
        firstLevel: '浙江省',
        secondLevel: '杭州',
      },
    })
    await wrapper.find('.dropinput').trigger('click')
    await wrapper
      .findAll('.--optionlist .option')
      .at(0)
      .trigger('click')
    await wrapper
      .findAll('.--optionlist .option')
      .at(0)
      .trigger('click')
    await wrapper
      .findAll('.--optionlist .option')
      .at(0)
      .trigger('click')
    expect(wrapper.vm.$refs.thirdLevel).toBe('1')
  })
})
