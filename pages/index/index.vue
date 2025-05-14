<template>
  <view class="container">
    <view class='search'>
      <uni-search-bar 
        @confirm="search" 
        :focus="true" 
        v-model="searchValue"  
        @input="input" 
        @cancel="cancel" 
        @change="change"
      ></uni-search-bar>
    </view>

    <!-- 导航栏 -->
    <view class='navigator'>
      <view 
        v-for="(item, index) in navList" 
        :key="index" 
        class="nav-item"
        :class="{ active: currentIndex === index }"
        @click="switchTab(index)"
      >
        {{ item }}
      </view>
    </view>

    <!-- 内容区域 -->
    <swiper 
      :current="currentIndex" 
      @change="onSwiperChange"
      :style="{ height: swiperHeight + 'rpx' }"
    >
      <swiper-item v-for="(item, index) in navList" :key="index">
        <scroll-view scroll-y :style="{ height: swiperHeight + 'rpx' }">
          <!-- 推荐商品 -->
          <view v-if="index === 0">
            <view v-for="goods in bookList" :key="goods.id" class="goods-item">
              <image class="goods-image" :src="goods.image" mode="aspectFill"></image>
              <view class="goods-info">
                <text class="goods-title">{{ goods.name }}</text>
                <text class="goods-price">{{ goods.price }}元</text>
              </view>
            </view>
          </view>

          <!-- 新发商品 -->
          <view v-if="index === 1">
            <view v-for="goods in gameList" :key="goods.id" class="goods-item">
              <image class="goods-image" :src="goods.image" mode="aspectFill"></image>
              <view class="goods-info">
                <text class="goods-title">{{ goods.name }}</text>
                <text class="goods-price">{{ goods.price }}元</text>
              </view>
            </view>
          </view>

          <!-- 最近浏览 -->
          <view v-if="index === 2">
            <view v-for="goods in lifeUtilList" :key="goods.id" class="goods-item">
              <image class="goods-image" :src="goods.image" mode="aspectFill"></image>
              <view class="goods-info">
                <text class="goods-title">{{ goods.name }}</text>
                <text class="goods-price">{{ goods.price }}元</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { onLoad,onPullDownRefresh } from '@dcloudio/uni-app'
import { useChatStore } from '../../store/chatStore'
import { useUserStore } from '../../store/useUserStore'
import { ServerURL,WebsocketURL } from '../../config'
import { User } from '../../static/interface/User'
import { Goods } from '../../static/interface/goods'
import { ListRes } from '../../static/interface/ListRes'
// 状态管理
const chatStore = useChatStore()
const userStore = useUserStore()

// 响应式数据
const searchValue = ref("")
const navList = ref(['图书', '游戏', '生活用品'])
const currentIndex = ref(0)
const swiperHeight = ref(0)

const bookList = ref([])
const gameList = ref([])
const lifeUtilList = ref([])
onPullDownRefresh(()=>{
	fetchBookData()
	fetchGame()
	fetchLifeUtil()
	console.log("ok")
	uni.stopPullDownRefresh()
})
// 生命周期
onLoad(() => {
	fetchBookData()
	fetchGame()
	fetchLifeUtil()
	const t=uni.getStorageSync("token")
	if(t==true){
		userStore.meta.isLoggedin=true
		userStore.currentUser=uni.getStorageSync('userInfo') as User
	}
	
	const systemInfo = uni.getWindowInfo()
	swiperHeight.value = systemInfo.windowHeight - 50
	console.log("index:", userStore.meta.isLoggedin)
})

// 事件处理
const switchTab = (index: number) => {
  currentIndex.value = index
}

const onSwiperChange = (e: any) => {
  currentIndex.value = e.detail.current
}

//点击头像等信息跳转聊天界面
const test = async (contactId: string) => {
  try {
    // 创建会话
    chatStore.createSession(contactId)
    chatStore.updatereceiverId(contactId)
	console.log(userStore.currentUser.id)
    // 获取用户信息
    const res :any= await uni.request({
      url: ServerURL+"/add",
      method: 'GET',
      data:{
    	  sid:userStore.currentUser.id,
		  otherid:contactId
      }
    })
	console.log("点击头像进入聊天")
	console.log("连接后端状态码：",res.statusCode)
    if (res.statusCode === 200) {
      const chatInfo = {
        id: contactId,
        avatar: res.data.img,
        username: res.data.username
      }
      
      uni.navigateTo({
        url: `/pages/communicateDetails/communicateDetails?id=${chatInfo.id}&username=${chatInfo.username}&avatar=${chatInfo.avatar}`
      })
    }
  } catch (error) {
    console.error('用户信息获取失败:', error)
    uni.showToast({ title: '连接失败', icon: 'none' })
  }
}

// 搜索相关函数
const search = (res: any) => {
  uni.showToast({
    title: '搜索：' + res.value,
    icon: 'none'
  })
}

const input = (res: any) => console.log('input--', res)
const cancel = (res: any) => console.log("cancel", res)
const change = (res: any) => console.log("change", res)
// 数据获取函数
	const fetchBookData = async () => {
	  try {
		  let random=Date.now()%10
	    const res = await uni.request({
	      url: ServerURL + '/get/goods/图书',
	      method: 'POST',
		  header:{
		  	'Content-Type': 'application/json'
		  },
	      data: { page: random, size: 20 }
	    })
	    if (res.statusCode === 200) {
	      let resVal =res.data as {code:number,message:string,data:any}
		  let date = resVal.data as ListRes;
		  bookList.value = date.list
	      //bookList.value.push(data)//加进数组
	    }
	  }
	  catch (error) {
	  	    uni.showToast({ title: '图书商品加载失败', icon: 'none' })
	  	  }
	}
	
	const fetchGame = async () => {
	  try {
		let random=Date.now()%10
	    const res = await uni.request({
	      url: ServerURL + '/get/goods/游戏',
	      method: 'POST',
		  header:{
		  	'Content-Type': 'application/json'
		  },
	      data: { page: random, size: 20 }
	    })
	    if (res.statusCode === 200) {
	      let resVal =res.data as {code:number,message:string,data:any}
	      let date = resVal.data as ListRes;
	      gameList.value = date.list
	    }
	  }
	  catch (error) {
	  	    uni.showToast({ title: '游戏商品加载失败', icon: 'none' })
	  	  }
	}

	const fetchLifeUtil = async () => {
	  try {
		   let random=Date.now()%10
	    const res = await uni.request({
	      url: ServerURL+"/get/goods/生活用品",
	      method: 'POST',
	      data: { page: random, size: 20 }
	    })
	    if (res.statusCode === 200) {
	      let resVal =res.data as {code:number,message:string,data:any}
	      let date = resVal.data as ListRes;
	      lifeUtilList.value = date.list
	    }
	  }
	  catch (error) {
	  	    uni.showToast({ title: '生活用品商品加载失败', icon: 'none' })
	    }
	}
</script>

<style lang="scss" scoped>
@mixin text-ellipsis($lines: 1) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
  overflow: hidden;
  text-overflow: ellipsis;
}

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

  &:active {
    background: rgba(0,122,255,0.05);
  }
}

.goods-item {
  display: flex;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.goods-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-title {
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
  @include text-ellipsis(2);
}

.goods-price {
  font-size: 32rpx;
  color: #ff5000;
  font-weight: bold;
  margin-top: 10rpx;
}

.test-buttons {
  padding: 20rpx;
  display: flex;
  gap: 20rpx;
  justify-content: center;
  
  button {
    padding: 10rpx 30rpx;
    background-color: #007AFF;
    color: white;
    border-radius: 40rpx;
  }
}
</style>