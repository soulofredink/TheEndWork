import{ ref,reactive} from 'vue'
import { User } from '../../static/interface/User';
export default function(){
	let account : User = reactive({
	  username: '',
	  password: '',
	  email: '',
	  createDateTime:'',
	})
	let tryPassword = ref('');
	let code = ref('')
	let inputCode = ref("")
	function isVaildUsername(username:string){
		if(username.length<4 || username.length > 20){
			return "用户名长度非法(4-20)!"
		}
		return "success"
	}
	
	function isVaildPassword(password:string,tryagainPassword:string){
		if(password.length < 8 || password.length > 20){
			return "密码长度非法(8-20)! "
		}
		let Up = 0;let Low = 0;let sign = 0;let num = 0;
		for(let x of password){
			if(x >= 'a' && x <= 'z') {
				Low++
			}else if(x >= 'A' && x <= 'Z') {
				Up++
			}else if(x >= '0' && x <= '9'){
				num++
			}else{
				sign++
			}
		}
		let ok =  Up >= 1 && Low >= 1 && sign >= 1 && num >= 1;
		
		if(!ok){
			return "密码中下面各项至少包含一个(大写字母,小写字母,数字,字符)! "
		}
		if(password != '' && tryagainPassword != '' && password !== tryagainPassword) {
			return '密码两次输入不同'
		}
		return "success";
	}
	function isVaildEmail(email:string){
		  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  if(!pattern.test(email)) return "邮箱格式非法"
		  return "success";
	}
	
	function isVaildCode(code:string,inputCode:string){
		if(code == 'outtime') return "验证码过期"
		if(inputCode.length !== 6 || inputCode !== code) return "验证码错误"
		return "success"
	}
	
	return {account,tryPassword,code,inputCode,isVaildUsername,isVaildPassword,isVaildEmail,isVaildCode}
}