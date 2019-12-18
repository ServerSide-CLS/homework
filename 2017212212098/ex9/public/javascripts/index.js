const buttonCode = $("#code");
const inputEmial = $("#inputEmail");
buttonCode.click(function () {
  const email =inputEmial.val();
  if(email===""){
    alert("请输入邮箱");
    return ;
  }else{
    const Reg =/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if(!Reg.test(email)){
      alert("邮箱格式错误");
      return
    }
  }
  $.ajax({
    type:'post',
    url:"/code",
    data:{
      "email":email
    },
    success:function (res) {
      console.log(res);
    }
  });
  buttonCode.attr("disabled",true);
  buttonCode.text("重新获取(180)");
  setTimeout("disPlay(179)", 1000);
});
function disPlay(a){
  buttonCode.text("重新获取("+a+")");
  if(a>0){
    a--;
    setTimeout("disPlay("+a+")", 1000);
  }
  else{
    buttonCode.text("获取验证码");
    buttonCode.attr("disabled",true);
  }
}

