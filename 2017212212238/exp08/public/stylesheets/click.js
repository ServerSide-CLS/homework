
$(function(){
	$("#getCAPTCHA").click(function(){
		if($("#email").val())
		LockButton("#getCAPTCHA","#email",180);
	})
	if ($.cookie("djsendtime") != undefined && !isNaN($.cookie("djsendtime"))) {  //读取到了cookie值
        var djsendtime = $.cookie("djsendtime");
        var now = new Date().getTime();  //当前时间戳
        var locksecends = parseInt((djsendtime - now) / 1000);
        if (locksecends <= 0) {
            $.cookie("djsendtime", null);
        } else {
            LockButton('#getCAPTCHA', locksecends);
        }
    }
})

//锁定发送邮件按钮
var LockButton = function (btnObjId, textid,locksecends) {
	var djsendtime = $.cookie("djsendtime");
    if (djsendtime == null || djsendtime == undefined || djsendtime == 'undefined' || djsendtime == 'null') {
        var now = new Date().getTime();  //当前时间
        var endtime = locksecends * 1000 + now;  //设定结束时间
        $.cookie("djsendtime", endtime);  //将结束时间保存到cookie
    }
    $(btnObjId).attr('disabled','disabled').text('(' + locksecends + ')秒后重新获取');
    $(textid).attr('readonly','readonly');
     var timer = setInterval(function () {
        locksecends--;
        $(btnObjId).text('(' + locksecends + ')秒后重新获取');
        if (locksecends <= 0) {
            $.cookie("djsendtime", null);
            $(btnObjId).removeAttr('disabled').text('获取验证密码有效性');
            $(textid).removeAttr('readonly');
            clearInterval(timer);
        }
    }, 1000);
};