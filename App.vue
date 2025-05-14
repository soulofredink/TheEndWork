<script>
	//import websocketUtil from './script/webSocket'
	export default {
		onLaunch: function(){
		// 	//全局初始化 WebSocket
		// 	let websocket = new WebSocket('wss://192.168.43.78:8443/websocket/1',5000)
		
		// 	websocket.getMessage(res=>{
		// 		const message: ChatMessage = JSON.parse(res.data)
		// 		store.commit('ADD_MESSAGE', message) // 提交到 Vuex
		// 		  // const newmsg={
		// 			 //  id: Date.now(),
		// 			 //  content:res.message,
		// 			 //  time:res.send_time,
		// 			 //  isMe:false
		// 		  // }
		// 		  // //messages.push(newmsg)
		// 	  	console.log(res);
		// 	  })
		},
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>W
