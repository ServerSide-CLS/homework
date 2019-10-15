var fs = require('fs');

// 读取文件
FileInString = fs.readFileSync('study.txt').toString();
// console.log('FileInString:\n',FileInString);      //读取的数据

const data = FileInString.split('\n').map((item) => {
	return item.split(/\s+/);
});
// console.log('data:\n',data);      //处理完转化为map的数据

//console.log(data);		//测试输入数据
//结束文件读取

//读取参数
const params = process.argv.splice(2);

//当同时使用-n和-l参数时，只需遍历匹配名字输出
if (params.includes('-l') && params.includes('-n')) {
	//找到-n位置
	const index = params.indexOf('-n');
    
    //校验是否存在-a
	if (params.includes('-a')) {
		console.log('-a 与 -n -l 不能同时使用');
		return;
	}
	data.forEach((value) => {
		if (value[0] === params[index + 1]) {
			//格式化输出
            console.log(value.toString().replace(/,/g, '  '));
		}
	});
	return;
}
params.forEach((value, index) => {
	var res; 
	switch (value) {
		case '-n':
			var name = params[index + 1];
			res = calcu(0);
			res = new Map(res);
			console.log(`${name}:  ${res.get(name)}`);
			break;
		case '-l':
			res = calcu(0);
			res.forEach((value) => {
				console.log(`${value[0]}:  ${value[1]}`)
			});
			break;
		case '-a':
			res = calcu(0);
			console.log(`赚钱最多的学生:  ${res[res.length - 1][0]}`);
			console.log(`赚钱最少的学生:  ${res[0][0]}`);
			res = calcu(1);
			console.log(`赚钱最多的日子:  ${res[res.length - 1][0]}`);
			console.log(`赚钱最少的日子:  ${res[0][0]}`);
			break;
		default:
			break;
	}
});
//结束参数读取

//对结果进行排序
function calcu(index) {
	var arrey = new Map();
	data.forEach((item) => {
        //console.log('\n',arrey);
		if (arrey.has(item[index])) { //map中已经存在，加上去
			arrey.set(item[index], arrey.get(item[index]) + parseInt(item[3])); 
		}
		else { //map中不存在，扔进去
			arrey.set(item[index], parseInt(item[3])); 
		}
	});
	//把map转换为数组map
	arrey = Array.from(arrey);
	return arrey;
}