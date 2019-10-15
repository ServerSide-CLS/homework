var fs = require('fs');
var readline = require('readline');
var read1 = fs.createReadStream'study.txt'
var Readline = readline.createInterface({
	input:read1
});
var arr = new Array();
Readline.on('line', function(line) {
	arr.push(line);
});
Readline.on('close', function() {
	callback(arr);
});
let name = {};
let date = {};
for (let i = 0; i < data.length - 1; ++i) {
	var str = data[i].split(/\s+/);
	if (!!name[str[0]]) name[str[0]] = parseInt(name[str[0]]) + parseInt(str[3]);
	else name[str[0]] = parseInt(str[3]);
	if (!!date[str[1]]) date[str[1]] = parseInt(date[str[1]]) + parseInt(str[3]);
	else date[str[1]] = parseInt(str[3]);
}
let pLen = process.argv.length;
if (pLen == 3) {
	var arguments = process.argv.splice(2);
	if (arg == '-l') {
		for (var Name in name) {
			console.log(Name.padEnd(10, ' '), name[Name]);
		}
	} else if (arg == '-a'){
		var MaxNameVal = 0, MinNameVal = 100000000, MaxName = "", MinName = "";
		var MaxDateVal = 0, MinDateVal = 110000000, MaxDate = "", MinDate = "";
		for (var Name in name) {
			if (name[Name] > MaxNameVal) {
				MaxNameVal = name[Name];
				MaxName = Name;
			}
			if (name[Name] < MinNameVal) {
				MinNameVal = name[Name];
				MinName = Name;
			}
		}
			for (var D in date) {
			if (date[D] > MaxDateVal) {
				MaxDateVal = date[D];
				MaxDate = D;
			}
			if (date[D] < MinDateVal){
				MinDateVal = date[D];
				MinDate = D;
			}
		}
		console.log("赚钱最多的学生： \t", MaxName);
		console.log("赚钱最少的学生： \t", MinName);
		console.log("赚钱最多的日子： \t", MaxDate);
		console.log("赚钱最少的日子： \t", MinDate);
	} else {
		console.log('Error OPeration');
	}
} else if (pLen == 4) {
	var arg = process.argv.splice(2);
	if (arg[0] == '-n') {
		if (!!name[arg[1]]) {
			console.log(arg[1], name[arg[1]]);
		} else {
			console.log('Error Name');
		}
	} else {
		console.log('Error Operation');
	}
} else if (pLen == 5) {
	var arg = process.argv.splice(2);
	if (arg[0] == '-n' && arg[2] == '-l') {
		if (!!name[arg[1]]) {
			for (let i = 0; i < data.length - 1; ++i) {
				var str = data[i].split(/\s+/);
				if (str[0] == arg[1]) {
					console.log(data[i]);
				}
			}
		} else {
			console.log('Error Name');
		}
	} else {
		console.log('Error Operation');
	}
}
});


