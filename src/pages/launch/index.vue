<template>
  <view class="launch-page">
    <u-loading-page :loading="true" iconSize="28"></u-loading-page>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { BasicPageEnum } from '@/enums/pageEnum';

const userStore = useUserStore();
if (userStore.isLogin) {
  uni.switchTab({
    url: BasicPageEnum.HOME
  });
} else {
  uni.redirectTo({
    url: BasicPageEnum.LOGIN
  });
}
</script>

<style lang="scss" scoped>
.launch-page {
  width: 100%;
  height: 100%;
}
</style>
