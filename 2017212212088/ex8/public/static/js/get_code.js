var flag = 1;
$(document).ready(function () {
    $("#btnClk").click(function(){
    	if(flag == 1){
    		flag = 0;
	        let email = $("#email").val();
	        $.post("/Code_",
	        {
	            "email":email
	        });
	        $("#btnClk").text("已发送");

			var time_ = 180;
		    function  myfunc(Interval){
		        if(time_ == 180){
		        	$("#message").show();
		        }
		        $("#nums").text(String(time_));
		        time_--;
		        if(time_ == -2){
		        	$("#message").hide();
		        	$("#nums").text("180");
		        	$("#btnClk").text("获取验证邮箱有效性");
		        	time_ = 180;
		        	flag = 1;
		        }
		    }
		    var myInterval=setInterval(myfunc,1000,"Interval");
		    function  stopInterval(){
		        clearTimeout(myInterval);
		    }
		    setTimeout(stopInterval,182000);
		}
    });
});