<template>
  <view class="container">
	
	<view class='search'>
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue"  @input="input" @cancel="cancel" @change="change">
		</uni-search-bar>
	</view>
	<view class='navigator'>
		<view 
			v-for="(item, index) in navList" 
			:key="index" 
			class="nav-item"
			:class="{ navigatorbar:true,active: currentIndex === index }"
			@click="switchTab(index)"
		  >
			{{ item }}
		</view>
	</view>
		<swiper 
			:current="currentIndex" 
			@change="onSwiperChange"
			:style="{ height: swiperHeight + 'rpx' }">
		    <swiper-item v-for="(item, index) in navList" :key="index">
			<scroll-view scroll-y :style="{ height: swiperHeight + 'rpx' }">
			  <view v-if="index === 0">1564551
			  </view>

			  <view v-if="index === 1">2
			  </view>

			  <view v-if="index === 2">3
			  </view>
			  </scroll-view>
		  </swiper-item>
		</swiper>
	
  </view>
</template>

<script setup lang='ts'>
	
	import { reactive, ref } from 'vue'
	let searchValue = ref("");
	import {onMounted} from "vue"
	import {onLoad} from '@dcloudio/uni-app'
	let navList =ref(['推荐', '新发', '附近']) ;
	let currentIndex=ref(0);
	let systemInfo = uni.getSystemInfoSync();
	let swiperHeight=ref(0);

	onLoad(() => {
	  const systemInfo = uni.getWindowInfo();
	  swiperHeight.value = systemInfo.windowHeight - 50 
	})
	
	function switchTab(index: any) {
	  currentIndex.value = index;
	}
	
	// swiper 滑动事件
	function onSwiperChange(e) {
	  currentIndex.value = e.detail.current;
	}
	
	
	function search(res){
		uni.showToast({
			title: '搜索：' + res.value,
			icon: 'none'
		})
	}
	
	function input(res){
		console.log('input--',res);
	}
	
	function cancel(res){
		console.log("cacel",res);
	}
	
	function change(res){
		console.log("change",res)
	}

	
</script>

<style lang="scss" scoped>
	page {
	  margin: 0;
	  padding: 0;
	  height: 100%;
	}
	
	.container {
	  display: flex;
	  flex-direction: column;
	  width: 100vw;
	  height: 100vh;
	  background: #f8f8f8;
	  
	}
	
	.search {
	  padding: 20rpx 30rpx;
	  background: #fff;
	  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
	}
	


.navigator {
  display: flex;
  height: 65rpx;  
  position: relative;
  background: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.06);
  border-bottom: 1rpx solid #f5f5f5; 

  white-space: nowrap;
  overflow-x: auto;
}

.nav-item {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #666;
  position: relative;
  transition: all 0.3s;

  &.active {
    color: #007AFF;
    font-weight: 500;
	//下划线
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 8rpx;
      width: 60rpx;
      height: 4rpx;
      background: #007AFF;
      transform: translateX(-50%);
      border-radius: 2rpx;
      transition: all 0.3s;
    }
  }

  // 点击
  &:active {
    background: rgba(0,122,255,0.05);
  }
}

</style>
