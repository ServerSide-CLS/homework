function isEmail(str) {
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return reg.test(str);
}
function captchaNumber(){
    let num = [];
    for (let i = 0; i < 6; i++) {
        num[i] = parseInt(Math.random()*10);
    }
    return num.join('');
}
module.exports = {
    isEmail,
    captchaNumber
}