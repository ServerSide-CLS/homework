function SendMail(){
    email = $('#email').val();
    //判断邮箱格式
    if(CheckMail(email)){  
            $.get('/email', {
                email: email,       
            },function(res){
                if('IsSignedEmail' == res){
                    window.location.href="errpage";
                }
            });
           CountDown(); 
    }else{
        window.location.href="errpage";
    }
}

//验证邮箱格式
function CheckMail(email){
    var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    return email.length<25 && reg.test(email);
}
//倒计时
function CountDown(){
    var maxtime = 0.5 * 60;
    var tspan = document.getElementById("time");
    var cfmail = document.getElementById("cfmemail");
    var timehidden = document.getElementById("timehidden");
    cfmail.disabled=true;
    timehidden.style.visibility="visible";
    var interval = setInterval(function(){
        if (maxtime >= 0) {
            minutes = Math.floor(maxtime / 60);
            seconds = Math.floor(maxtime % 60);
            msg = "" + minutes + "分" + seconds + "秒";
            tspan.innerHTML = msg;
            --maxtime;
        }else{
            cfmail.disabled = "";
            timehidden.style.visibility="hidden";  
            clearInterval(interval);
        }
   
    },1000);
}
