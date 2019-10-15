#question:文件里的内容不能被完全存放到数组里，导致了一系列的问题
'use strict';
var fs = require('fs');
var readline = require('readline');
var data = '';
var total = [];
var argument = process.argv.splice(2);
var readerStream = fs.createReadStream('study.txt');
readerStream.setEncoding('UTF8');
function usage()
{
	console.log('1.if you wanna output total money students made then input -n');
	console.log('2.if you wanna know the list of total money then input -l');
	console.log('3.if you wanna know all student how money they totally made,then input -n -l');
	console.log('4.if you wanna know the staticics,then input -a');
}
function caluMoney_l()
{
	let myMap = {};
	const maplist = new Set(total.map(result=>{return result.user}))
	maplist.forEach(result=>{
		myMap[result] = 0;
	})
	total.forEach(result=>{
		myMap[result.user] += parseInt(result.money);
	})
	return myMap;
}
function caluMoney_n(user)
{
	var totalMoney = 0;
	total.forEach(result=>{
		if(user === result.user){
			totalMoney += parseInt(result.money);
		}
	})
	console.log(`${user}${totalMoney}`);
	return totalMoney;
}
function caluMoney_n_l(user)
{
	total.forEach(result=>{
		if (user === result.user){
			console.log(`${user} ${' '} ${result.date} ${' '}${result.work} ${' '}${result.money}`);
		}
	})
}
function caluMoney_a()
{
	let minn = {user:null, stuTotalMoney:999999, date:null, dateTotalMoney:0 };
	let maxx = {user:null, stuTotalMoney:-10000, date:null, dateTotalMoney:0 };
	var myMap = caluMoney_l();
	for (let [user, stuTotalMoney] of Object.entries(myMap)){
		if(stuTotalMoney>maxx.stuTotalMoney){
			maxx.stuTotalMoney = stuTotalMoney;
			maxx.user = user;
		}
		if(stuTotalMoney<minn.stuTotalMoney){
			minn.stuTotalMoney = stuTotalMoney;
			minn.user = user;
		}
	}
	const datelist = new Set(total.map(result=>{return result.date}));
	let dateMap = {};
	datelist.forEach(result=>{
		dateMap[result] = 0;
	})
	total.forEach(result=>{
		dateMap[result.date] += dateMap[result.money];
	})
	for (let [date, dateTotalMoney] of Object.entries(dateMap)){
		if(dateTotalMoney > maxx.dateTotalMoney){
			maxx.dateTotalMoney = dateTotalMoney;
			maxx.date = date;
		}
		if(dateTotalMoney < minn.dateTotalMoney){
			minn.dateTotalMoney = dateTotalMoney;
			minn.date = date;
		}
	}
	console.log(`赚钱最多的学生： ${maxx.user}`);
	console.log(`赚钱最少的学生： ${minn.user}`);
	console.log(`赚钱最多的日子： ${maxx.date}`);
	console.log(`赚钱最少的日子： ${minn.date}`);
}
readerStream.on('data',chunk=>{
	data += chunk;
	console.log(data);
});
readerStream.on('end',()=>{
	data.split('\r\n').map(result=>{
		result = result.trim().split(/\s+/);
		total = total.concat({
			user: result[0],
			date: result[1],
			work: result[2],
			money: result[3],
		})
	})
	console.log(total);
});
readerStream.on('close',()=>{
	if(!data){
		console.log('ERROR!');
		return ;
	}
	let str = '';
	let username = '';
	argument.forEach(result=>{
		if(result.includes('-') === true){
			str += result;
		}
		else{
			username = result;
		}
	})
		if(str.includes('a') === true){
			caluMoney_a();
		}
		else if(str.includes('n') === true && str.includes('l') === true){
			caluMoney_n_l(username);
		}
		else if(str.includes('n') === true && str.includes('l') === false){
			caluMoney_n(username);
		}	
		else if(str.includes('n') === false && str.includes('l') === true){
			Object.entries(caluMoney_l()).map(([user, money]) => {
				console.log(`${user}${':'}${money}`);
			})
		}
		else{
			usage();
		}
});
