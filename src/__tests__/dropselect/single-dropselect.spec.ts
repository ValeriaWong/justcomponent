import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
import SingleDropselect from '../../views/dropselect/single-dropselct.vue'


describe('SingleDropselect', () => {
  it('renders the component with default props', () => {
    const wrapper = mount(SingleDropselect);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the component with props', () => {
    const wrapper = mount(SingleDropselect, {
      props: {
        show: true,
        search: true,
        group: true,
        clearable: true,
        disabled: true,
        placement: 'left-top',
        type: 'single-group',
        multiple: false,
        size: 'S',
      },
    });
    expect(wrapper.props().show).toBe(true);
    expect(wrapper.props().search).toBe(true);
    expect(wrapper.props().group).toBe(true);
    expect(wrapper.props().clearable).toBe(true);
    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.props().placement).toBe('left-top');
    expect(wrapper.props().type).toBe('single-group');
    expect(wrapper.props().multiple).toBe(false);
    expect(wrapper.props().size).toBe('S');
  });

  it('displays the dropdown when input is clicked', async () => {
    const wrapper = mount(SingleDropselect);
    const inputBox = wrapper.find('.dropinput--input-box');
    await inputBox.trigger('click');
    expect(wrapper.find('.--optionlist').exists()).toBe(true);
  });

  it('emits the selected city on click in single type', async () => {
    const wrapper = mount(SingleDropselect, {
      props: {
        type: 'single',
      },
    });
    const inputBox = wrapper.find('.dropinput--input-box');
    await inputBox.trigger('click');
    const firstCity = wrapper.find('.--optionlist-item span:first-child');
    await firstCity.trigger('click');
    expect(wrapper.emitted().select).toBeTruthy();
    expect(wrapper.emitted().select[0]).toEqual(['杭州']);
  });

  it('displays the city description in single-description type', async () => {
    const wrapper = mount(SingleDropselect, {
      props: {
        type: 'single-description',
      },
    });
    const inputBox = wrapper.find('.dropinput--input-box');
    await inputBox.trigger('click');
    const firstCity = wrapper.find('.--optionlist-item span:first-child');
    await firstCity.trigger('click');
    expect(wrapper.find('.--optionlist-item-description').text()).toBe('是一个好地方');
  });

  it('clears the selected city when clear button is clicked', async () => {
    const wrapper = mount(SingleDropselect, {
      props: {
        type: 'single',
      },
    });
    const inputBox = wrapper.find('.dropinput--input-box');
    await inputBox.trigger('click');
    const firstCity = wrapper.find('.--optionlist-item span:first-child');
    await firstCity.trigger('click');
    expect(wrapper.find('.dropinput--clearable').exists()).toBe(true);
    const clearButton = wrapper.find('.dropinput--clearable');
    await clearButton.trigger('click');
    expect(wrapper.vm.$refs.single).toBeUndefined();
  });

  it('does not display the dropdown when input is clicked and component is disabled', async () => {
    const wrapper = mount(SingleDropselect, {
      props: {
        disabled: true,
      },
    });
    const inputBox = wrapper.find('.dropinput--input-box');
    await inputBox.trigger('click');
    expect(wrapper.find('.--optionlist').exists()).toBe(false);
  });
});

