// function sendEmail(){
// 		var time = 180;
// 		var email = $("#email").val();
// 		$.get('/email',{email:email})
// 		var wait = setInterval(()=>{
// 			waitTime();
// 		},1000)
// 		function waitTime(){
// 			if(time == 0){
// 				clearInterval(wait);
// 				$('#send').html("獲取郵箱驗證有效性");
// 				$('#send').attr("disable",false);
// 			}else{
// 				$('#send').html(time +"秒後重新發送");
// 				$('#send').attr("disable",true);
// 				time--;
// 			}
// 		}
// 	}
