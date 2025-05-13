<template>
  <view class='outer'>
    <view class="box">
      <view class="square" style="--i:0;"></view>
      <view class="square" style="--i:1;"></view>
      <view class="square" style="--i:2;"></view>
      <view class="square" style="--i:3;"></view>
      <view class="square" style="--i:4;"></view>
      <view class="square" style="--i:5;"></view>

      <view class="container">
        <view class="form">
          <text class='h2'>登录</text>
          <form @submit="submit">
            <view class="inputBx" hover-start-time="0">
              <input type="text" @focus="changeOnUsernameFocus" @blur="changeOnUsernameBulr" v-model="username"/>
              <text class="span" :class="{Focus:usernameIsFocus}">username</text>
              <i class="fas fa-user-circle"></i>
            </view>
			
            <view class="inputBx password">
              <input id="password-input" type="text" :password="isPassword" @focus="changeOnPasswordFocus" @blur="changeOnPasswordBlur" v-model="password">
              <text class="span" :class="{Focus:passwordIsFocus}">password</text>
              <view class='password-control' :class="{view : isView}" @click="show_hide_password()"></view>
              <i class="fas fa-key"></i>
            </view>

            <label class="remember">
				<view>
					<checkbox :checked="isRemeber" @click="changeRemeber" value='记住'/>
				</view>
				<view>
					记住
				</view>
			</label>
            <view class="inputBx">
              <button class="submit" :disabled="false" hover-stay-time="350" hover-class="submitHover" form-type="submit">登录</button> 
            </view> 
          </form>
		  <view class='forgetAndCommit'>
			  <navigator url='/pages/forgetPassword/forgetPassword' hover-class="navigatorHover" hover-stay-time="300" hover-start-time="0">忘记密码?</navigator>
			  <navigator url='/pages/SignUp/SignUp' hover-class="navigatorHover" hover-stay-time="300" hover-start-time="0">注册账号?</navigator>
		  </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import{ nextTick, ref,watch } from 'vue'
  import useCheck from '../hooks/useCheck'
  import { useUserStore } from '../../store/useUserStore';
  import { User } from '../../static/interface/User';
  //user
  let{isVaildUsername} = useCheck()
  let isPassword = ref(true);
  let isView = ref(false)
  //是否记住
  let isRemeber = ref(false);
  
  function changeRemeber(){
	  isRemeber.value = !isRemeber.value
  }
  watch(isRemeber,(New)=>{
	  console.log(New);
  })
  //仓库
  let userStore = useUserStore()
  
  //是否隐藏按钮
  function show_hide_password() {
    isPassword.value = !isPassword.value;
	isView.value = !isView.value;
  }
  
  let username = ref('');
  let password = ref('')
  let passwordIsFocus = ref(false);
  let usernameIsFocus = ref(false);
	  
  function changeOnPasswordFocus(){
	  passwordIsFocus.value = true;
  }
  
  function changeOnPasswordBlur(){
	  if(password.value == '') {
	  	passwordIsFocus.value = false
	  }
  }
  
  function changeOnUsernameFocus(){
	  usernameIsFocus.value = true;
  }
  
  function changeOnUsernameBulr(){
	  if(username.value == '') {
	  	usernameIsFocus.value = false
	  }
	}
  
  const submit = async () => {
    try {
      const success = await userStore.Login({
        username: username.value,
        password: password.value
      })
      
      if (success) {
		if(isRemeber.value){
			uni.setStorageSync('token',true)
			uni.setStorageSync('userInfo',userStore.currentUser)
		}
        await nextTick()
        uni.switchTab({ url: "/pages/MyInfo/MyInfo"})
      }
    } catch (err) {
      uni.showToast({ title: '登录失败', icon: 'none' })
    }
  }
</script>

<style scoped lang="scss">
//引入字体
  page {
    color: #031323;
    overflow: hidden;
	margin: 0;
	padding: 0;
	font-family: "El Messiri" , sans-serif;
  }

  .outer {
    display : flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(-45deg,#ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
  }
  //section 关键帧动画
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  .box {
    position: relative;
    .square {
      position:absolute;
      background:rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10rpx);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 50rpx 90rpx rgba(0, 0, 0, 0.1); //水平偏移 垂直偏移 模糊半径 颜色
      border-radius: 20rpx;
      animation: square 10s linear infinite;
      animation-delay: calc(-1s * var(--i));
    }
    //square 关键帧动画
    @keyframes square {
      0%,
      100% {
        transform: translateY(-20px);
      }
      50% {
        transform: translateY(20px);
      }
    }
    .square:nth-child(1){
      width: 200rpx;
      height: 200rpx;
      top: -30rpx;
      right: -90rpx;
    }
    .square:nth-child(2){
      width: 300rpx;
      height: 300rpx;
      top: 210rpx;
      left: -250rpx;
      z-index: 2;
    }
    .square:nth-child(3){
      width: 120rpx;
      height: 120rpx;
      bottom: 90rpx;
      right: -90rpx;
      z-index: 2;
    }
    .square:nth-child(4){
      width: 100rpx;
      height: 100rpx;
      bottom: 70rpx;
      left: -190rpx;
    }
    .square:nth-child(5){
      width: 100rpx;
      height: 100rpx;
      top: -30rpx;
      left: -50rpx;
    }
    .square:nth-child(6){
      width: 170rpx;
      height: 170rpx;
      top: 330rpx;
      right: -310px;
      z-index: 2;
    }
  }

  .container {
    position: relative;
    padding: 100rpx;
    width: 520rpx;
    min-height: 760rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  }

  .container::after {
    content: "";
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    border-radius: 5px;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 2%
    );
  }

  .form {
    position:relative;
    width: 435rpx;
    height: 568rpx;
    .h2 {
	  display: flex;
      color:#fff;
      letter-spacing: 4rpx;
      margin-bottom: 60rpx;
      justify-content: center;
	  font-size: 40rpx;
	  transform: translateY(-50%);
    }

    .inputBx {
      display:flex;
      justify-content: center;
      position: relative;
      width: 100%;
      margin-bottom: 20px;

      input,.submit {
        width: 80%;
        outline: none;
        border: none;
        border: 2rpx solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.2);
        padding: 16rpx 20rpx;
        padding-left: 80rpx;
        border-radius: 30rpx;
        color: #fff;
        font-size: 32rpx;
        box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
      }

      .password-control {
        position: absolute;
        top: 22rpx;
        right: 20rpx;
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        background: url(@/static/img/view.svg) 0 0 no-repeat;
        transition: 0.5s;
        z-index: 3;
      }

      .view {
        background: url(@/static/img/no-view.svg) 0 0 no-repeat;
        transition: 0.5s;
      }
      
      .fas {
        position: absolute;
        top: 26rpx;
        left: 26rpx;
        z-index: 1;
      }

      .submit {
        background: #fff;
        color: #111;
        padding: 6rpx 8rpx;
        box-shadow: none;
        letter-spacing: 2rpx;
        cursor: pointer;
        transition: 1.5s;
        margin: 0;
        width:100%;
		font-size: 30rpx;
      }

      .submitHover {
        background: linear-gradient(115deg, 
          rgba(0,0,0,0.10), 
          rgba(255,255,255,0.25));
        color: #fff;
        transition: .5s;
      }

      input::placeholder {
        color: #fff;
      }

      .span {
        position: absolute;
        left: 60rpx;
        padding: 20rpx;
        display: inline-block;
        color: #fff;
        transition: .5s;
        pointer-events: none;
		bottom: 1rpx;
      }
    }
	.forgetAndCommit{
		display:flex;
		flex-direction: row;
		position: relative;

		  navigator {
			position: absolute;
			color: #fff;
			font-size: 30rpx;
			margin-top: 10rpx;
		    color: #fff;
		  }
		
		  .navigatorHover {
		    background-color: #000;
		    background-image: linear-gradient(to right, #434343 0%, black 100%);
		    background-clip: text;
		    -webkit-background-clip: text;
		    -webkit-text-fill-color: transparent;
		  }
		
		navigator:nth-child(1){
			left:5%;
		}
		
		navigator:nth-child(2){
			right:0%;
		}
	}
  }
  .remember {
    position: relative;
    display: flex;
    color: #fff;
    margin-bottom: 20rpx;
    cursor: pointer;
	justify-content: flex-start;
  }
  .remember checkbox{
	  transform: scale(0.8);
  }
  
  #password-input::-ms-reveal {
    display: none;
  }

  .fa-user-circle {

    &:before{
      content: none !important;
    }

    display: inline-block;
    width: 32rpx;
    height: 32rpx;
    background-image: url(@/static/img/icons8-圈-男用户-30.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .fas {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    
  }

  .fa-key {
    &:before{
      content: none !important;
    }

    display: inline-block;
    width: 32rpx;
    height: 32rpx;
    background-image: url(@/static/img/icons8-钥匙-30.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
	
	.Focus {
		transform: translateX(-60rpx) translateY(-50rpx);
		font-size: 24rpx;
	}
</style>