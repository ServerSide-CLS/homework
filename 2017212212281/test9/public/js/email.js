var email = require("emailjs");
var code = Math.random().toString(36).substr(2,4);
var server  = email.server.connect({
     user:"798840302@qq.com", 
     password:"egdrobzuiyvdbcjb",
     host:"smtp.qq.com",
     ssl:true 
});
function Email(email){
   server.send({
        text:code,
        from:"798840302@qq.com", 
        to:email,
        subject: "验证码"
    },
	function(err,res){
        if(err){
            return {status:500};
        }
    });
    return {status:200,code:code};
}
module.exports = Email;
