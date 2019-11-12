$(document).ready(function () {
    $("#registerBtnClk").click(function(){
		let email = $("#email").val();
		let VerificationCode = $("#VerificationCode").val();
		let password = $("#password").val();
		let ConfirmPassword = $("#ConfirmPassword").val();
	    $.post("/Messige_",
	    {
	        "email":email,
	        "VerificationCode":VerificationCode,
	        "password":password,
	        "ConfirmPassword":ConfirmPassword
	    },
	    function(result){
			alert(result);
		});
    });
});