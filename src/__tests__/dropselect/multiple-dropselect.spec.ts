import { mount } from "@vue/test-utils";
import { expect, describe, it } from '@jest/globals';
import MutipleDropselect from '../../views/dropselect/multiple-dropselect.vue'

describe("MutipleDropselect", () => {
  it("renders correctly", () => {
    const wrapper = mount(MutipleDropselect, {
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
    const wrapper = mount(MutipleDropselect, {
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
    const wrapper = mount(MutipleDropselect, {
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
    const wrapper = mount(MutipleDropselect, {
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
    const wrapper = mount(MutipleDropselect, {
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
    const wrapper = mount(MutipleDropselect, {
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
