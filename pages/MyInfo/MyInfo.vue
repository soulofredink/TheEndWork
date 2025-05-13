<template>
  <view class="main-container">
    <!-- 个人信息卡片 -->
    <view 
      class="mymessage-card" 
      @click="toProfile('/pages/ProfileSet/ProfileSet')"
    >
		  <image class="headimg"mode="aspectFill"/>
      <view class="info-wrapper">
        <text class="nickname">{{username}}</text>
        <text class="uid">ID:{{id}}</text>
      </view>
      <uni-icons 
        type="forward" 
        size="20" 
        color="#999" 
        class="arrow-icon"
      />
    </view>
	<view class="mymarket">
	  <!-- <view class="mymarket-title">我的交易</view> -->
	  <view class="horizontal-list">
	    <view class="flex-container">
	      <view 
	        v-for="(item,index) in services" 
	        :key="index"
	        class="horizontal-item"
	        @click="handleSetting(item)"
	      >
	        <view class="item-content">
	          <uni-icons 
	            :type="item.icon" 
	            size="36" 
	            :color="item.color"
	            class="service-icon"
	          />
	          <text class="item-label">{{ item.label }}</text>
	        </view>
	      </view>
	    </view>
	  </view>
	</view>

    <!-- 设置列表 -->
    <view class="section">
      <view class="section-title">账户设置</view>
      <view class="list">
        <view 
          v-for="(item) in settings"
          :key="item.id"
          class="list-item"
          @click="handleSetting(item)"
        >
          <view class="item-left">
            <uni-icons 
              :type="item.icon" 
              size="20" 
              :color="item.color"
            />
            <text class="item-label">{{ item.label }}</text>
          </view>
          <uni-icons 
            type="forward" 
            size="16" 
            color="#ccc"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	import {ref,reactive, onMounted} from 'vue'
	import { useUserStore } from '../../store/useUserStore'
	import { storeToRefs } from 'pinia'
	import {onLoad} from '@dcloudio/uni-app'
	import { User } from '../../static/interface/User'
	let username = ref("请登录");
	let id = ref('');
	let userStore = useUserStore()
	const services = reactive([
	  { id:1,icon: 'shop', color: '#00C853', label: '我发布的', path: '/pages' },
	  { id:2,icon: 'cart', color: '#0091EA', label: '我卖出的', path: '/pages' },
	  { id:3,icon: 'gift', color: '#FF6D00', label: '我买到的', path: '/pages/about_us/about_us' }
	])
	const settings = reactive([
	  { id:1,icon: 'gear', color: '#666', label: '账户安全', path: '/pages/security' },
	  { id:2,icon: 'notification', color: '#666', label: '消息通知', path: '/pages/notify' },
	  { id:3,icon: 'clear', color: '#666', label: '清理缓存', path: 'clearCache' }
	])

	
	const toProfile=(path:any)=>{
		if(!userStore.isLogin){
			uni.redirectTo({url:"/pages/SignIn/SignIn"})
		}else  {
		  uni.navigateTo({ url: path })
		}
	}

	const handleSetting = (item: any) => {
	  if(item.path != 'clearCache'){
		  uni.navigateTo({
			url: item.path,
		  })
	  }else{
		  uni.showModal({
			title: '提示',
			content: '确定要清除缓存吗？',
			success: (res) => {
			  if (res.confirm) {
				// 执行清除缓存逻辑
				uni.removeStorageSync("token")
				uni.removeStorageSync("userInfo")
			  }
			}
		  })
	  }
	}
	onLoad(()=>{
		 if(uni.getStorageSync("token")){
		 	console.log()
		 	userStore.meta.isLoggedin = true;
		 	let userInfo = uni.getStorageSync('userInfo') as User
		 	username.value = userInfo.username;
		 	id.value = userInfo.id;
		 }else{
		 	username.value = userStore.currentUser.username
			id.value = userStore.currentUser.id;
		 }
	})
</script>

<style lang="scss" scoped>
.main-container {
  padding: 24rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.mymessage-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);

  .headimg {
    width: 145rpx;
    height: 145rpx;
    border-radius: 35rpx;
    margin-right: 32rpx;
    border: 2rpx solid #f0f0f0;
  }

  .info-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .nickname {
      font-size: 36rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 12rpx;
    }

    .uid {
	  margin-top: 10rpx;
      font-size: 25rpx;
      color: #999;
    }
  }

  .arrow-icon {
    margin-left: auto;
  }
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
      padding: 32rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .item-left {
        display: flex;
        align-items: center;

        .item-label {
          font-size: 30rpx;
          color: #333;
          margin-left: 24rpx;
        }
      }
    }
  }
}
.mymarket{
	background: #fff;
	border-radius: 16rpx;
	padding: 0 24rpx;
	margin-bottom: 12rpx;
}
.horizontal-list {
  //padding: 10rpx 0;
  
  .flex-container {
    display: flex;
    justify-content: space-between;
    padding: 0 10rpx;
  }

  .horizontal-item {
    flex: 1;
    margin: 0 10rpx;
    //background: #f8f9fa;
    border-radius: 16rpx;
    padding: 20rpx 0;
    
    .item-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .service-icon {
        margin-bottom: 20rpx;
        background: #fff;
        padding: 16rpx;
        border-radius: 50%;
        box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
      }
      
      .item-label {
        font-size: 26rpx;
        color: #333;
        text-align: center;
        line-height: 1.4;
        white-space: nowrap;
      }
    }
  }
}
</style>