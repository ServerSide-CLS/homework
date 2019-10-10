var array1 = new Array();
var array2 = new Array();
var array3 = new Array();
var fs = require('fs');
fs.readFile('study.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
	array1=data.toString().split(/\s+/);
	for(let i=0;array1[i*4];i++){
		array2[i] = new Array();
		for(let j=0;j<4;j++){
			array2[i][j]=array1[i*4+j];		
		}	
	}
	for(let i=0;i<array2.length;i++){
		array3[i] = new Array();
		for(let j=0;j<array2[i].length;j++){
			array3[i][j]=array2[i][j]
		}
	}
	for(let i=0;i<array3.length;i++){
		for(let j=i+1;j<array3.length;j++){
			if(array3[i][0]==array3[j][0] && array3[i][0]!=""){
				array3[j][0]="";
				array3[i][3]=parseInt(array3[j][3])+parseInt(array3[i][3]);			
			}
		}
	}
	for(let i=0;i<array3.length;i++){
		if(array3[i][0]==""){
			array3.splice(i,1);		
		}	
	}
	for(let i=0;i<array3.length;i++){
		if(array3[i][0]==""){
			array3.splice(i,1);		
		}	
	}
	var args = process.argv.splice(2);
	if(args.length==1){
		if(args[0]=="-l"){
			for(let i=0;i<array3.length;i++){
				console.log(array3[i][0]+" "+array3[i][3]);
			}
		}
		else if(args[0]=="-a"){
			let max=array3[0][3],min=array3[0][3],maxMan=array3[0][0],minMan=array3[0][0],maxDate=array2[0][1],minDate=array2[0][1];		
			for(let i=0;i<array3.length;i++){
				if(max<array3[i][3]){
					max=array3[i][3];
					maxMan=array3[i][0];				
				}
				if(min>array3[i][3]){
					min=array3[i][3];
					minMan=array3[i][0];
				}
			}
			max=array2[0][3],min=array2[0][3];
			for(let i=0;i<array2.length;i++){
				if(max<array2[i][3]){
					max=array2[i][3];	
					maxDate=array2[i][1];			
				}
				if(min>array2[i][3]){
					min=array2[i][3];
					minDate=array2[i][1];				
				}
			}
			console.log("赚钱最多的学生:"+maxMan);
			console.log("赚钱最少的学生:"+minMan);
			console.log("赚钱最多的日子:"+maxDate);
			console.log("赚钱最少的日子:"+minDate);
		}
	}else if(args.length==2){
		for(let i=0;i<array3.length;i++){
			if(array3[i][0]==args[1]){
				console.log(array3[i][0]+" "+array3[i][3])
			}
		}
	}else if(args.length==3 && args[0]=="-n" && args[2]=="-l"){
		for(let i=0;i<array2.length;i++){
			if(array2[i][0]==args[1]){
				console.log(array2[i][0]+" "+array2[i][1]+" "+array2[i][2]+" "+array2[i][3])
			}
		}
	}
});
