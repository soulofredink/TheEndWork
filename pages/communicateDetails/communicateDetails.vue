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
	import { reactive,ref,nextTick, onMounted ,getCurrentInstance, computed, onUnmounted} from 'vue'
	import Vue from 'vue'
	import { useUserStore } from '../../store/useUserStore';
	import { useChatStore } from '../../store/chatStore';
	import {storeToRefs} from 'pinia'
	import websocketUtil from '../../script/webSocket';
	import { ServerURL,WebsocketURL } from '../../config';
	const chatStore = useChatStore()
	const userStore = useUserStore()
	//uni.setStorageSync('userInfo',userStore.currentUser)
	const inputText = ref('')
	const scrollId = ref('')
	const chatId = ref('')
	const username = ref('')
	const avatar = ref('')
	let websocket: websocketUtil | null = null
	
	// 初始化 WebSocket
	const initWebSocket = () => {
	  if (!userStore.currentUser?.id) return
	  
	websocket = new websocketUtil(
	    WebsocketURL+`${userStore.currentUser.id}`,
	    5000
	)
	websocket.getMessage((res:any)=>{
		console.log("有人来消息了：",res.sender)
		if (chatStore.sessions.find(s => s.id === res.sender)) {
			console.log("此消息的会话存在，不需要创建新的")
		}
		else chatStore.createSession(res.sender)
		const a=Date.now()
		const s=a.toString()
		chatStore.handleIncomingMessage({
			id: s,
			content: res.content,
			sender: res.sender,
			receiver: userStore.currentUser.id,
			timestamp:a
		})
	  	console.log(res);
	  })
	}
	
	// 消息列表
	const messages = computed(() => 
	  chatStore.currentMessages.map(msg => ({
	    ...msg,
	    isMe: msg.sender === userStore.currentUser?.id
	  }))
	)
	
	interface sendMessageTo{
		sender:string
		message:string
		sendTime:number
		receiver:string
	}
	// 发送消息
	const sendMessage = () => {
		//去空格
		//console.log("000:",userStore.currentUser.id)
		if (!inputText.value.trim()) return
		//加入本地
		chatStore.sendMessage(inputText.value.trim(),chatId.value)
		const msg: sendMessageTo = {
		  sender:userStore.currentUser.id,
		  message: inputText.value,
		  sendTime: Date.now(),
		  receiver: chatId.value
		}
		//console.log("curid:",chatId.value)
		websocket.send(JSON.stringify(msg))
		inputText.value = ''
		scrollToBottom()
	}
	
	// 滚动到底部
	const scrollToBottom = () => {
	  nextTick(() => {
	    if (chatStore.currentMessages.length > 0) {
	      scrollId.value = `msg${chatStore.currentMessages.length - 1}`
	    }
	  })
	}
	
	// 生命周期
	onMounted(() => {
	  initWebSocket()
	  scrollToBottom()
	})
	
	onUnmounted(() => {
		websocket?.close()
		console.log("关闭成功")
		chatStore.clearUnreadCount(chatStore.currentSessionId)
		chatStore.currentSessionId = ''
	})
	
	onLoad((chat)=>{
		chatId.value = chat.id || '未知ID'
		username.value = chat.username || '匿名用户'
		avatar.value = chat.avatar ? decodeURIComponent(chat.avatar) : '/static/default-avatar.png'
		//console.log("123:",userStore.meta.isLoggedin)
		//uni.setStorageSync('userInfo',userStore.currentUser)
	})

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
	  padding: 18rpx 24rpx;
	  word-break: break-word; 
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
	  padding: 18rpx 24rpx;
	  word-break: break-word; 
    }
    
    .avatar {
      order: -1;  
    }
  }
}

.avatar, .avatar-me {
  width: 80rpx;
  height: 80rpx;
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
