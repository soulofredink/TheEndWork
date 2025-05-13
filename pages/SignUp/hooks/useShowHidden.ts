 import{ ref } from 'vue'
 
 
 export default function(){
	let isPassword = ref(true);
	let isView = ref(false)
	function show_hide_password() {
		isPassword.value = !isPassword.value;
	  	isView.value = !isView.value;
	}
	let isPasswordTwo = ref(true);
	let isViewTwo = ref(false)
	function show_hide_passwordTwo() {
	    isPasswordTwo.value = !isPasswordTwo.value;
	  	isViewTwo.value = !isViewTwo.value;
	}
	
	return {isPassword,isView,isPasswordTwo,isViewTwo,show_hide_password,show_hide_passwordTwo}
 }
 