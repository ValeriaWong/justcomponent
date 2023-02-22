import { mount } from "@vue/test-utils";
import { expect, describe, it } from '@jest/globals';
import MultipleDropSelect from '../../../views/dropselect/multiple-dropselect.vue'

describe("MultipleDropSelect", () => {
  it("renders correctly", () => {
    const wrapper = mount(<any>MultipleDropSelect, {
      props: {
        show: false,
        search: true,
        group: false,
        clearable: false,
        disabled: false,
        placement: "left-bottom",
        type: "single",
        multiple: false,
        size: "M",
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("disables the component when the disabled prop is set to true", () => {
    const wrapper = mount(<any>MultipleDropSelect, {
      props: {
        show: false,
        search: true,
        group: false,
        clearable: false,
        disabled: true,
        placement: "left-bottom",
        type: "single",
        multiple: false,
        size: "M",
      },
    });
    expect(wrapper.find(".disabled")).toBeTruthy();
  });

  it("shows the dropdown menu when the component is clicked", async () => {
    const wrapper = mount(<any>MultipleDropSelect, {
      props: {
        show: false,
        search: true,
        group: false,
        clearable: false,
        disabled: false,
        placement: "left-bottom",
        type: "single",
        multiple: false,
        size: "M",
      },
    });
    await wrapper.trigger("click");
    expect(wrapper.vm.$refs.show).toBe(true);
  });

  it("toggles the dropdown menu when the component is clicked", async () => {
    const wrapper = mount(<any>MultipleDropSelect, {
      props: {
        show: false,
        search: true,
        group: false,
        clearable: false,
        disabled: false,
        placement: "left-bottom",
        type: "single",
        multiple: false,
        size: "M",
      },
    });
    await wrapper.trigger("click");
    expect(wrapper.vm.$refs.show).toBe(true);
    await wrapper.trigger("click");
    expect(wrapper.vm.$refs.show).toBe(false);
  });

  it("clears all selected options when the clear button is clicked", async () => {
    const wrapper = mount(<any>MultipleDropSelect, {
      props: {
        show: false,
        search: true,
        group: false,
        clearable: true,
        disabled: false,
        placement: "left-bottom",
        type: "single",
        multiple: false,
        size: "M",
      },
      data() {
        return {
          selected: ["Beijing", "Shanghai"],
        };
      },
    });
    await wrapper.find(".dropinput--clearable").trigger("click");
    expect(wrapper.vm.$refs.selected).toEqual([]);
  });

  it("selects an option when clicked", async () => {
    const wrapper = mount(<any>MultipleDropSelect, {
      props: {
        show: false,
        search: true,
        group: false,
        clearable: true,
        disabled: false,
        placement: "left-bottom",
        type: "single",
        multiple: false,
        size: "M",
      },
    });
    await wrapper.trigger("click");
    const option = wrapper.find(".--optionlist--option");
    await option.trigger("click");
    expect(wrapper.vm.$refs.selected).toEqual([option.text()]);
  });
});


describe('MultipleDropSelect', () => {
  it('should render input and options correctly', () => {
    const wrapper = mount(<any>MultipleDropSelect);
    expect(wrapper.find('.dropinput--input-box').exists()).toBe(true);
    expect(wrapper.find('.--optionlist').exists()).toBe(false);
    wrapper.find('.dropinput--input-box').trigger('click');
    expect(wrapper.find('.--optionlist').exists()).toBe(true);
  });

  it('should render selected options correctly', async () => {
    const wrapper = mount(<any>MultipleDropSelect);
    wrapper.find('.dropinput--input-box').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.find('.option-item').trigger('click');
    expect(wrapper.find('.dropinput--muti-option-box--text').text()).toBe('Option 1');
  });

  it('should search options correctly', async () => {
    const wrapper = mount(<any>MultipleDropSelect);
    wrapper.find('.dropinput--input-box').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.find('.--optionlist--search-input').setValue('2');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.option-item').length).toBe(2);
    expect(wrapper.find('.option-item:first-child').text()).toBe('Option 2-1');
  });

  it('should clear selected options correctly', async () => {
    const wrapper = mount(<any>MultipleDropSelect);
    wrapper.find('.dropinput--input-box').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.find('.option-item').trigger('click');
    expect(wrapper.find('.dropinput--muti-option-box--text').text()).toBe('Option 1');
    wrapper.find('.dropinput--muti-option-box--text + span').trigger('click');
    expect(wrapper.find('.dropinput--muti-option-box--text').exists()).toBe(false);
  });

  it('should clear all selected options correctly', async () => {
    const wrapper = mount(<any>MultipleDropSelect);
    wrapper.find('.dropinput--input-box').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.find('.option-item').trigger('click');
    expect(wrapper.find('.dropinput--muti-option-box--text').text()).toBe('Option 1');
    expect(wrapper.find('.dropinput--clearable').exists()).toBe(true);
    wrapper.find('.dropinput--clearable').trigger('click');
    expect(wrapper.find('.dropinput--muti-option-box--text').exists()).toBe(false);
  });
});
