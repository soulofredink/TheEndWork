export interface User{
	  id?:string
	  username:string
	  name?:string
	  password:string
	  email:string
	  img?:string//头像
	  tel?:string
	  sex?:'男'|'女'|'unknown'
	  address?:string
	  createDateTime:Date
	  lastLogin?:Date
}
