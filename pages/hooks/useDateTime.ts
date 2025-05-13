
	
export default function(){
	function formattedDate(){
	  const date = new Date();
	  const year = date.getFullYear();  
	  const month = (date.getMonth() + 1).toString().padStart(2, '0');  
	  const day = date.getDate().toString().padStart(2, '0'); 
	  const hour = date.getHours().toString().padStart(2, '0');
	  const minute = date.getMinutes().toString().padStart(2, '0');
	  const second = date.getSeconds().toString().padStart(2, '0');
	  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	  return formattedDate;
	}
	
	return {formattedDate}
}