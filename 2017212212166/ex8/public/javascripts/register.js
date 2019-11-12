var Intervalflag;
var Addr;

$(function(){
  $("#sendCode").click(function(e){
    $.ajax({  
        type: "post",  
        url: "/sendCode",
        data: {"addr":$("#email").val()},
        async: false,  
        success: function(data){  
          Addr = $("#email").val();
          countdown();
        }  
    }); 
  })

  $("#register").click(function(){
    sendInfo();
  })
})


function sendInfo(addr){
  if($("#email").val()!="" && $("#code").val()!="" && $("#password").val()!="" && $("#repeatPassword").val()!=""){
    var reg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
    if(reg.test($("#email").val())){
      $.ajax({
        type : "post",  
        url : "/register",  
        data : {"email":$("#email").val(),"code":$("#code").val(),"password":$("#password").val(),"repeatPassword":$("#repeatPassword").val(),"originAddr":Addr},
        async : false,  
        success : function(data){  
          console.log(data);
          if(data=="200"){
            alert("注册成功");
            $("input").val("");
            $("#sendCode").text("发送验证码");
          }
          else if(data=="401"){
            alert("两次密码输入不一致");
          }
          else if(data=="402"){
            alert("验证码错误");
          }
          else if(data=="403"){
            alert("数据写入错误");
          }
        },
          error:function(xhr){
          alert("错误提示： " + xhr.status + " " + xhr.statusText);
        }
      }); 
    }else{
      alert("邮箱格式错误");
    }
  }else{
    alert("您有信息未填写");
  }
}

function countdown(){
  $("#sendCode").attr("disabled", "disabled");
  var sec = 180;
  Intervalflag = setInterval(() => {
    sec = sec - 1;
    $("#sendCode").text(sec+"秒后再试");
    if(sec <= 0){
      clearInterval(Intervalflag);
      $("#sendCode").removeAttr("disabled");
      $("#sendCode").text("发送验证码");
    }
  }, 1000);
}