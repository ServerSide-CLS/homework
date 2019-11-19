var idenflag=0;

function isemail(){
    if(!$("#email").val().search(/\S*@\S*\.\S*/)) return true;
    else return false;
}

function isconfirm(){
    if($("#password").val()==$("#confirm").val()) return true;
    else return false;
}

$( "#confirm" ).on( "input", function( e ) {
    $("#confirm").attr("style","backgroundColor:'rgb(255,255,255)'");
    if(isconfirm()){
        $("#i-confirm").attr("src","images/正确.svg");
        $("#t-confirm").text("密码一致");
        $("#t-confirm").attr("style","color:'green'");
    }
    else{
        $("#i-confirm").attr("src","images/错误.svg");
        $("#t-confirm").text("两次输入的密码不一致");
        $("#t-confirm").attr("style","color:'red'");
    }
});

$( "#email" ).on( "input", function( e ) {
    $("#email").attr("style","backgroundColor:'rgb(255,255,255)'");
    if(isemail()){
        $("#i-email").attr("src","images/正确.svg");
        $("#t-email").text("邮箱可用");
        $("#t-email").attr("style","color:'green'");
    }
    else{
        $("#i-email").attr("src","images/错误.svg");
        $("#t-email").text("请输入正确的邮箱");
        $("#t-email").attr("style","color:'red'");
    }
});

$( "#send" ).on( "click", function( e ) {
    var time = 180;
    const email = $('#email').val();
    $.get('/email', {
        email: email
    });
    var myTime = setInterval(() => {
        subs();
    }, 1000)
    function subs() {
        time--;
        $('#send').attr("value", time + "s");
        if (time == 0) {
            clearInterval(myTime);
            $('#send').attr("value", "验证");
            $('#send').attr("disabled", false);
        }
        else {
            $('#send').attr("disabled", true);
        }
    }
});