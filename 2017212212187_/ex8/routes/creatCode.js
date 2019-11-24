module.exports ={
    createCode() {
        let num = "";
        for (let i = 0; i < 6; ++i) {
            num += Math.floor(Math.random() * 10);
        }
        console.log("验证码：" + num);
        return num;
    }
} 
