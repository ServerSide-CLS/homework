jQuery(function ($) {
    $("#getIdentify").click(function () {
        $("#getIdentify").attr("disabled","disabled");
        var time = 180;
        var timer;
        timer = setInterval(function () {
            $("#time").html(time);
            time--;
            if (time < 0){
                clearInterval(timer);
                $("#time").html("");
                $("#getIdentify").removeAttr("disabled");
            }
        },1000);

        $.ajax({
            type: "POST",
            url: rootPath + "sendMail",
            dataType: "json",
            data: {
                email: $("#email").val()
            },
            success: function (data) {
                if (data.status == '1') {
                    $("#getIdentify").attr("disabled","disabled");
                    // alert(data.msg);
                } else {
                    $("#getIdentify").attr("disabled","true");
                    alert(data.msg);
                }
            },
            error: function () {
                alert("服务器请求失败")
            }
        })
    })
    
    $("#signUp").click(function () {
        $.ajax({
            type: "POST",
            url: rootPath,
            dataType: "json",
            data: {
                email: $("#email").val(),
                identify: $("#identify").val(),
                password: $("#password").val(),
                confirmPass: $("#confirmPass").val()
            },
            success: function (data) {
               if (data.status == 1) {
                   window.location = rootPath + "success";
               }else{
                   alert(data.msg);
               }
            },
            error: function () {
                alert("服务器请求失败")
            }
        })
    })
})