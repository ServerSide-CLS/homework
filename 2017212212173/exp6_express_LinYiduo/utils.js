const fs = require('fs');

module.exports = {
    getTime:function () {
        var date    = new Date();
        var year    = date.getFullYear();
        var month   = date.getMonth() + 1;
        var day     = date.getDate();
        var hour    = date.getHours();
        var minute  = date.getMinutes();
        var second  = date.getSeconds();
        var timestr = year + "-" + month + "-" + day + " " 
                    + hour + ":" + minute + ":" + second;
        return timestr;
    },

    isvalidPhoneNum:function (number) {
        return (/^1(3|4|5|6|7|8|9)\d{9}$/.test(number)) ? "OK" : "NO";
    },

    readFile:function (FILENAME) {
        var userlist = new Array();
        var data = fs.readFileSync(FILENAME).toString().trim().split('\n');
        for (let i=0; i<data.length; i++){
            userlist.push(data[i].split(':')[0]);
        }
        return userlist;
    }
}