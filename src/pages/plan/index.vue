<template>
  <be-app-page>
    <view class="index-page">
      <view class="main-area">
        <view class="icon-box">
          <image
            :src="`/static/images/plan/${planStatus === 0 ? 'plan-icon' : 'plan-icon-hl'}.png`"
            mode="scaleToFill"
          />
        </view>
        <view class="plan-title" :class="{ disabled: planStatus === 0 }">
          {{ planStatus === 0 ? '当前无指令计划' : '当前指令计划' }}
        </view>
        <view class="no-plan-desc" v-if="planStatus === 0">
          预计<text>7月20号</text>安排过闸计划，有疑问请与指挥中心联系
        </view>
        <view class="plan-desc" v-else>
          <view class="plan-desc-row">指挥中心提醒您</view>
          <view class="plan-desc-row">鑫赫 1688</view>
          <view class="plan-desc-row">请于<text>10:00</text>时 起航下行，</view>
          <view class="plan-desc-row">预计11:00时到达 石牌水域。</view>
        </view>
        <be-button
          class="execute-btn"
          disabled-class="disabled"
          hover
          :disabled="planStatus === 0"
          @click="executePlan"
        >
          执行计划
        </be-button>
        <be-button v-if="planStatus === 0" class="plan-table-btn" hover>
          目前船舶在滚动预计划蓝表中
        </be-button>
      </view>
    </view>
  </be-app-page>
</template>

<script setup lang="ts">
// 0:无计划 1:未执行 2:已执行
const planStatus = ref(1);

// 执行计划
const executePlan = () => {
  window.location.href = 'http://baidu.com';
  // uni.navigateTo({
  //   url: '/pages/map/index'
  // });
};
</script>

<style lang="scss" scoped>
.index-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .main-area {
    width: 100%;
    padding: 0rpx 52rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon-box {
      width: 294rpx;
      height: 294rpx;
      background-color: #eef1f9;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      image {
        width: 123rpx;
        height: 123rpx;
      }
    }

    .plan-title {
      margin-top: 48rpx;
      font-size: 44rpx;
      font-weight: bold;
      color: #2c3b40;
      line-height: 1;

      &.disabled {
        color: #cbced6;
      }
    }

    .no-plan-desc {
      width: 100%;
      margin-top: 48rpx;
      margin-bottom: 100rpx;
      font-size: 36rpx;
      font-weight: 400;
      color: #9fa2a9;
      line-height: 52rpx;
      text-align: center;

      text {
        color: #052990;
        font-weight: bold;
      }
    }

    .plan-desc {
      width: 100%;
      margin-top: 40rpx;
      margin-bottom: 64rpx;
      background-color: #eff3ff;
      border-radius: 10px;
      padding: 38rpx;
      text-align: center;
      font-size: 36rpx;
      font-weight: 400;
      color: #2c3b40;
      line-height: 52rpx;

      .plan-desc-row {
        text {
          font-weight: bold;
        }
      }
    }

    .execute-btn {
      width: 100%;
      height: 80rpx;
      background-color: #4a68cc;
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      font-weight: bold;
      color: #ffffff;

      &.disabled {
        background-color: #cbced6;
      }
    }

    .plan-table-btn {
      margin-top: 34rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #052990;
      line-height: 1;
      text-decoration: underline;
    }
  }
}
</style>
