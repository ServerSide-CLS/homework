function countdown(){
    var time  = 180;  //定义3分钟（180s）的倒计时
    var email = $('#email').val();//获取输入框的邮箱
    var user_name = $('#userName').val();//获取输入的账户名

    console.log(email)
    if(email=='') {
        return alert('请输入Email');
    }

    //email格式验证
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(reg.test(email)){
		console.log("邮箱格式正确");
	}else{
		return alert("邮箱格式不正确");
	}

    //ajax将用户名和邮箱发到后台
    $.get('/api/email',{
        email: email,
        //user_name: user_name
    },
    function (data) {
        console.log(data);
    })

    //设置一个定时器，一秒执行一次
    var mytimer = setInterval(function() {
        subs();
    },1000)

    function subs() {
        time--;
        $('#emailsend').attr("value","请"+time+"秒后再试");
        if(time===0) {
            console.log('stop')
            clearInterval(mytimer);  //停止执行定时器
            $('#emailsend').attr("value","发送验证码");
            $('#emailsend').attr('disabled', false); //移出disabled属性，按键可用

        }
        else {
            $('#emailsend').attr('disabled',true); //增加disabled属性，按键不可用
        }
    }
};
