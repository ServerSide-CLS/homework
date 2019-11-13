var T = require("./tools");    
var vcode=""; 
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('form',{email:''});
    });

    app.get('/email', (req, res) => {
        // 生成验证码
        vcode = T.CreateVCode();
        // 发送邮件
        T.sendMail(vcode, req.query.email);
    });
    
    app.get('/errpage',(req, res) =>{
        res.send("mail error");
    });
    
    app.post('/', function(req, res, next){
        // 信息项校验
        if(!T.CheckMail(req.body.email)){ 
            res.send("mail error");
        }else if(!T.checkVCode(vcode,req.body.vcode)){
            res.send("vcode error");            
        }else if(!T.CheckPwd(req.body.pwd,req.body.cfmpwd)){
            res.send("password error");
        }else{
            //  存入jason文件            
            T.writetojason(req.body);            
            res.send("recieved your request!");
            }
    });
};


