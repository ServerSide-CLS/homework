// //倒计时函数
// function abc(){
//     if(btn.value == '获取验证码'){
//         btn.value = 60;
//         function VC(){
//             if(btn.value == 0){
//                 btn.value = '获取验证码';
//                 clearInterval(a)//清除定时器
//             }
//             else{
//                 btn.value--;
//             }   
//         }
//         var a = setInterval(VC,1000);
//     }
//     document.cookie = btn.value;
// }

function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name){
        return arr[1];
      }
    }
    return "";
}

function ajax(){
    $.ajax({
        url:"/mail",
        type:"GET",
        dataType:'JSON',
        data:{
            e_mail:e_mail.value,
        },
        error:function(err){
            alert('连接失败');
        }
    })
}
