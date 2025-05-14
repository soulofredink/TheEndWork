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
          <text class='h2'>注册</text>
          <form @submit="submit">
            <view class="inputBx">
              <input name='username' type="text" v-model="account.username" @focus="changeOnFocus('username')" @blur="changeOnBlur(account.username,'username')" @confirm=""/>
              <text class='span' :class="{Focus:usernameIsFocus}">Username</text>
              <i class="fas fa-user-circle"></i>
            </view>

            <view class="inputBx password">
              <input id="password-input" v-model="account.password" type="text" :password="isPassword" @focus="changeOnFocus('password')" @blur="changeOnBlur(account.password,'password')" name='password' required>
              <text class='span' :class="{Focus:passwordIsFocus}">Password</text>
              <view class='password-control' :class="{view : isView}" @click="show_hide_password()"></view>
              <i class="fas fa-key"></i>
            </view>

            <view class="inputBx password">
              <input id="try-again-password" v-model="tryPassword" type="text" :password="isPasswordTwo" @focus="changeOnFocus('tryagain')" @blur="changeOnBlur(tryPassword,'tryagain')" required>
              <text class='span' :class="{Focus:tryagainIsFocus}">Try-again</text>
              <view class='password-control' :class="{view : isViewTwo}" @click="show_hide_passwordTwo()"></view>
              <i class="fas fa-key"></i>
            </view>

            <view class="inputBx email">
              <input id="try-password" v-model="account.email" type="text" name="email" @focus="changeOnFocus('email')" @blur="changeOnBlur(account.email,'email')" required>
              <text class='span' :class="{Focus:emailIsFocus}">email</text>
              <i class="fas fa-email"></i>
			  
            </view>
			
			<view class="inputBx code">
				<input class='input-code' type='text' name='code' @focus="changeOnFocus('code')" @blur="changeOnBlur(code,'code')" v-model='inputCode' />
				<text class='span' :class="{Focus:codeIsFocus}">验证码</text>
				<i class='fas fa-code'></i>
			</view>
            <view class="inputBx">
              <button class="submit" :disabled="false" hover-stay-time="350" hover-class="submitHover" form-type="submit">注册</button> 
            </view> 
          </form>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ServerURL } from '../../config';
import { ref,reactive } from 'vue';
import useShowHidden from './hooks/useShowHidden'
import useCheck from '../../hooks/useCheck'
import useDateTime from '../../hooks/useDateTime'
  //校验数据
  let {account,tryPassword,code,inputCode,isVaildUsername,isVaildPassword,isVaildEmail,isVaildCode } = useCheck();
  //日期相关
  
  let {formattedDate} = useDateTime();
  //显示隐藏代码
  let {isPassword,isView,isPasswordTwo,isViewTwo,show_hide_password,show_hide_passwordTwo} = useShowHidden()
  
  //处理聚焦失去焦点事件
  let usernameIsFocus = ref(false)
  let passwordIsFocus = ref(false)
  let tryagainIsFocus = ref(false)
  let emailIsFocus = ref(false)
  let codeIsFocus = ref(false)
  //当input获得焦点
  function changeOnFocus(type:string){
  	  switch(type){
  		  case 'username':
  		  usernameIsFocus.value = true;
  		  break;
  		  case 'password':
  		  passwordIsFocus.value = true;
  		  break;
  		  case 'tryagain':
  		  tryagainIsFocus.value = true;
  		  break;
  		  case 'email':
  		  emailIsFocus.value = true;
  		  break;
  		  case 'code':
  		  codeIsFocus.value = true;
  	  }
  	  
  }
  //当input失去焦点
  function changeOnBlur(_object:string,type:string){
	 switch(type){
  	 	case 'username':{
			let title = ''
			if((title = isVaildUsername(_object)) != 'success'){
				if(_object == '') {
					usernameIsFocus.value = false
				}else{
					uni.showToast({
						title,
						icon: 'none',
						duration: 2000
				    });
				}
			}
		}
		break
  		case 'password':{
			let title = ''
			if((title = isVaildPassword(_object,tryPassword.value)) != 'success'){
				if(_object == '') {
					passwordIsFocus.value = false
				}else{
					uni.showToast({
						title,
						icon: 'none',
						duration: 2000
					});
				}
			}	
		}
		break
  		case 'tryagain':{
			let title = ''
			if((title = isVaildPassword(_object,account.password)) != 'success'){
				if(_object == '') {
					tryagainIsFocus.value = false
				}else{
					uni.showToast({
						title,
						icon: 'none',
						duration: 2000
					});
				}
			}
		}
		break;
  		case 'email':{
			let title = ''
			if((title = isVaildEmail(_object)) != 'success'){
				if(_object == '') {
					emailIsFocus.value = false
				}else{
					uni.showToast({
						title,
						icon: 'none',
						duration: 2000
					});
				}
			}else{
				uni.showModal({
				  title: '发送邮箱验证码',
				  content: '确定要发送吗?(检查是否为正确邮箱)',
				  confirmText: '发送',
				  cancelText: '取消',
				  success: (res) => {
				    if (res.confirm) {
				      uni.request({
				      	url:ServerURL+"/sendEmail/"+account.email,
						method:'GET',
						success: (response)=>{
							if(response.statusCode == 200){
								let val = response.data as {code:number,message:string,data:string}
								code.value = val.data
								setInterval(()=>{code.value = 'outtime'},1000*60*3)
							}else{
								uni.showToast({
									title:"邮箱错误",
									icon:'none',
									duration:2000,
								})
							}
						},
						fail:(err)=>{
							uni.showToast({
								title:err.errMsg,
								icon:'none',
								duration:2000,
							})
						}
				      })
				    }else if (res.cancel) {
				      
				    }
				  }
				});
			}
		}
		break;
  		case 'code':
  		if(_object == '') codeIsFocus.value = false;
  		break;
  	 }
  }
	  
  function isOk(goal:string){
	  return goal == "success"
  }
  function submit(){
	  if(isOk(isVaildUsername(account.username)) && isOk(isVaildPassword(account.password,tryPassword.value)) && isOk(isVaildEmail(account.email)) && isOk(isVaildCode(code.value,inputCode.value))){
		  //成功
		  account.createDateTime = new Date(formattedDate());
		  uni.request({
			  url: "http://192.168.43.78:8080/signup",
			  method:'POST',
			  data: JSON.stringify(account),
			  success: (Response)=>{
				  if(Response.statusCode == 409){
					  uni.showToast({
					  	title:"用户名已经存在",
						icon:"none",
						duration:2000,
					  })
				  }else{
					uni.showModal({
					  title:"注册成功",
					  content:'现在要登录吗?',
					  confirmText:"登录",
					  cancelText:"取消",
					  success: (res) => {
						if(res.confirm){
							uni.redirectTo({
								url:"/pages/SignIn/SignIn"
							})
						}
					  },
					})  
				  }
			  },
			  fail:(err)=>{
				  uni.showToast({
				        title: err.errMsg,
				        icon: 'none'
				      });
			  }
		  })
		  
	  }else{
		  let title = ''
		  if((title = isVaildCode(code.value,inputCode.value)) !== 'success'){
			  uni.showToast({
			  	title,
				icon:'none',
				duration:2000,
			  })
		  }else{
			  uni.showToast({
			  	title:"验证码无误,请检查其他输入项",
			  	icon:'none',
			  	duration:2000,
			  })
		  }
	  }
	  
  }

</script>

<style scoped lang="scss">
//引入字体
  page {
    margin: 0;
    padding: 0;
    font-family: "El Messiri" , sans-serif;
	color: #031323;
	overflow: hidden;
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
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1); //水平偏移 垂直偏移 模糊半径 颜色
      border-radius: 10px;
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
      width: 100px;
      height: 100px;
      top: -15px;
      right: -45px;
    }
    .square:nth-child(2){
      width: 150px;
      height: 150px;
      top: 105px;
      left: -125px;
      z-index: 2;
    }
    .square:nth-child(3){
      width: 60px;
      height: 60px;
      bottom: 85px;
      right: -45px;
      z-index: 2;
    }
    .square:nth-child(4){
      width: 50px;
      height: 50px;
      bottom: 35px;
      left: -95px;
    }
    .square:nth-child(5){
      width: 50px;
      height: 50px;
      top: -15px;
      left: -25px;
    }
    .square:nth-child(6){
      width: 85px;
      height: 85px;
      top: 165px;
      right: -155px;
      z-index: 2;
    }
  }

  .container {
    position: relative;
    padding: 50px;
    width: 260px;
    min-height: 380px;
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
    width: 100%;
    height: 100%;
    
    .h2 {
      display: flex;
      color:#fff;
      letter-spacing: 2px;
      margin-bottom: 30px;
      justify-content: center;
      font-size: 20px;
      transform: translateY(-30%);
    }
	
    .inputBx {
      display:flex;
      justify-content: center;
      position: relative;
      width: 100%;
      margin-bottom: 20px;
		
	  input {
		  transform: translateY(-20%);
	  }	
      input,.submit {
        width: 80%;
        outline: none;
        border: none;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.2);
        padding: 8px 10px;
        padding-left: 40px;
        border-radius: 15px;
        color: #fff;
        font-size: 16px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .password-control {
        position: absolute;
        top: 4px;
        right: 10px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(@/static/img/view.svg) 0 0 no-repeat;
        transition: 0.5s;
        z-index: 3;
      }

      .view {
        background: url(@/static/img/no-view.svg) 0 0 no-repeat;
        transition: 0.5s;
      }
      //<i>定位
      .fas {
        position: absolute;
        top: 6px;
        left: 13px;
        z-index: 1;
      }

      .submit {
        background: #fff;
        color: #111;
        padding: 3px 4px;
        box-shadow: none;
        letter-spacing: 1px;
        cursor: pointer;
        transition: 1.5s;
        margin: 0;
        width:100%;
      	font-size: 15px;
		transform: translateY(20%);
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
        left: 30px;
        padding: 10px;
        display: inline-block;
        color: #fff;
        transition: .5s;
        pointer-events: none;
		bottom: 7px;
      }

    }
  }
  .remember {
    position: relative;
    display: inline-block;
    color: #fff;
    margin-bottom: 10px;
    cursor: pointer;
  }

  input[type="password"]::-ms-reveal {
    display: none;
  }

  .fa-user-circle {

    &:before{
      content: none !important;
    }

    display: inline-block;
    width: 16px;
    height: 16px;
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
    width: 16px;
    height: 16px;
    background-image: url(@/static/img/icons8-钥匙-30.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .fa-email {
    &:before{
      content: none !important;
    }

    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(@/static/img/icons8-邮箱-30.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .Focus {
  	transform: translateX(-35px) translateY(-30px);
  	font-size: 12px;
  }
  
  .fa-code {
    &:before{
      content: none !important;
    }
  
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(@/static/img/icons8-验证的帐户-24.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
</style>
