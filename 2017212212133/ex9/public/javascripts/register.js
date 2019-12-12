var countActivity;
var originAddr="";

$(function(){
  $("#sendCode").click(function(e){
    $.ajax({  
        type: "post",  
        url: "/sendCode",
        data: {"addr":$("#email").val()},
        async: false,  
        success: function(data){  
          originAddr = $("#email").val();
          countdown();
        }  
    }); 
  })

  $("#register").click(function(e){
    console.log("click");
    sendInfo();
  });

  $("#login").click(function(){
    $.ajax({
      type:"post",
      url: "/verifyLogin",
        data: {"email":$("#email-login").val(), "password":$("#password-login").val()},
        async: true,  
        success: function(data){
          if(data == 200){
            alert("登录成功");
            window.location.href="http://localhost:3000/welcome";
          }else if(data == 405){
            alert("账号密码错误");
          }else if(data == 408){
            console.log("邮箱不存在");
          }
        }  
    })
  });
})


function sendInfo(addr){
  console.log("sendInfo");
  if($("#email").val()!="" && $("#code").val()!="" && $("#password").val()!="" && $("#repeatPassword").val()!=""){
    var reg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/;
    if(reg.test($("#email").val())){
      $.ajax({
        method : "post",  
        url : "/register",
        async : true,
        data : {"email":$("#email").val(),"code":$("#code").val(),"password":$("#password").val(),"repeatPassword":$("#repeatPassword").val(),"originAddr":originAddr},
        success : function(data){ 
  console.log("?????????????????????????"); 
          console.log(data);
          if(data=="200"){
            alert("注册成功");
            window.location.href="http://localhost:3000/login";
            $("input").val("");
            $("#sendCode").text("发送验证码");
          }
          else if(data=="401"){
            alert("两次密码输入不一致");
          }
          else if(data=="402"){
            alert("验证码错误");
          }
          else if(data=="405"){
            alert("数据库查询出错");
          }
          else if(data=="406"){
            alert("数据库写入错误");
          }
          else if(data=="407"){
            alert("邮箱已存在");
          }
          else {
            alert("服务器出错");
          }
        },
        error:function(xhr){
          console.log("+++++错误提示： " + err);
          alert("+++++错误提示： " + err.status +";"+err.statusText);
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
  var sec = 10;
  countActivity = setInterval(() => {
    sec = sec - 1;
    $("#sendCode").text(sec+"秒后再试");
    if(sec <= 0){
      clearInterval(countActivity);
      $("#sendCode").removeAttr("disabled");
      $("#sendCode").text("发送验证码");
    }
  }, 1000);
}
