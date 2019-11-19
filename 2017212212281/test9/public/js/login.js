$(document).ready(function () {
    $("#mailLogin").click(function(){
 		let Email = $("#Email").val(),pwd = $("#pwd").val();
        $.post("/loginCheck",
        {
            "Email":Email,
            "pwd":pwd,
        },
        function(result){
			if(result == "notExist"){
				alert("账号有误");
			}
            else if(result == "success")
               window.location.href="/index.html";
            else{
                alert("密码有误");
	        }	
		});
        return false;
    });
});
