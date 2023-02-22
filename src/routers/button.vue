<script lang="ts" setup>
import JustButton from '../views/button/button.vue';
import JustButtonLoading from '../views/button/loadingbutton.vue';

</script>
<template>
    <space wrap>
        <div class="btn-wrapper">
      <div class="btn-able-wrapper" >
        <div> 
          <JustButton type="primary">主要按钮</JustButton>
          <JustButton type="secondary">次级按钮</JustButton>
          <JustButton type="revert">回退按钮</JustButton>
          <JustButton type="icon"></JustButton>
          <JustButton type="icon" icon="clear"></JustButton>
          <JustButton type="icon" icon="download"></JustButton>
        </div>
        <hr>
      </div>
      <div class="btn-disable-wrapper" > 禁用
        <div>
          <JustButton disabled>默认按钮</JustButton>
          <JustButton type="primary" disabled>主要按钮</JustButton>
          <JustButton type="secondary" disabled>次级按钮</JustButton>
          <JustButton type="revert" disabled>回退按钮</JustButton>
        </div>
        <hr>
      </div>
      <div>图标按钮
        <JustButton type="icon"></JustButton>
        <JustButton type="icon" icon="clear"></JustButton>
        <JustButton type="icon" icon="download"></JustButton>
      </div>
      <hr>
      <div>
        <div class="btn-shape-wrapper" >按钮形状 
          <div> 
            <JustButton round="square">方角</JustButton>
            <JustButton round="round">圆角</JustButton>
            <JustButton round="other1">平行四边形</JustButton>
            <JustButton round="other2">椭圆</JustButton>
            <JustButton round="other3">平行四边形</JustButton>
            <JustButton round="other4">活力标题</JustButton>
          </div>
          <hr>
        </div>
        <div class="btn-size-wrapper" >按钮大小
          <div>
            <JustButton type="primary" size="S">主要按钮</JustButton>
            <JustButton type="primary" size="M">主要按钮</JustButton>
            <JustButton type="primary" size="L">主要按钮</JustButton>
          </div>

          <div>
            <JustButton type="secondary" size="S">次级按钮</JustButton>
            <JustButton type="secondary" size="M">次级按钮</JustButton>
            <JustButton type="secondary" size="L">次级按钮</JustButton>
          </div>

          <div>
            <JustButton type="revert" size="S">回退按钮</JustButton>
            <JustButton type="revert" size="M">回退按钮</JustButton>
            <JustButton type="revert" size="L">回退按钮</JustButton>
          </div>
          <hr>
        </div>
        <div class="btn-loading-wrapper" > loading
          <div style="display: flex">
            <!--防止点击后更换位置，需要在父级块状元素处增加style="display: flex;"-->
            <JustButtonLoading type="primary"
              >点击切换loading的主要按钮</JustButtonLoading
            >
            <JustButtonLoading type="secondary"
              >点击切换loading的次级按钮</JustButtonLoading
            >
            <JustButtonLoading type="revert"
              >点击切换loading的回退按钮</JustButtonLoading
            >
            <!-- component event should use emit, default event like 'click' may block -->
          </div>
        </div>
      </div>
    </div>
    </space>
</template>
<style lang="scss">
div {
  font-size: 14px;}
</style>