<template>
	<view class="main-container">
		
	</view>
</template>

<script setup lang="ts">
	
</script>

<style lang="scss" scoped>
.main-container {
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
}

.chat-list {
  flex: 1;
  padding: 20rpx 20rpx 0;
  box-sizing: border-box;
}

.message-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30rpx;
  padding: 0 20rpx;

  // 自己消息
  &.me {
    flex-direction: row;  
    justify-content: flex-end;  

    .bubble {
      background: #95ec69;
      margin-left: 20rpx;  
      order: 1; 
      border-radius: 10rpx;
    }
    
    .avatar-me {
      order: 2;  // 头像排在最后（右侧）
      margin-left: 20rpx;  // 头像与气泡间距
    }
  }

  // 他人消息
  &.other {
    flex-direction: row; 
    .bubble {
      background: #ffffff;
      margin-left: 20rpx;  
      border-radius: 10rpx;
    }
    
    .avatar {
      order: -1;  
    }
  }
}

.avatar, .avatar-me {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.input-area {
  display: flex;
  align-items: center;
  padding: 30rpx 20rpx;
  background: #ffffff;
  border-top: 1rpx solid #e5e5e5;
  margin-bottom: 10rpx;
  .input {
    flex: 1;
    background: #f8f8f8;
    border-radius: 48rpx;
    padding: 20rpx 32rpx;
    margin-right: 20rpx;
    font-size: 30rpx;
    transition: all 0.3s;

    &:focus {
      background: #f0f0f0;
    }
  }

  .send-btn {
    background: #07c160;
    color: white;
    border-radius: 48rpx;
    padding: 0 40rpx;
    height: 80rpx;
    font-size: 30rpx;
    transition: all 0.3s;
    
    &:active {
      background: darken(#07c160, 8%);
      transform: scale(0.96);
    }
  }
}
</style>
