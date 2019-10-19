/**
 * author:cyx
 */

fs=require("fs");
const express = require('express')
const app=express()
app.listen(8900,() => console.log('listening on 8900'))

//任务一：get方法访问，返回当前时间
app.get('/time',(req,res) =>{

	//创建Date对象，调用getFullYear，getMonth，getDate等方法获取年月日时分秒
	//通过padStart(位数，填充字符)格式化时间
	var date=new Date()
	var month=(date.getMonth()+1).toString().padStart(2,"0")
	var day=date.getDate().toString().padStart(2,"0")
	var hour=date.getHours().toString().padStart(2,"0")
	var min=date.getMinutes().toString().padStart(2,"0")
	var sec=date.getSeconds().toString().padStart(2,"0")

	res.send(`${date.getFullYear()}-${month}-${day} ${hour}:${min}:${sec}\n`)
})

//任务二：post方法访问，显示/etc/passwd中所有的用户名
app.post('/usr',(req,res)=>{
	
	const FILE="/etc/passwd"
	var data
	var str=""

	//将passwd文件转换为字符串后，再以二维数组的形式赋值给ret
	var InitData=(ret=[])=>{
		fs.readFileSync(FILE).toString().split(/\n/).forEach((val)=>{
			ret=[...ret,val.split(":")]
		})
		return ret
	}
	
	data=InitData()
	//console.log(data)

	//用foreach方法，遍历二维数组拼装字符串
	data.forEach((item,index)=>{
		str+=`${item[0]}\n`
	})

   	res.send(str)
  })

//任务三：get方法访问，检测id格式是否为有效的移动电话
app.get('/phone/:id',(req,res) =>{
	
	//正则表达式是检验是否是有效的移动电话
	var reg=/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;

	if(reg.test(req.params.id))
		res.send("OK\n")
	else
		res.send("NO\n")
})

// 错误处理路由
app.get('*', function(req, res) {
    res.send('404. Sorry, this is an invalid URL.\n');
});
