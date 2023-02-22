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
        // eslint-disable-next-line vue/no-mutating-props
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
      // eslint-disable-next-line vue/no-unused-vars
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

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: () => false,
  },
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
      // eslint-disable-next-line no-use-before-define
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
      // eslint-disable-next-line no-use-before-define
      setDateTime(key, val.toString());
    }, 50);
  });
};
// 过滤器
const formatTime = (val: number | string) => {
  if (val < 10) {
    return `0${val}`;
  }
  return `${val}`;
};
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
      // eslint-disable-next-line no-plusplus
      for (
        let i = 1;
        i <= backYearOrDay(Number(newTimeData[1]), Number(newTimeData[0]));
        i++
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
      // newTimeData[3] = (Number(val)).toString()
      newTimeData.splice(11, 2, ...formatTime(Number(val)).split(''));
      DateTime.value = newTimeData.join('');
      break;
    case 'minute':
      // newTimeData[4] = (Number(val)).toString()
      newTimeData.splice(14, 2, ...formatTime(Number(val)).split(''));
      DateTime.value = newTimeData.join('');
      break;
    case 'second':
      // newTimeData[5] = (Number(val)).toString()
      newTimeData.splice(17, 2, ...formatTime(Number(val)).split(''));
      DateTime.value = newTimeData.join('');
      break;
    default:
      break;
  }
};
// 返回时间
const backTime = () => {
  emit('update:modelValue', DateTime.value);
};
// 返回类名
const className = (key: string, value: number | string) => {
  // const newTimeData = DateTime.value.split('-')
  switch (key) {
    case 'year':
      return DateTime.value.slice(0, 4) === value.toString()
        ? 'active_time'
        : '';
    case 'month':
      return DateTime.value.slice(5, 7) === value.toString()
        ? 'active_time'
        : '';
    case 'day':
      return DateTime.value.slice(8, 10) === value.toString()
        ? 'active_time'
        : '';
    case 'hour':
      return DateTime.value.slice(11, 13) === value.toString()
        ? 'active_time'
        : '';
    case 'minute':
      return DateTime.value.slice(14, 16) === value.toString()
        ? 'active_time'
        : '';
    case 'second':
      return DateTime.value.slice(17, 19) === value.toString()
        ? 'active_time'
        : '';
    default:
      return null;
  }
};
// 数据初始化
const init = () => {
  // eslint-disable-next-line no-unused-vars
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  // eslint-disable-next-line no-unused-vars
  const day = new Date().getDate();
  // eslint-disable-next-line no-unused-vars
  const hour = new Date().getHours();
  // eslint-disable-next-line no-unused-vars
  const minute = new Date().getMinutes();
  // eslint-disable-next-line no-unused-vars
  const second = new Date().getSeconds();
  const time = DateTime.value.split('-');
  // time[0] = year.toString()
  // time[1] = month.toString()
  // time[2] = day.toString()
  // time[3] = hour.toString()
  // time[4] = minute.toString()
  // time[5] = second.toString()
  // eslint-disable-next-line no-plusplus
  for (let i = 1980; i < 2100; i++) {
    pickerData.date.year.data.push(i);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 13; i++) {
    pickerData.date.month.data.push(i);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= backYearOrDay(month, Number(time[0])); i++) {
    pickerData.date.day.data.push(i);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 24; i++) {
    pickerData.time.hour.data.push(i);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 60; i++) {
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
onMounted(() => {
  timeChanged();
});
watch(
  () => props.modelValue,
  // eslint-disable-next-line no-unused-vars
  (newValue, oldValue) => {
    timeChanged();
  }
);
init();
</script>

<script lang="ts">
export default {
  name: 'MyPicker',
};
</script>

<style scoped>
@keyframes show {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

#date_time_picker_box {
  width: 100vw;
  background: white;
  position: fixed;
  transition: all linear 0.2s;
  bottom: 0;
  animation: show 0.2s linear;
}

.date_chose_box {
  display: flex;
  background: #0088ff;
  position: relative;
  z-index: 5;
  font-size: 16px;
  height: 30px;
  justify-content: space-between;
}

.date_chose_box .chose {
  display: flex;
  align-items: center;
}

.date_chose_box .ok {
  display: flex;
  align-items: center;
}

.date_chose_box span {
  margin: 5px;
  color: rgba(232, 243, 255, 0.8);
}

.date_chose_box .active {
  margin: 5px;
  color: #ffffff;
}

.date_box {
  display: flex;
  height: 169px;
  padding: 0 20px;
  overflow-y: scroll;
}

.date_box::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  top: 132px;
  left: 0;
  background: #1d212954;
}

.date_box::before {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  top: 80px;
  left: 0;
  background: #1d212954;
}

.date_box > .date_time_item > p {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  margin: 0;
}

.date_box > .date_time_item > .active_time {
  color: #0088ff;
}

.date_box > .date_time_item > active_item {
  color: #0088ff;
}

.date_box > .unit {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date_box > .unit > .unit_item {
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
}

.date_time_item {
  flex: 1;
  overflow-y: scroll;
  height: 150px;
  user-select: none;
  position: relative;
}

#date_time_picker_box::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 40px;
  top: 30px;
  background: red;
  background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.62));
  z-index: 99;
}

#date_time_picker_box::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 6px;
  background: red;
  background: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.62));
  z-index: 99;
}

.date_time_item::-webkit-scrollbar {
  display: none !important;
}
</style>
