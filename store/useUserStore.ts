import { defineStore } from 'pinia'
import { User } from '../static/interface/User'
import { ServerURL } from '../config';
export const useUserStore=defineStore('user',{
	state:()=>({
		currentUser:null as User | null,//创建一个对象实例
		defaultImg:'/static/OIP-C.jpg',
		//用户状态元数据
		meta:{
			isLoggedin:false,
			tokenExpiresAt:0//token过期时间戳
		}
	}),
	
	getters:{
		isLogin(state){
			return state.meta.isLoggedin;
		}
	},
	
	actions:{
		async Login(card:{username:string,password:string}){
			const res =  await uni.request({
			    url:ServerURL+"/signin",
				method:'POST',
				header:{
					'Content-Type': 'application/json'
				},
				data:JSON.stringify(card),
				sslVerify: false,
			})
			console.log(res)
			const resVal = res.data as {code:number,message:string,data:any};
			if(resVal.code == 200){
				console.log('0k')
				this.meta.isLoggedin = true
				this.currentUser = resVal.data
				return true
			}
			return false;
		}
		
	},
})