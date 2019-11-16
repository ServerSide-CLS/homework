var time = 180;
function subs(){
	time--;
	$('#send').attr("value","请"+time+"秒后再试");
	if(time===0){
		clearInterval(mytime);
		time = 180;
		$('#send').attr("value","获取验证码");
                $('#send').attr("disabled",false);
        } 
        else{
                $('#send').attr("disabled",true);
        }
}
$('#send').click(function(){
        subs();
        var mytime = setInterval(function(){subs();},1000);
        var email = $('#email').val();
	$.post("/sendEmail",{email:email});
});

