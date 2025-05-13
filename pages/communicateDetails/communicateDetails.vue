<template>
	<view class="main-container">
		<scroll-view
			class="chat-list" 
			scroll-y 
			:scroll-into-view="scrollId"
			:scroll-with-animation="true"
		>
			<view
				v-for="(msg, index) in messages" 
				:key="msg.id"
				:id="'msg'+index"
				class="message-container"
				:class="[msg.isMe ? 'me' : 'other']"
			>
				<image
					v-if="!msg.isMe"
					class="avatar"
					src="/static/avatar-other.jpg"
					mode="aspectFill"
				/>
				<view class="bubble">
					<text>{{ msg.content }}</text>
				</view>
				<image
					v-if="msg.isMe"
					class="avatar-me"
					src="/static/avatar-me.jpg"
					mode="aspectFill"
				/>
			</view>
		</scroll-view>
		<view class="input-area">
			<input 
				class="input"
				v-model="inputText"
				placeholder="输入消息"
				confirm-type="send"
				@confirm="sendMessage"
			/>
			<button class="send-btn" @click="sendMessage">发送</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {onLoad} from '@dcloudio/uni-app'
	import { reactive,ref,nextTick } from 'vue'
	interface Message {
	  id: number
	  content: string
	  time: number
	  isMe: boolean
	}
	const username = ref('匿名')
	let scrollId=ref("")
	const inputText = ref('')
	onLoad((options)=>{
		username.value = decodeURIComponent(options.username || '')
		uni.setNavigationBarTitle({
			title:username.value
		})
	})
	const messages = reactive<Message[]>([
	  {
	    id: 1,
	    content: '你好',
	    time: Date.now() - 3600*1000,
	    isMe: false
	  },
	  {
	    id: 2,
	    content: '123',
	    time: Date.now() - 1800*1000,
	    isMe: true
	  }
	])
	const sendMessage=()=>{
		//移除首尾空白字符
		if (!inputText.value.trim()) return
		const newMsg= {
		  id: Date.now(),
		  content: inputText.value.trim(),
		  time: Date.now(),
		  isMe: true
		}
		messages.push(newMsg)
		inputText.value = ''
		//scrollToBottom()
	}
	// // 滚动到底部
	// const scrollToBottom = () => {
	//   nextTick(() => {
	//     if(messages.length > 0) {
	//       scrollId.value = 'msg' + (messages.length - 1)
	//     }
	//   })
	// }
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
