var sendEmail=()=>{
    var time=180;
    var email=$("#email").val();

    //使用ajax访问/sendEmail路由
    $.get('/sendEmail',{ email:email})

    var sub=()=>{
        if(time>0)
            $("#emailBtn").attr("value","请在"+(time--)+"秒后再试").attr("disabled",true)
        else{ 
            clearInterval(countTime)
            $("#emailBtn").attr("value","验证邮箱有效性").attr("disabled",false)     
        }
    }

    var countTime=setInterval(sub,1000);

}


