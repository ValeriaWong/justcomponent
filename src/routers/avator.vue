<template>
<space wrap>
    <div class="avatar-wrapper">
      <div class="avatar_test">
        <div class="c1">
          <JustAvatar :src="imgUrl" size="small" alt="小头像" />
          <JustAvatar :src="imgUrl" size="default" />
          <JustAvatar :src="imgUrl" size="large" />
          <JustAvatar :src="imgUrl" :size="100" isRotated="isRotated" />
        </div>

        <div class="c2">
          <JustAvatar :src="imgUrl" size="small" shape="square" />
          <JustAvatar :src="imgUrl" size="default" shape="square" />
          <JustAvatar :src="imgUrl" size="large" shape="square" />
          <JustAvatar :src="imgUrl" :size="100" shape="square" />
        </div>

        <div class="c3">
          <JustAvatar size="small">Hi</JustAvatar>
          <JustAvatar size="default">Hi</JustAvatar>
          <JustAvatar size="large">Hi</JustAvatar>
          <JustAvatar :size="100">Hi</JustAvatar>
        </div>

        <div class="c4">
          <JustAvatar size="small" shape="square">Hi</JustAvatar>
          <JustAvatar size="default" shape="square">Hi</JustAvatar>
          <JustAvatar size="large" shape="square">Hi</JustAvatar>
          <JustAvatar :size="100" shape="square">Hi</JustAvatar>
        </div>

        <div class="c5">
          <JustAvatar size="small" color="red">Hi</JustAvatar>
          <JustAvatar size="default" color="white" background-color="gray"
            >Hi</JustAvatar
          >
          <JustAvatar size="large" background-color="gray">Hi</JustAvatar>
          <JustAvatar :size="100" background-color="gray">Hi</JustAvatar>
        </div>
      </div>
    </div>
</space>
</template>
<script lang="ts" setup>
import JustAvatar from '../views/avatar/avatar.vue';
import imgUrl from '../assets/image/avatar.png';
</script>