$(document).ready(function () {
    $("#loginBtnClk").click(function(){
		let email = $("#email").val();
		let password = $("#password").val();
	    $.post("/Login_",
	    {
	        "email":email,
	        "password":password,
	    },
	    function(result){
			alert(result);
			if(String(result) == "登录成功"){
				window.location.href = "http://localhost:3000/index";
			}
		});
    });
});