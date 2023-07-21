<template>
  <be-app-page>
    <view class="login-page">
      <view class="login-area">
        <view class="logo-area">
          <image class="logo" src="/static/images/logo.png" mode="scaleToFill" />
          <view class="title">智能调度系统</view>
        </view>
        <view class="login-form">
          <view class="form-item">
            <be-input
              v-model="formData.username"
              placeholder="请输入用户名"
              placeholder-style="color: #DFDFE0"
            >
            </be-input>
          </view>
          <view class="form-item">
            <be-input
              v-model="formData.password"
              placeholder="请输入密码"
              placeholder-style="color: #DFDFE0"
              password
            >
            </be-input>
          </view>
          <view class="extra-action">
            <be-button class="forget-btn">忘记密码？</be-button>
          </view>
          <be-button class="login-btn" hover>登录</be-button>
        </view>
      </view>
    </view>
  </be-app-page>
</template>

<script setup lang="ts">
const formData = reactive({
  username: '',
  password: ''
});
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #f8f9fd;

  .login-area {
    width: 100%;
    padding: 0rpx 85rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo-area {
      display: flex;
      flex-direction: column;
      align-items: center;

      .logo {
        width: 173rpx;
        height: 94rpx;
      }

      .title {
        font-size: 44rpx;
        font-weight: bold;
        color: #2c3b40;
        line-height: 1;
        margin-top: 10rpx;
      }
    }

    .login-form {
      width: 100%;
      margin-top: 88rpx;

      .form-item {
        width: 100%;
        height: 80rpx;
        background-color: #ffffff;
        border-radius: 40rpx;
        padding: 0rpx 46rpx;
        display: flex;
        align-items: center;

        & + .form-item {
          margin-top: 44rpx;
        }

        uni-input {
          width: 100%;
        }
      }

      .extra-action {
        width: 100%;
        margin-top: 18rpx;
        display: flex;
        justify-content: flex-end;

        .forget-btn {
          font-size: 28rpx;
          font-weight: 400;
          color: #052990;
          line-height: 1;
        }
      }

      .login-btn {
        width: 100%;
        height: 80rpx;
        margin-top: 88rpx;
        background: #4a68cc;
        border-radius: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30rpx;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>
