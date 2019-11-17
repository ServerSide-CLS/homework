$(document).ready(function() {
    $('#toLogin').click(function(event) {
        event.preventDefault();
        let email = $('email').val();
        if (email == "") {
            alert("邮箱不能为空");
            return false;
        }
        let password = $('pwd').val();
        if (password = "") {
            alert("密码不能为空");
            return false;
        }
        $.ajax({
           type: "post",
           url: "/toLogin",
           data: {
               email : $('#email').val(),
               password: $('#pwd').val()
           },
           success: function(response) {
               if(response.code == 200) {
                    alert(response.msg);
                    window.location.href = "/admin";
                } else {
                    alert(response.msg);
                    window.location.href = "/login";
                }
            },
           error: function(err) {
               alert(err.msg);
               window.location.href = "/";
           }
        });
    });

    $('#toRegister').click(function(event) {
        event.preventDefault();
        window.location.href = "/";
    })

});