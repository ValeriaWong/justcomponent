import { mount } from '@vue/test-utils'
import { expect, describe, it } from '@jest/globals';
import Dropselect from '../../../views/dropselect/dropselect.vue'

describe('Dropselect', () => {
  it('renders correctly', () => {
    const wrapper = mount(<any>Dropselect, {
      props: {
        show: true,
        search: true,
        group: true,
        clearable: true,
        disabled: false,
        placement: 'left-bottom',
        type: 'multiple',
        multiple: true,
        size: 'M',
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('my-dropselect')
    expect(wrapper.vm.$props.show).toBe(true)
    expect(wrapper.vm.$props.search).toBe(true)
    expect(wrapper.vm.$props.group).toBe(true)
    expect(wrapper.vm.$props.clearable).toBe(true)
    expect(wrapper.vm.$props.disabled).toBe(false)
    expect(wrapper.vm.$props.placement).toBe('left-bottom')
    expect(wrapper.vm.$props.type).toBe('multiple')
    expect(wrapper.vm.$props.multiple).toBe(true)
    expect(wrapper.vm.$props.size).toBe('M')
  })
})
