var fs = require('fs');

fs.readFile('study.txt', function (err, data) {
	if (err) {
	return console.error(err);
	}
	var txt = data.toString();
	//console.log(txt.split(/\s+/));
	var array = new Array;
	array = txt.split(/\s+/);
	//console.log(array[1]);
	
	var student = new Array;
	//console.log(array.length);
	var n=0;
	for(var i=0;i<array.length-2;i=i+4){
		if( i%4 == 0 && student.indexOf(array[i]) == -1 ){
			student.push(array[i]);
			student.push(array[i+3]);
			n+=2;		
			continue;
		}	
		if( student.indexOf(array[i]) != -1){
			var j;
			for(j = 0;j<student.length-1;j++){
				if(student[j] == array[i])
					break;
			}
			student[j+1] = Number(student[j+1])+Number(array[i+3]);
			//console.log(student[j]);
		}
	}
	//console.log(student);

	var arguments = process.argv.splice(2);
   	if(arguments[0] == '-l'){
		//-l detail
		for(var k = 0;k<student.length;k+=2){
			console.log(student[k],student[k+1]);
		}
	}
   	else if(arguments[0] == '-n'){
		if(arguments[2] == null){
			//-n name detail
			var k;
			for(k=0;k<student.length;k++){
				if(arguments[1] == student[k])
					break;
			}
			console.log(student[k],student[k+1]);
			
		}
		else if(arguments[2] == '-l') {
			//-n name -l detail
			var k;
			for(k=0;k<array.length-2;k+=4){
				if(arguments[1] == array[k]){
					console.log(array[k],array[k+1],array[k+2],array[k+3]);
				}
			}
		}
	}
	else if(arguments[0] = '-a'){
			var indexMax=0 , indexMin=0;
			for(var i = 2;i<student.length;i+=2){
				if(student[i+1]>=student[i-1])
					indexMax = i;
				if(student[i+1]<=student[i-1])
					indexMin = i;
			}
			var indexDataMax = 1,indexDataMin = 1;
			var data1 = array[3],data2 = array[3];
			for(var j=4;j<array.length-2;j+=4){
				console.log(array[j+3],array[j-1]);
				if( Number(array[j+3])>=Number(data1) ){
					indexDataMax = j+1;
					data1=array[j+3];
				}
				if( Number(array[j+3])<=Number(data2) ){
					indexDataMin = j+1;
					data2 =array[j+3];
				}
				console.log(indexDataMin,array[indexDataMin]);
			}

			console.log("赚钱最多的学生：",student[indexMax]);
			console.log("赚钱最少的学生：",student[indexMin]);
			console.log("赚钱最多的日子：",array[indexDataMax]);
			console.log("赚钱最少的日子：",array[indexDataMin]);
		}
});
