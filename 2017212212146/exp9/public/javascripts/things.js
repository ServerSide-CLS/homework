var start;
var id;
$(function(){
    var waitTime = 30;
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

    //判断邮箱是否已存在
    $("#email").blur(function(){
        let email = $("#email").val();
        $.post("/checkEmail",
        {
            "email":email
        },
        function(result){
            //若邮箱存在
            if(result == "exist"){
                alert('email exists');
            }
        });
    });
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
          console.log(data.reason);
          if(data=="200"){
            alert("注册成功");
            able();
         }
        else alert("错误"+data.reason);
    },
       error:function(xhr){
        alert("错误"+xhr.reason);
    }
  });
}

function disable(){//设置按钮冷却时间
    $("#varify").attr("disabled", "disabled");
    $("#varify").addClass("btn-secondary");
    $("#varify").removeClass("btn-info");
    start = Date.now();

    id = setInterval(() => {
        t = 30-parseInt((Date.now()-start)/1000);
        s = parseInt(t%60);
        $("#varify").text(s+"秒后再试");
        if(t<=0){
           able();
        }
    }, 1000);
}

function able(){
    clearInterval(id);
    $("#varify").removeClass("btn-secondary");
    $("#varify").addClass("btn-info");
    $("#varify").attr("disabled", false);
    $("#varify").text("点击验证邮箱");
}