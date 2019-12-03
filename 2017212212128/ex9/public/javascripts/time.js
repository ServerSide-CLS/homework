$(function(){
    $("#checkbt").click(function(){
        if($("#email").val())
        abc("#checkbt","#email",180);
    })
    
})
function abc(btnObjId,email,time) {
    //设置一个定时，一秒执行一次
    var mytime = setInterval(function () {
        subs();
    },1000)
    function subs(){
        time--;
        $(btnObjId).attr('disabled','disabled').text('(' + time + ')秒后重新获取');
        if(time===0){
            clearInterval(mytime);
            $(btnObjId).removeAttr('disabled').text('获取验证码');
            $(btnObjId).attr("disabled",false);//按键可用
        } else{
            $(btnObjId).attr("disabled",true);//按键不可用
        }
    }
}