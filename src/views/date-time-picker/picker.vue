<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div id="date_time_picker_box">
    <div class="date_chose_box">
      <div class="chose">
        <span :class="type == 0 ? 'active' : ''" @click="type = 0">日期</span>
        <span :class="type == 1 ? 'active' : ''" @click="type = 1">时间</span>
      </div>
      <div class="ok">
        <span style="float: right" @click="show = false">取消</span>
        <span style="float: right" @click="backTime">确认</span>
      </div>
    </div>
    <!--      日期-->
    <div class="date_box" v-show="type == 0">
      <template v-for="(dateValue, key, index) in pickerData.date">
        <div
          class="date_time_item"
          :id="key"
          @touchstart="isStop(true, key)"
          @touchend="isStop(false, key)"
          @scroll="scrolle($event, key)"
        >
          <p id="scynull1"></p>
          <p
            :class="[key + item, className(key, formatTime(item))]"
            v-for="(item, index) in dateValue.data"
            :key="item"
          >
            {{ item }}
          </p>
          <p id="scynul2l" style="height: 70px"></p>
        </div>
        <div class="unit">
          <div class="unit_item">
            {{ dateValue.unit }}
          </div>
        </div>
      </template>
    </div>
    <!--      时间-->
    <div class="time_box date_box" v-show="type == 1">
      <template v-for="(dateValue, key, index) in pickerData.time">
        <div
          class="date_time_item"
          :id="key"
          @touchstart="isStop(true, key)"
          @touchend="isStop(false, key)"
          @scroll="scrolle($event, key)"
        >
          <p></p>
          <p
            :class="[key + item, className(key, formatTime(item))]"
            v-for="(item, index) in dateValue.data"
            :key="item"
          >
            {{ formatTime(item) }}
          </p>
          <p style="height: 70px"></p>
        </div>
        <div class="unit">
          <div class="unit_item">
            {{ dateValue.unit }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineProps, watch } from 'vue';

const show = ref();
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: () => '2000/01/01 00:00:00',
  },
});
// YYYY-mm-dd
const DateTime = ref('1980/01/01 00:00:00');
// dom数据
const pickerData = reactive({
  date: {
    year: {
      unit: '年',
      data: [] as number[],
    },
    month: {
      unit: '月',
      data: [] as number[],
    },
    day: {
      unit: '日',
      data: [] as number[],
    },
  },
  time: {
    hour: {
      unit: '时',
      data: [] as number[],
    },
    minute: {
      unit: '分',
      data: [] as number[],
    },
    second: {
      unit: '秒',
      data: [] as number[],
    },
  },
});
const emit = defineEmits(['update:modelValue']);
const type = ref(0);
const stop = ref(false);
// 存放dom元素
let refScrollTarget: { scrollTop: any } | null = null;
// 延时器
let timer: any = null;
// 判断闰年和月份天数
const backYearOrDay = (val: number, year: number) => {
  const Days = [1, 3, 5, 7, 8, 10, 12];
  if (val === 2) {
    if (year % 4 === 0) {
      return 29;
    }
    return 28;
  }
  if (Days.includes(val)) {
    return 31;
  }
  return 30;
};
// 触摸事件
const isStop = (val: boolean, key: string) => {
  stop.value = val;
  if (!stop.value && refScrollTarget) {
    setTimeout(() => {      
      scrolle(refScrollTarget, key);
    });
  }
};
// 滚动事件
const scrolle = (event: any, key: string) => {
  refScrollTarget = event;
  // 滑动状态中就不执行后面代码
  if (stop.value === true) {
    return;
  }
  if (timer) {
    clearTimeout(timer);
  }
  setTimeout(() => {
    timer = setTimeout(() => {
      // 元素高度
      const itemHeight = 50;
      // 滚动结余量
      const scollValue = event.target.scrollTop % itemHeight;
      // 如果高度对应就返回
      if (scollValue - itemHeight === 0) {
        return;
      }
      if (itemHeight - scollValue > itemHeight / 2) {
        // eslint-disable-next-line operator-assignment
        event.target.scrollTop = event.target.scrollTop - scollValue;
      }
      if (itemHeight - scollValue <= itemHeight / 2) {
        event.target.scrollTop =
          event.target.scrollTop - scollValue + itemHeight;
      }
      const val = Math.round(event.target.scrollTop / itemHeight) || 0;
      setDateTime(key, val.toString());
    }, 50);
  });
};
// 过滤器
const formatTime = (val: number | string) => val < 10 ? `0${val}` : `${val}` 
// 设置时间
const setDateTime = (key: string, val: string) => {
  const newTimeData = DateTime.value.split('');
  switch (key) {
    case 'year':
      newTimeData.splice(0, 4, ...(Number(val) + 1980).toString().split(''));
      DateTime.value = newTimeData.join('');
      break;
    case 'month':
      newTimeData.splice(5, 2, ...formatTime(Number(val) + 1).split(''));
      pickerData.date.day.data = [];
      //  月份改变日期改变
      for (
        let i = 1;
        i <= backYearOrDay(Number(newTimeData[1]), Number(newTimeData[0]));
        i += 1
      ) {
        pickerData.date.day.data.push(i);
      }
      DateTime.value = newTimeData.join('');
      break;
    case 'day':
      // newTimeData[2] = (Number(val) + 1).toString()
      newTimeData.splice(8, 2, ...formatTime(Number(val) + 1).split(''));
      DateTime.value = newTimeData.join('');
      break;
    case 'hour':
      newTimeData.splice(11, 2, ...formatTime(Number(val)).split(''));
      DateTime.value = newTimeData.join('');
      break;
    case 'minute':
      newTimeData.splice(14, 2, ...formatTime(Number(val)).split(''));
      DateTime.value = newTimeData.join('');
      break;
    case 'second':
      newTimeData.splice(17, 2, ...formatTime(Number(val)).split(''));
      DateTime.value = newTimeData.join('');
      break;
    default:
      break;
  }
};
// 返回时间
const backTime = () => {emit('update:modelValue', DateTime.value);};
// 返回类名
const className = (key: string, value: number | string) => {
  switch (key) {
    case 'year':
      return DateTime.value.slice(0, 4) === value.toString()  ? 'active_time'  : '';
    case 'month':
      return DateTime.value.slice(5, 7) === value.toString()  ? 'active_time'  : '';
    case 'day':
      return DateTime.value.slice(8, 10) === value.toString() ? 'active_time' : '';
    case 'hour':
      return DateTime.value.slice(11, 13) === value.toString() ? 'active_time'  : '';
    case 'minute':
      return DateTime.value.slice(14, 16) === value.toString() ? 'active_time'  : '';
    case 'second':
      return DateTime.value.slice(17, 19) === value.toString() ? 'active_time'  : '';
    default:
      return null;}};
// 数据初始化
const init = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const second = new Date().getSeconds();
  const time = DateTime.value.split('-');
  for (let i = 1980; i < 2100; i += 1) {
    pickerData.date.year.data.push(i);
  }
  for (let i = 1; i < 13; i += 1) {
    pickerData.date.month.data.push(i);
  }
  for (let i = 1; i <= backYearOrDay(month, Number(time[0])); i += 1) {
    pickerData.date.day.data.push(i);
  }
  for (let i = 0; i < 24; i += 1) {
    pickerData.time.hour.data.push(i);
  }
  for (let i = 0; i < 60; i += 1) {
    pickerData.time.minute.data.push(i);
    pickerData.time.second.data.push(i);
  }
  DateTime.value = time.join('-');
};
// 时间改变
const timeChanged = () => {
  if (props.modelValue) {
    DateTime.value = props.modelValue;
  }
  ((document.getElementById('year') as any).scrollTop as any) =
    (Number(DateTime.value.slice(0, 4)) - 1980) * 50;
  ((document.getElementById('month') as any).scrollTop as any) =
    (Number(DateTime.value.slice(5, 7)) - 1) * 50;
  ((document.getElementById('day') as any).scrollTop as any) =
    (Number(DateTime.value.slice(8, 10)) - 1) * 50;
  ((document.getElementById('hour') as any).scrollTop as any) =
    Number(DateTime.value.slice(11, 13)) * 50;
  ((document.getElementById('minute') as any).scrollTop as any) =
    Number(DateTime.value.slice(14, 16)) * 50;
  ((document.getElementById('second') as any).scrollTop as any) =
    Number(DateTime.value.slice(17, 19)) * 50;
};
onMounted(() => {timeChanged();});
watch(() => props.modelValue,(newValue, oldValue) => {timeChanged();});
init();
</script>
<script lang="ts">
export default {
  name: 'DateTimePicker',
};
</script>
<style lang="scss" scoped>
@import '../../styles/index';
@include date-time-picker-wrapper;
</style>
