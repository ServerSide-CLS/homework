var fs = require('fs');

fs.readFile('study.txt',function(error,data){
	var arguments = process.argv.splice(2);
      //console.log('所传递的参数是：', arguments);
	if(error){
		console.log('error');
	}
	var student = data.toString().trim().split('\n');
	var map = new Map();
	for(i=0;i<student.length;i++){
        	var stu = student[i].split(/\s+/);
        	if(map.has(stu[0])){
                	map.set(stu[0],map.get(stu[0])+parseInt(stu[3]));
        	}
        	else{
                	map.set(stu[0],parseInt(stu[3]));
        	}
	}	
        var map1 = new Map();
        for(i=0;i<student.length;i++){
                var stu1 = student[i].split(/\s+/);
                if(map1.has(stu1[1])){
                        map1.set(stu1[1],map1.get(stu1[1])+parseInt(stu1[3]));
                }
                else{
                        map1.set(stu1[1],parseInt(stu1[3]));
                }
        } 
	var map2 = new Map();
        for(i=0;i<student.length;i++){
                var stu2 = student[i].split(/\s+/);
                if(map2.has(stu2[0])){
                        map2.set(stu2[0],parseInt(map2.get(stu2[0]))+parseInt(stu2[3]));
                }
                else{
                        map2.set(stu2[0],parseInt(stu2[3]));
                }

        }

	if(arguments[0]=='-n'){
		if(arguments.length==2){
			var sum=0;
			var name=arguments[1];
			for(i=0;i<student.length;i++){
				var mon=student[i].split(/\s+/);
				if(mon[0].toString()==name){
					sum=sum+parseInt(mon[3]);
				}
			}
			console.log(sum);
		
		}
		else{
			var name1=arguments[1];
			if(arguments[2]=='-l'){
                        for(i=0;i<student.length;i++){
                                var mon=student[i].split(/\s+/);
                                if(mon[0].toString()==name1){
                                        console.log(student[i]);
                                }
                       }

			}
		}
	}
	else if(arguments[0]=='-l'){
		for(let [i,j] of map2){
	      //for(i=0;i<student.length;i++){
			//var stuu=student[i].split(/\s+/);
			//console.log(stuu[0],parseInt(map2.get(stuu[0])));
			console.log(i,j);
		}
	}

	else if(arguments[0]=='-a'){
		namee=Array.from(map);
		datee=Array.from(map1);
		namee.sort((x,y)=>{
			return x[1]-y[1];

		});
		namee.sort((x,y)=>{
                        return x[1]-y[1];

                });
		console.log('赚钱最多的学生:    '+namee[namee.length-1][0]);
		console.log('赚钱最少的学生:    '+namee[0][0]);
		console.log('赚钱最多的日子:    '+datee[datee.length-1][0]);
                console.log('赚钱最少的日子:    '+datee[0][0]);
	}
});
