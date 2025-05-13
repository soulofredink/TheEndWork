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
  </view>
</template>

<script setup lang='ts'>
	
	import { reactive, ref } from 'vue'
	let searchValue = ref("");
	import {onMounted} from "vue"
	import {onLoad} from '@dcloudio/uni-app'
	let navList =ref(['推荐', '新发', '最近']) ;
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
	  height: 80rpx;  
	  border: 0 0 1rpx 0 solid #eee;
	  background: #fff;
	  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
	  ::-webkit-scrollbar {
	    display: none;
	  }
	  justify-content: space-around;
	}
	
	.navigatorbar {
	  display: inline-flex;
	  align-items: center;
	  height: 100%;
	  padding: 0 30rpx;
	  gap: 60rpx;
	  text-align: center;
	}

	navigator {
	  padding: 8rpx 16rpx; 
	  color: #666;
	  transition: all 0.2s;
	  border-radius: 8rpx;
	}
	.nav-item {
	  flex: 1;
	  text-align: center;
	  transition: color 0.3s;
	}
	
	.nav-item.active {
	  color: #007AFF;
	  border-bottom: 2rpx solid #007AFF;
	}
</style>