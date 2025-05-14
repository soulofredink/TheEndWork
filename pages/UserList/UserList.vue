<template>
	<view class="container">
		<scroll-view class="userList">
			<view v-for="user in userList" class="user-item" @click="">
				<view class='header'><image class='img' :src="user.img" mode="aspectFill"/> </view>
				<view class='username'>{{user.username}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang='ts'>
	import { reactive } from 'vue';
	import {goods} from '../../static/interface/goods'
	let userList = reactive([{img:"../../static/img/墨染红魂.jpg",username:'小王'}]) 
	
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
	
	.userList{
		width:100%;
		hegiht:60rpx;
	}
	.user-item{
		display:flex;
		border:1rpx solid #4a4a4a;
		background-color: #4a4a4a;
		.img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 12rpx;;
		}
		.user-item {
			
		}
	}
	
	
</style>
