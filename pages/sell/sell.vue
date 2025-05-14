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
			<uni-forms :modelValue="good" :rules="rules">
				<uni-forms-item label="名称" name="name">
					<input type="text" v-model="good.name" placeholder="请输入商品名称" />
				</uni-forms-item>
				<uni-forms-item label="价格" name="price">
					<input type="text" v-model="good.price" placeholder="请输入价格" />
				</uni-forms-item>
				<uni-forms-item required name="type" label="类型">
					<input  v-model="good.type" placeholder="商品类型" @tap="chooseType" readonly/>
				</uni-forms-item>
				<uni-forms-item required name="description" label="描述" >
					<textarea 
					      v-model="good.description"
					      placeholder="请输入商品描述（255字以内）"
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
					      {{ good.description.length }}/250
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
import { computed, reactive, ref,watch } from 'vue';
import { useUserStore } from '../../store/useUserStore';


const userStore = useUserStore();
const isText = ref(true);
const src = ref("");
const formRef = ref();
let isFocus = ref(false)

	
function changeIsFocus(){
	isFocus.value = true;
}

	
function onBlur(){
	isFocus.value = false;
}
const good = reactive({
  userId: computed(() => userStore.currentUser?.id || ""),
  name: "", 
  price: null,
  description: "",
  image: "",
  type:"",
})

watch(good,(New)=>{
	console.log(New)
},{deep:true})
const itemList = ["图书","游戏","生活用品"]
function chooseType(){
	uni.showActionSheet({
		itemList,
		success: (res) => {
			good.type = itemList[res.tapIndex]; 
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
	try {
		await formRef.value.validate();
		
		if (!good.image) {
			return uni.showToast({ title: '请上传商品图片', icon: 'none' });
		}

		// TODO: 调用提交接口
		
		uni.showLoading({ title: '提交中...' });
		
		// 模拟接口调用
		setTimeout(() => {
			uni.hideLoading();
			uni.showToast({ title: '发布成功' });
			setTimeout(() => uni.navigateBack(), 1500);
		}, 1000);

	} catch (err) {
		uni.showToast({
			title: '请填写完整信息',
			icon: 'none'
		});
	}
}

// 点击图片预览
function handleImageTap() {
	uni.previewImage({
		urls: [src.value],
		current: 0
	});
}
const uploadToServer = async (filePath:string) => {
	  const {statusCode,data} = await uni.uploadFile({
	      url:"http://192.168.43.78:8080/"+good.type,
	      filePath: filePath, 
	      name:'file',     
	  })
	  if (statusCode === 200) {
		console.log("1111")
	    return data; 
	  }
	  throw new Error('上传失败');
}
let rules: {
	// 对name字段进行必填验证
	name: {
		// name 字段的校验规则
		rules:[
			// 校验 name 不能为空
			{
				required: true,
				errorMessage: '请填写名称',
			},
			// 对name字段进行长度验证
			{
				minLength: 1,
				maxLength: 20,
				errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
			}
		],
		// 当前表单域的字段中文名，可不填写
		label:'姓名',
		validateTrigger:'submit'
	},
	price: {
		rules:[
			{
				required: true,
				errorMessage: '请填写价格',
			},
		],
		label:'价格',
		validateTrigger:'submit'
	},
	type: {
		rules:[
			{
				required: true,
				errorMessage: '请选择类型',
			},
		],
		label:'类型',
		validateTrigger:'submit'
	},
	description: {
		rules:[
			{
				required: true,
				errorMessage: '请填写你的商品介绍',
			},
			{
				minLength: 12,
				maxLength: 140,
				errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
			}
		],
		
		label:'描述',
		validateTrigger:'submit'
	}
}
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