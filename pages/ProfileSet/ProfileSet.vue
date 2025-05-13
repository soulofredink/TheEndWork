<template>
	<view class="main-container">
		<view class="section">
		  <view class="list">
			  
		    <view class="list-item">
			  <text>头像</text>
				<view class="input-wrapper">
					
				</view>
			</view>
			
			<view class="list-item">
			  <view class="input-wrapper">
				<text>昵称</text><input type="text" v-model="currentUser.username"/>
			  </view>
			</view>
			<view class="list-item"><text>ID</text>
			  <view class="input-wrapper">
			    <text type="text">{{currentUser.id}}</text>
			  </view>
			</view>
			<view class="list-item">
			  <view class="input-wrapper">
				<text>姓名</text><input type="text" v-model="currentUser.name"/>
			  </view>
			</view>
			<view class="list-item">
			  <view class="input-wrapper">
			    <text>性别</text><input type="text" v-model="currentUser.sex"/>
			  </view>
			</view>
			<view class="list-item">
			  <view class="input-wrapper">
			    <text>地址</text><input type="text" v-model="currentUser.address"/>
			  </view>
			</view>
			<view class="list-item save-button">
			  <button 
			  >
				保存修改
			  </button>
			</view>
		  </view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { useUserStore } from '../../store/useUserStore';
	import {storeToRefs} from 'pinia'
	let userStore= useUserStore();
	let {currentUser} = storeToRefs(userStore);
</script>

<style lang="scss" scoped>
.main-container {
  padding: 24rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}
.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 0 24rpx;
  margin-bottom: 12rpx;
  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #eee;
  }

  .list {
    .list-item {
      padding: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }
      
    }
  }
  input {
	flex: 1;
	text-align: right; // 文本右对齐
	padding-left: 20rpx; // 避免文字贴边
	font-size: 30rpx;
	color: #333;

	::v-deep .uni-input-input {
	  text-align: right;
	}
	/* H5 */
	&[type="text"] {
	  text-align: right;
    }
  }
  .input-wrapper {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

  .save-button {
    margin-top: 40rpx;
    border-bottom: none !important;
    justify-content: center;
    
    .save-btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      background: #007AFF;
      color: #fff;
      border-radius: 40rpx;
      font-size: 32rpx;
      transition: opacity 0.3s;
  
      &[disabled] {
        background: #ccc;
        opacity: 0.6;
      }
  
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>


