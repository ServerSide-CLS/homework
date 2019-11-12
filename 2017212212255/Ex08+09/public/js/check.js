$(document).ready(function(){
    var code = "";
    $("#check").click(function(){
        var checkEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!checkEmail.test($("input[name='email']").val())){
            alert("邮件格式错误");   
        }
        else{
            var codeLength = 5;
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++){
                var charNum = Math.floor(Math.random() * 52);//设置随机产生
                code += codeChars[charNum];
            }
            var time = 5;
            $(this).attr("disabled", true);
            var timer = setInterval(function() {
                if (time == 0) {
                    clearInterval(timer);
                    $("#check").attr("disabled", false);
                    $("#check").html("获取验证码");
                } else {
                    $("#check").html(time + "秒");
                    time--;
                }
            }, 1000);
            console.log(code);
            //注释掉了 控制台输出密码，这里测试多了发不了了
            // $.ajax({
            //     type:'POST',
            //     dataType:'json',
            //     url:"/CheckEmail",
            //     data:{
            //         'mail':$("input[name='email']").val(),
            //         'code':code
            //     },
            //     success : function(result) {
            //         console.log(result);
            //     },error : function(e){
            //         console.log(e.status);
            //         console.log(e.responseText);
            //     }
            // })
        }
    });
    $("input[name='code']").blur(function(){
        if($(this).val()!=code){
            alert("验证码错误");
            $(this).val("");
        }
    });
    $("input[name='confirm']").blur(function(){
        if($("input[name='confirm']").val()!=$("input[name='password']").val()){
            alert("两次密码不一致");
            $("input[name='confirm']").val("");
        }
    });
});
