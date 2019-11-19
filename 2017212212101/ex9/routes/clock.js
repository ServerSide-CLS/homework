$(function(){
	$("#checkbt").click(function(){
		if($("#email").val())
		LockButton("#checkbt","#email",180);
	})
	if ($.cookie("djsendtime") != undefined && !isNaN($.cookie("djsendtime"))) {
        var djsendtime = $.cookie("djsendtime");
        var now = new Date().getTime();
        var locksecends = parseInt((djsendtime - now) / 1000);
        if (locksecends <= 0) {
            $.cookie("djsendtime", null);
        } else {
            LockButton('#btnSend', locksecends);
        }
    }
})

var LockButton = function (btnObjId, textid,locksecends) {
	var djsendtime = $.cookie("djsendtime");
    if (djsendtime == null || djsendtime == undefined || djsendtime == 'undefined' || djsendtime == 'null') {
        var now = new Date().getTime();
        var endtime = locksecends * 1000 + now;
        $.cookie("djsendtime", endtime);
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