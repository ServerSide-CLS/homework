const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello world.')
})

//任务2.返回当前时间

function fun(s){
	str=""
	if(s==0)str="00"
	else if(s<10)str='0'+s
	else str=""+s
	return str
}
app.get('/time', (req,res)=>{
	var date=new Date();   
	var year=date.getFullYear(); //获取当前年份   
	var mon=date.getMonth()+1; //获取当前月份   
	var da=date.getDate(); //获取当前日   
	var h=date.getHours(); //获取小时   
	var m=date.getMinutes(); //获取分钟   
	var s=date.getSeconds(); //获取秒   
	// console.log(s)
	var str=year+'-'+fun(mon)+'-'+fun(da)+ '  '+fun(h)+':'+fun(m)+':'+fun(s)
	res.send(str);
})

//任务3.显示/etc/paddwd中所有用户名
app.post('/user',(req,res)=>{
	let userNm=""
	let inform=[]
	let fs = require('fs');
	fs.readFile('/etc/passwd', function (err, data) {
 		//异常处理
   		if (err) {
       		return console.error(err);
   		}
   		//获取文本行
   		array = data.toString().split('\r\n');

   		for(i = 0;i < array.length;i++){

	      	//分割数据
	       	inform[i] = array[i].split();

	       	//去除字符间的空格
	       	inform[i] = inform[i][0].replace(':', ' ').split(' ');
	       	userNm+='\n'+inform[i][0];
   		}
   		// console.log(userNm)
   		
   	})
   	res.send(userNm)
})

//任务4
// 判断是否为有效手机号
function isPhone(phone){
	return  /^1[3|4|5|7|8][0-9]{9}$/.test(phone);
}
app.get('/phone/:id',(req,res)=>{
	res.send(isPhone(req.params.id)?"OK":"NO")
})

// 错误处理路由
app.get('*', function(req, res) {
    res.send('404. Sorry, this is an invalid URL.');
});

//任务1
app.listen(8900, () => console.log('listening on port 8900'))