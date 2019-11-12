var start;
var id;
$(function(){

    $("#varify").click(function(e){
        e.preventDefault();
        var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
　　     if(checkEmail.test($("#email").val())){
            sendMail($("#email").val())
            disable();
        }else{
            alert("邮箱格式错误！");
        }
    })
    
    $("#submit").click(function(e){
        e.preventDefault();
        sendInfo();
    })
})

function sendMail(addr){
      $.ajax({  
        type : "post",  
         url : "/sendMail",  
         data : "addr="+addr,  
         async : false,  
         success : function(data){  
            console.log(data);
         }  
    }); 
}

function sendInfo(addr){
    $.ajax({  
      type : "post",  
       url : "/varify",  
       data : "email="+$("#email").val()+"&pwd1="+$("#pwd1").val()+"&pwd2="+$("#pwd2").val()+"&code="+$("#code").val(),  
       async : false,  
       success : function(data){  
          console.log(data);
          if(data=="200"){
            alert("注册成功");
            $("#email").val("");
            $("#pwd1").val("");
            $("#pwd2").val("");
            $("#code").val("");
            able();
         }
        else if(data=="301")
            alert("两次密码不一致");
        else if(data=="302")
            alert("邮箱格式错误");
        else if(data=="303")
            alert("验证码错误");
        else if(data=="500")
            alert("文件读写错误");
    },
       error:function(xhr){
        alert("错误提示： " + xhr.status + " " + xhr.statusText);
    }
  }); 
}

function disable(){
    $("#varify").attr("disabled", "disabled");
    $("#varify").addClass("btn-secondary");
    $("#varify").removeClass("btn-info");
    start = Date.now();

    id = setInterval(() => {
        t = 180-parseInt((Date.now()-start)/1000);
        m = parseInt(t/60);
        s = parseInt(t%60);
        $("#varify").text(m+"分"+s+"秒后再试");
        if(t>=180){
           able();
        }
    }, 1000);
}

function able(){
    clearInterval(id);
    $("#varify").removeClass("btn-secondary");
    $("#varify").addClass("btn-info");
    $("#varify").attr("disabled", "");
    $("#varify").text("点击验证邮箱");
}