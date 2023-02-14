<!-- 登录页 -->
<script setup lang="ts">
import { ref, computed } from 'vue';

const show = ref(false);
const showMulti = ref(false);
const single = ref();
const AreaList = ref({
  province_list: {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    150000: '内蒙古自治区',
    210000: '辽宁省',
    220000: '吉林省',
    230000: '黑龙江省',
    310000: '上海市',
    320000: '江苏省',
    330000: '浙江省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    440000: '广东省',
    450000: '广西壮族自治区',
    460000: '海南省',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
    130100: '石家庄市',
    130200: '唐山市',
    130300: '秦皇岛市',
    130400: '邯郸市',
    130500: '邢台市',
    130600: '保定市',
    130700: '张家口市',
    130800: '承德市',
    130900: '沧州市',
    131000: '廊坊市',
    131100: '衡水市',
    140100: '太原市',
    140200: '大同市',
    140300: '阳泉市',
    140400: '长治市',
    140500: '晋城市',
    140600: '朔州市',
    140700: '晋中市',
    140800: '运城市',
    140900: '忻州市',
    141000: '临汾市',
    141100: '吕梁市',
    150100: '呼和浩特市',
    150200: '包头市',
    150300: '乌海市',
    150400: '赤峰市',
    150500: '通辽市',
    150600: '鄂尔多斯市',
    150700: '呼伦贝尔市',
    150800: '巴彦淖尔市',
    150900: '乌兰察布市',
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区',
    110107: '石景山区',
    110108: '海淀区',
    110109: '门头沟区',
    110111: '房山区',
    110112: '通州区',
    110113: '顺义区',
    110114: '昌平区',
    110115: '大兴区',
    110116: '怀柔区',
    110117: '平谷区',
    110118: '密云区',
    110119: '延庆区',
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    120106: '红桥区',
    120110: '东丽区',
    120111: '西青区',
    120112: '津南区',
    120113: '北辰区',
    120114: '武清区',
    120115: '宝坻区',
    120116: '滨海新区',
    120117: '宁河区',
    120118: '静海区',
    120119: '蓟州区',
    130102: '长安区',
    130104: '桥西区',
    130105: '新华区',
    130107: '井陉矿区',
    130108: '裕华区',
    130109: '藁城区',
    130110: '鹿泉区',
    130111: '栾城区',
    130121: '井陉县',
    130123: '正定县',
    130125: '行唐县',
    130126: '灵寿县',
    130127: '高邑县',
    130128: '深泽县',
  },
});
const selected = ref(['']);
// const levelSelected = ref([0, 1,2]);
const handleClick = (cityName: string, index: number) => {
  if (selected.value.indexOf(cityName) === -1) {
    selected.value.push(cityName);
  } else {
    selected.value.splice(index, 1);
  }
};

const handleSingleClick = (cityName: string) => {
  single.value = cityName;
};

// const removeClick = (index) => {
//   selected.value.splice(index, 1);
// };

const formatData = computed(() => selected.value.join(','));

const handleInput = (e: any) => {
  // eslint-disable-next-line no-console
  console.log('handleInput::', e);
};
</script>
<template>
  <div class="container">
    <div class="single-wrapper">
      <div class="dropinput dropinput-S">
        <input 
          @focus="show = true"
          v-model="single"
          type="text"
          placeholder="select single"
        />
        <img
          class="dropinput--select-arrow"
          @click="show = !show"
          src="../../assets/dropdown.svg"
        />
      </div>
      <div v-if="show" class="--optionlist">
        <div
          class="--optionlist-item"
          v-for="(city, index) in AreaList.city_list"
          :key="index"
          @click="handleSingleClick(city)"
        >
          <span v-text="city"></span><span v-if="city == single">√</span>
        </div>
      </div>
    </div>
    <div class="multi-wrapper">
      <div class="dropinput">
        <input
          @focus="showMulti = true"
          v-model="formatData"
          type="text"
          placeholder="select"
          @input="handleInput"
        />
        <img
          class="dropinput--select-arrow"
          @click="showMulti = !showMulti"
          src="../../assets/dropdown.svg"
        />
      </div>
      <div class="multi-wrapper" v-if="showMulti">
        <div
          class="--optionlist-item"
          v-for="(city, index) in AreaList.city_list"
          :key="index"
          @click="handleClick(city, index)"
        >
          <span v-text="city"></span
          ><span v-if="selected.indexOf(city) != -1">√</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/index';
@include dropselect-wrapper;

</style>
