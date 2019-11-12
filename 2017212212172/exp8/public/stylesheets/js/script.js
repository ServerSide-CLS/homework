$(document).ready(function() {
    var time=180;
    var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    function timme(obj) {
    if (time == 0) {
        $(obj).attr("disabled",false);   
        $(obj).html("获取验证邮箱有效性");
        time = 180;
    } else { 
        $(obj).attr("disabled", true);
        $(obj).html("重新发送(" + time + ")");
        // console.log(time);
        time--;
        setTimeout(function() {
            timme(obj);
        },
        1000);
    }
    }
    $('#subcode').click(function(){
        event.preventDefault();
        var email=$('#inputEmail').val();
        if(!reg.test(email)){
            alert("邮箱格式有误");
            return;
        }
        var params={
            email:$('#inputEmail').val()
        }
        $.ajax({
            data:params,
            url:   "http://localhost:3000/sendCode",
            type: "POST",
            success: function(data){
                alert("邮件发送成功，请注意查收");
            },
            error: function () {
                console.log(error);
            }
        }); 
        timme(this);
    });
    $('#signform').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            admin: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                }
            },
            repassword: {
                validators: {
                    notEmpty: {
                        message: '确认密码不能为空'
                    },
                }
            },
            vercode: {
                validators: {
                    notEmpty: {
                        message: '验证码不能为空'
                    },
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    emailAddress: {
                        message: '邮箱地址格式有误'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            alert("submit");
        }
    });
});