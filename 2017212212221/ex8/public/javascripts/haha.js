var but=document.getElementById('but_ver_email');
var email=document.getElementById('Email');
var label1=document.getElementById('label1');
var sec=0;

but.onclick=()=>{
    var re=/^[\w.-]+@([0-9a-z][\w-]+\.)+[a-z]{2,3}$/i;

    if(re.test(email.value)){
        sec=10;
        label1.removeAttribute("hidden");
        but.disabled=true;
        var timer=setInterval(()=>{time()},1000);
        //向后台发送邮箱账号
        $.ajax({
            url:'/email',
            type:'GET',
            data:{'email':email.value},
        });
    }else{
        alert("输入邮箱有误");
    }

    const time=()=>{
        sec-=1;
        label1.innerHTML=sec+"s后再试";
        if(sec==0){
            but.disabled=false;
            label1.setAttribute("hidden",true);
            clearInterval(timer);
        }
    }
};
