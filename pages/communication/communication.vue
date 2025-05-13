<template>
	<view class="main-container">
		<scroll-view
		  class="chat-list"
		  scroll-y
		  refresher-enabled
		  :refresher-triggered="isRefreshing"
		>
		  <view 
		    v-for="(chat, index) in chatList"
		    :key="chat.id"
		    class="chat-item"
		    @click="handleChatClick(chat)"
		  >
		    <!-- 头像 -->
		    <view class="avatar-wrapper">
		      <image 
		        class="avatar" 
		        :src="chat.avatar" 
		        mode="aspectFill"
		      />
		    </view>
		
		    <view class="content">
		      <view class="header">
		        <text class="name">{{ chat.username }}</text>
		        <text class="time">{{ formatTime(chat.time) }}</text>
		      </view>
		
		      <!-- 消息 -->
		      <view class="preview">
		        <text class="message">{{ chat.lastMessage }}</text>
		        <view class="status">
		          <!-- 未读消息 -->
		          <text 
		            v-if="chat.unread > 0"
		            class="badge"
		            :class="{ 'badge-red': !chat.isMuted }"
		          >
		            {{ chat.unread > 99 ? '99+' : chat.unread }}
		          </text>
		        </view>
		      </view>
		    </view>
		  </view>
		</scroll-view>
	</view>
</template>

<script setup lang='ts'>
	import { ref, computed } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	
	// 模拟数据
	const chatList = ref([
	  {
	    id: 1,
	    username: '张三',
	    avatar: 'https://picsum.photos/80/80?1',//图片路径
	    lastMessage: 'null',
	    time: Date.now() - 3600*1000,
	    unread: 3,
	    isMuted: true,
	    isGroup: true
	  },
	  {
	    id: 2,
	    username: '李四',
	    avatar: 'https://picsum.photos/80/80?2',
	    lastMessage: 'null',
	    time: Date.now() - 2*3600*1000,
	    unread: 0,
	  },
	]);
	
	// 刷新状态
	const isRefreshing = ref(false);
	const isLoading = ref(false);
	
	// 时间
	const formatTime = (timestamp) => {
	  const date = new Date(timestamp);
	  const now = new Date();
	  
	  // 显示时间
	  if (date.toDateString() === now.toDateString()) {
	    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
	  }
	  if (date.getDate() === now.getDate() - 1) {
	    return '昨天';
	  }
	  return `${date.getMonth() + 1}/${date.getDate()}`;
	};
	
	// // 下拉刷新
	// const onRefresh = async () => {
	//   isRefreshing.value = true;
	//   // 模拟网络请求
	//   setTimeout(() => {
	//     // 这里应该获取最新数据
	//     isRefreshing.value = false;
	//     uni.showToast({ title: '刷新成功', icon: 'none' });
	//   }, 1000);
	// };
	
	// 点击聊天项
	const handleChatClick = (chat) => {
	  uni.navigateTo({
	    url: '/pages/communicateDetails/communicateDetails?id=${chat.id}&username=${chat.username}'
	  });
	};
	
</script>

<style lang="scss" scoped>
	.main-container {
	  padding: 24rpx;
	  background-color: #f5f7fa;
	  min-height: 100vh;
	}
	.search-bar {
	  padding: 15rpx 30rpx;
	  background-color: #fff;
	}
	
	.chat-list {
	  height: calc(100vh - 120rpx);
	}
	
	.chat-item {
	  display: flex;
	  padding: 20rpx 30rpx;
	  border-bottom: 1rpx solid #f5f5f5;
	
	  .avatar-wrapper {
	    position: relative;
	    margin-right: 25rpx;
	
	    .avatar {
	      width: 90rpx;
	      height: 90rpx;
	      border-radius: 8rpx;
	    }
	  }
	
	  .content {
	    flex: 1;
	    min-width: 0;
	
	    .header {
	      display: flex;
	      justify-content: space-between;
	      margin-bottom: 10rpx;
	
	      .name {
	        font-size: 34rpx;
	        color: #333;
	        max-width: 400rpx;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        white-space: nowrap;
	      }
	
	      .time {
	        font-size: 24rpx;
	        color: #999;
	      }
	    }
	
	    .preview {
	      display: flex;
	      justify-content: space-between;
	
	      .message {
	        flex: 1;
	        font-size: 28rpx;
	        color: #999;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        white-space: nowrap;
	        margin-right: 20rpx;
	      }
	
	      .status {
	        display: flex;
	        align-items: center;
	
	        .mute-icon {
	          margin-right: 10rpx;
	        }
	
	        .badge {
	          min-width: 36rpx;
	          height: 36rpx;
	          padding: 0 8rpx;
	          line-height: 36rpx;
	          text-align: center;
	          font-size: 22rpx;
	          color: white;
	          border-radius: 18rpx;
	          background-color: #999;
	
	          &-red {
	            background-color: #ff3b30;
	          }
	        }
	      }
	    }
	  }
	}
	
</style>
