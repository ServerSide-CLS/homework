


var fs = require('fs');

fs.readFile('study.txt',function(err,data){

    var arguments = process.argv.splice(2);

// 所传递的参数是： [ '-n', 'wang', '-l' ]
// console.log(arguments[0]);

    if(err){
        return console.error(err);
    }
    // console.log(data.toString());
    var array = data.toString().split("\n");
    
    

if (arguments[0]=='-n') {
    if (arguments[1]=='wang'){
       if (arguments[2]=='-l') {
        
        for(i in array) {
    	if(array[i].substring(0,8)=='wang    '){
    	console.log(array[i]);
        }
        
        }
       }
       else{
        var str=array[0];
    	var total=0;
    	for(i in array) {
    	if(array[i].substring(0,8)=='wang    '){
    	var a=parseInt(array[i].substring(str.length-4));
    	
    	total+=a;
    	
        }
        

        }
        console.log(total);
    	}
	}

    if(arguments[1]=='chen'){
      if (arguments[2]=='-l') {

    	for(i in array) {
    	if(array[i].substring(0,8)=='chen    '){
    	console.log(array[i]);
        }
        
        }
    	
       }
       else{
    	var str1=array[0];
    	var to=0;
    	for(i in array) {
    	if(array[i].substring(0,8)=='chen    '){
    	var b=parseInt(array[i].substring(str1.length-4));
    	to+=b;
    	}
        }
        console.log(to);
    	
       }  
    }

    if(arguments[1]=='xiaoli'){
      if (arguments[2]=='-l') {
        for(i in array) {
    	if(array[i].substring(0,8)=='xiaoli  '){
    	console.log(array[i]);
        }
        
        }    	
       }
       else{
    	var str=array[0];
    	var total=0;
    	for(i in array) {
    	if(array[i].substring(0,8)=='xiaoli  '){
    	var a=parseInt(array[i].substring(str.length-4));
    	
    	total+=a;
    	
        }
        

        }
        console.log(total);
    	
       }
    }
    if(arguments[1]!='wang'&&arguments[1]!='xiaoli'&&arguments[1]!='chen'){
    	console.log('此人不存在。');
    }


}
if (arguments[0]=='-a'){
    var str=array[0];
    var total1=0;
    for(i in array) {
    	if(array[i].substring(0,8)=='wang    '){
    	var a=parseInt(array[i].substring(str.length-4));
    	
    	total1+=a;
    }
    }

    
    var total2=0;
    for(i in array) {
    	if(array[i].substring(0,8)=='chen    '){
    	var b=parseInt(array[i].substring(str.length-4));
    	total2+=b;
    	}
        }
    
    var total3=0;
    for(i in array) {
    	if(array[i].substring(0,8)=='xiaoli  '){
    	var a=parseInt(array[i].substring(str.length-4));
    	
    	total3+=a;
    }
    }
    // console.log(total1);
    // console.log(total2);
    // console.log(total3);
    
    if(total1>=total2&&total1>=total3){
    	console.log("赚钱最多的学生：wang");
    }
    if(total2>=total1&&total2>=total3){
    	console.log("赚钱最多的学生：chen");
    }
    else{
    	console.log("赚钱最多的学生：xiaoli");
    }
	

	if(total1<=total2&&total1<=total3){
    	console.log("赚钱最少的学生：wang");
    }
    if(total2<=total1&&total2<=total3){
    	console.log("赚钱最少的学生：chen");
    }
    if(total3<=total1&&total3<=total2){
    	console.log("赚钱最少的学生：xiaoli");
    }
    
    var a=[];
	
    for(i in array) {
    	var b=parseInt(array[i].substring(str.length-4));
    	a[i]=b;
    	
    }
    var max=a[0];
	var x=0;

    for(i=0;i<a.length;i++){
        if(a[i]>=max){
    		max = a[i];
    		x=i;
    	}
    	else{
    		max=max;
    		x=x;
    	}

    	// console.log(x);
    }
    console.log("赚钱最多的日子："+array[x].slice(9,19));

    
    var min=a[0];
	var y=0;

    for(i=0;i<a.length;i++){
        if(a[i]<=min){
    		min = a[i];
    		y=i;
    	}
    	else{
    		min=min;
    		y=y;
    	}

    	// console.log(x);
    }
    console.log("赚钱最少的日子："+array[y].slice(9,19));

	
	





}

if (arguments[0]=='-l'){
	 var str=array[0];
    var total1=0;
    for(i in array) {
    	if(array[i].substring(0,8)=='wang    '){
    	var a=parseInt(array[i].substring(str.length-4));
    	
    	total1+=a;
    }
    }

    
    var total2=0;
    for(i in array) {
    	if(array[i].substring(0,8)=='chen    '){
    	var b=parseInt(array[i].substring(str.length-4));
    	total2+=b;
    	}
        }
    
    var total3=0;
    for(i in array) {
    	if(array[i].substring(0,8)=='xiaoli  '){
    	var a=parseInt(array[i].substring(str.length-4));
    	
    	total3+=a;
    }
    }
    console.log('wang    '+total1);
    console.log('chen    '+total2);
    console.log('xiaoli  '+total3);

}

 



});    





