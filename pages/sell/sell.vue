<template>
	<view class="container">
		<!-- 图片上传区域 -->
		<view class="image-box" @tap="addImage" :class="{ 'image-active': !isText }">
			<text v-if="isText" class="tip-text">+ 点击添加商品图片</text>
			<image 
				v-if="!isText"
				mode="aspectFill" 
				:src="src" 
				class="preview-image"
				@tap.stop="handleImageTap"
			/>
			<view v-if="!isText" class="delete-mask" @tap.stop="deleteImage">
				<text class="iconfont icon-shanchu">X</text>
			</view>
		</view>

		<!-- 商品信息表单 -->
		<view class="goods-info">
			<uni-forms :modelValue="good">
				<uni-forms-item label="名称" name="name">
					<input type="text" v-model="good.name" placeholder="请输入商品名称" @blur="isVaild('name')"/>
				</uni-forms-item>
				<uni-forms-item label="价格" name="price">
					<input type="text" v-model="good.price" placeholder="请输入价格" @blur="isVaild('price')"/>
				</uni-forms-item>
				<uni-forms-item required name="type" label="类型">
					<input  v-model="type" placeholder="商品类型" @tap="chooseType" @blur="isVaild('type')" readonly/>
				</uni-forms-item>
				<uni-forms-item required name="description" label="描述" >
					<textarea 
					      v-model="good.description"
					      placeholder="请输入商品描述（140字以内）"
					      placeholder-style="color: #999;"
					      auto-height
						  @focus="changeIsFocus"
						  @blur="onBlur"
						  :class="{
						        'description-box': true,
						        'description-focus': isFocus
						      }"
						
					    />
					    <!-- 字数统计 -->
					    <view class="word-count">
					      {{ good.description.length }}/140
					    </view>
				</uni-forms-item>
			</uni-forms>
			<view class="submit-btn">
				<button type="primary" @click="submitForm">立即发布</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, reactive, ref,watch, watchEffect } from 'vue'
import { useUserStore } from '../../store/useUserStore'
import {onLoad} from '@dcloudio/uni-app'
import {User} from "../../static/interface/User"
import { Goods } from '../../static/interface/goods'
import { ServerURL,WebsocketURL } from '../../config'
enum GOODS_TYPE {
	BOOK= 0,
	GAME=1,
	LIFE_UTIL=2,
}
let isType = ref(false)
let isName = ref(false)
let isPrice = ref(false)
let isDescription = ref(false)
const good : Goods = reactive({
  userId:"",                 // computed(() => userStore.currentUser?.id || ""),
  name: "", 
  price: null,
  description: "",
  image: "",
  type:null,
})
let type = ref("")
const userStore = useUserStore();
const isText = ref(true);
const src = ref("");
const formRef = ref();
let isFocus = ref(false)
//检测逻辑变量
function showError(title:string){
	uni.showToast({
		title,
		icon:"none",
		duration:3000,
	})
}
function isVaild(Type:string){
	switch(Type){
		case "type":
		if(type.value != '游戏' && type.value != '图书' && type.value != '生活用品'){
			showError("商品类型错误")
			isType.value = false
		}else{
			isType.value = true
		}
		break
		case "name":
		if(good.name == '' || good.name.length > 20){
			showError("商品名字长度1-20")
			isName.value = false
		}else{
			isName.value = true
		}
		break;
		case 'price':
		const pricePattern = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
		if(!pricePattern.test(good.price)){
			showError("价钱格式有误")
			isPrice.value = false
		}else{
			isPrice.value = true
		}
		break;
		case 'description':
		if(good.description.length < 12 || good.description.length > 140){
			showError("商品介绍长度有误(12-144)")
			isDescription.value = false
		}else{
			isDescription.value = true
		}
		break;
	}
}

function changeIsFocus(){
	isFocus.value = true;
}

	
function onBlur(){
	isFocus.value = false
	isVaild("description")
}

const itemList = ["图书","游戏","生活用品"]
function chooseType(){
	uni.showActionSheet({
		itemList,
		success: (res) => {
			type.value = itemList[res.tapIndex]; 
		}
	})
}

// 添加图片
function addImage() {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			if (res.tempFilePaths[0]) {
				isText.value = false;
				src.value = res.tempFilePaths[0];
				good.image = src.value;
			}
		},
		fail: (err) => {
			uni.showToast({
				title: '图片选择失败',
				icon: 'none'
			});
		}
	});
}

// 删除图片
function deleteImage() {
	uni.showModal({
		title: '提示',
		content: '确定要删除这张图片吗？',
		success: (res) => {
			if (res.confirm) {
				isText.value = true;
				src.value = "";
				good.image = "";
			}
		}
	});
}

// 提交表单
async function submitForm() {
	if(!isName || !isPrice || !isType || !isDescription){
		uni.showToast({
			title:"输入项有误,请点击每项并退出焦点查看错误原因",
			icon:"none",
			duration:3000,
		})
		return
	}
		
	if (!good.image) {
		return uni.showToast({ title: '请上传商品图片', icon: 'none' });
	}
	uni.showLoading({
		title: "正在发布中...."
	})
	good.userId=userStore.currentUser.id;
	//获得图片的服务器URL
	try{
		const res = await uploadToServer(good.image)
		good.image = res;
	}catch(err){
		console.log(err)
	}
	if(type.value == "图书"){
		good.type = GOODS_TYPE.BOOK
	}else if(type.value == "游戏"){
		good.type = GOODS_TYPE.GAME
	}else{
		good.type = GOODS_TYPE.LIFE_UTIL
	}
	uni.request({
		url: ServerURL + "/sending/goods",
		method:'POST',
		header:{
			'Content-Type': 'application/json'
		},
		data:JSON.stringify(good),
		success: (res) => {
			uni.hideLoading()
			if(res.statusCode == 200){
				uni.showModal({
				  title:"发布成功",
				  confirmText:"确认"
				})
				
				isText.value = true;
				src.value = "";
				good.image = "";
				good.name = "";
				good.price = null;
				good.type = null;
				type.value = "";
				good.description = "";
			}
		}
	})
}

// 点击图片预览
function handleImageTap() {
	uni.previewImage({
		urls: [src.value],
		current: 0
	});
}
//上传图像到服务器并获得图片访问地址
const uploadToServer = async (filePath:string) => {
	  const {statusCode,data} = await uni.uploadFile({
	      url:"http://192.168.43.78:8080/" + type.value,
	      filePath: filePath, 
	      name:'file',     
	  })
	  if (statusCode === 200) {
		let res = JSON.parse(data)
	    return res.data; 
	  }else{
		  uni.showToast({
		  	title:"图片上传失败"
		  })
		  throw new Error('上传失败');
	  }
}
onLoad(()=>{
	userStore.currentUser= uni.getStorageSync('userInfo') as User
})
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
}

.image-box {
	height: 450rpx;
	width: 100%;
	border: 2rpx dashed #ddd;
	border-radius: 16rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #f9f9f9;
	position: relative;
	overflow: hidden;
	image{
		width: 100%;
		height: 100%;
	}
	&.image-active {
		border-color: #007AFF;
		background: #f0f7ff;
	}

	.tip-text {
		color: #666;
		font-size: 28rpx;
	}

	.preview-image {
		width: 100%;
		height: 100%;
		transition: transform 0.3s;
		
		&:active {
			transform: scale(0.98);
		}
	}

	.delete-mask {
		display:flex;
		position: absolute;
		right: 0;
		top: 0;
		background: rgba(0,0,0,0.5);
		padding: 10rpx 16rpx;
		border-radius: 0 0 0 16rpx;
		width:30rpx;
		height:30rpx;
		justify-self: center;
		align-items: center;
		.icon-shanchu {
			color: #b2b2b2;
			font-size: 36rpx;
		}
	}
}

	.goods-info {
		margin-top: 40rpx;
		position: relative;
		input{
			position: absolute;
			top:12rpx;
		}
	}
	
    .submit-btn {
	margin: 60rpx 30rpx 0;
	
	button {
		border-radius: 50rpx;
		height: 88rpx;
		font-size: 32rpx;
	}
}
	description-box {
	  /* 基础样式 */
	  width: 100%;
	  min-height: 200rpx;
	  padding: 20rpx;
	  border: 2rpx solid #e5e5e5;
	  border-radius: 12rpx;
	  font-size: 28rpx;
	  line-height: 1.5;
	  color: #333;
	  box-sizing: border-box;
	  overflow-y: visible;
	}
  /* 聚焦状态 */
  description-focus {
    border-color: #007AFF;
    outline: none;
  }
</style>