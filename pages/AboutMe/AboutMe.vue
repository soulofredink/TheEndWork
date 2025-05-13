<template>
  <view class="about-page">
    <view class="header">
      <image 
        class="logo" 
        src="/static/logo.png" 
        mode="aspectFit"
      />
      <text class="app-name">工程造价助手</text>
      <text class="version">版本号：{{ version }}</text>
    </view>
    
    <view class="content">
      <text class="desc">
        我们致力于为建筑行业提供智能化管理解决方案，整合项目进度、人员协同、物资管理等功能，助力工程数字化转型升级。
      </text>
      <text class="website">该小程序引用的网站资源如下：</text>
    </view>
	<view class="contact">
      <text>邮箱：1145141919810@qq.com</text>
      <text>电话：114-514-1919</text>
    </view>
  </view>
  
</template>

<script setup lang="ts">
	import {ref} from "vue"
	const version = ref('v0.0.1')
</script>

<style lang="scss" scoped>
.about-page {
  padding: 40rpx;
  .header {
    text-align: center;
    .logo {
      width: 175px;
      height: 175rpx;
      margin-bottom: 20rpx;
    }
    .app-name {
      display: block;
      font-size: 44rpx;
      font-weight: bold;
      color: #333;
    }
    .version {
      color: #666;
      font-size: 28rpx;
    }
  }
  .content { 
    margin-top: 60rpx;
    .desc {
      line-height: 1.8;
      color: #666;
    }
  }
}
.contact {
	text-align: center;
	margin-bottom: 0rpx;
}
</style>