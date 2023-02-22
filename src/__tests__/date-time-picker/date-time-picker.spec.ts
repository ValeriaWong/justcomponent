import { mount } from '@vue/test-utils';
import { expect, describe, it } from '@jest/globals';
import DateTimePicker from '../../views/date-time-picker/picker.vue';

describe('DateTimePicker', () => {
  it('renders date picker by default', async () => {
    const wrapper = mount(DateTimePicker, {
      props: {
        show: true,
        modelValue: '1980/01/01 00:00:00',
      },
    });
    expect(wrapper.find('.date_box').exists()).toBe(true);
    expect(wrapper.find('.time_box').exists()).toBe(false);
  });

  it('renders time picker when type is set to 1', async () => {
    const wrapper = mount(DateTimePicker, {
      props: {
        show: true,
        modelValue: '1980/01/01 00:00:00',
      },
    });
    await wrapper.find('.chose span:nth-child(2)').trigger('click');
    expect(wrapper.find('.time_box').exists()).toBe(true);
    expect(wrapper.find('.date_box').exists()).toBe(false);
  });

  it('sets the initial date and time correctly', async () => {
    const wrapper = mount(DateTimePicker, {
      props: {
        show: true,
        modelValue: '1980/01/01 12:34:56',
      },
    });
    expect(wrapper.vm.$refs.DateTime).toBe('1980/01/01 12:34:56');
    const dateItems = wrapper.findAll('.date_time_item.year p');
    expect(dateItems[0].text()).toBe('1980');
    const monthItems = wrapper.findAll('.date_time_item.month p');
    expect(monthItems[0].text()).toBe('01');
    const dayItems = wrapper.findAll('.date_time_item.day p');
    expect(dayItems[0].text()).toBe('01');
    const hourItems = wrapper.findAll('.date_time_item.hour p');
    expect(hourItems[0].text()).toBe('12');
    const minuteItems = wrapper.findAll('.date_time_item.minute p');
    expect(minuteItems[0].text()).toBe('34');
    const secondItems = wrapper.findAll('.date_time_item.second p');
    expect(secondItems[0].text()).toBe('56');
  });

  it('updates date and time when user scrolls', async () => {
    const wrapper = mount(DateTimePicker, {
      props: {
        show: true,
        modelValue: '1980/01/01 00:00:00',
      },
    });
    const yearItems = wrapper.findAll('.date_time_item.year p');
    await yearItems[1].trigger('touchstart');
    await yearItems[1].trigger('scroll');
    await yearItems[1].trigger('touchend');
    expect(wrapper.vm.$refs.DateTime).toBe('1981/01/01 00:00:00');
    const monthItems = wrapper.findAll('.date_time_item.month p');
    await monthItems[1].trigger('touchstart');
    await monthItems[1].trigger('scroll');
    await monthItems[1].trigger('touchend');
    expect(wrapper.vm.$refs.DateTime).toBe('1981/02/01 00:00:00');
    const dayItems = wrapper.findAll('.date_time_item.day p');
    await dayItems[1].trigger('touchstart');
    await dayItems[1].trigger('scroll');
    await dayItems[1].trigger('touchend');
    expect(wrapper.vm.$refs.DateTime).toBe('1981/02/02 00:00:00');
    const hourItems = wrapper.findAll('.date_time_item.hour p');
    await hourItems[1].trigger('touchstart');
    await hourItems[1].trigger('scroll');
    await hourItems[1].trigger('touchend');
    expect(wrapper.vm.$refs.DateTime).toBe('1981/02/02 01:00:00');
  })
});