var argument=process.argv.splice(2);
// console.log("所傳遞的參數：",argument);

var fs=require('fs');
var $=require('jquery');

//去除數組空字符串
function OutEmptyElement(arr){
    var a=[];
    for(var i=0;i<arr.length;i++){
     var data=arr[i].trim();
     if(data!=''){
     a.push(data);
     }}
     return a;
    }
 


//一、讀取文本文件
fs.readFile('study.txt',function(err,data){
    if(err){
        return console.error(err);
    }

    //console.log("異步讀取"+data.toString());

    //通過noteColumn獲取文本的每一行，‘\n’分割
    var note=new Array();
    var noteColumn=new Array();
    var name=new Array();
    var SelfMoney=new Array();

    note=data.toString().split('\n');  

    for(var i=0;i<note.length;i++){
       noteColumn[i]=new Array();
       noteColumn[i]=note[i].trim().split(' ');  //去除每一行的空白字符
       noteColumn[i]=OutEmptyElement(noteColumn[i]);

    }
   
    for(var i=0;i<noteColumn.length;i++)
    {
      
        if(name.indexOf(noteColumn[i][0])==-1)
         {
            name.push(noteColumn[i][0]);
            var index=name.indexOf(noteColumn[i][0]);
            //如果學生的名字還沒有壓入name數組
            if(SelfMoney.length<index+1 || index== 0)
             {
                SelfMoney.push(parseInt(noteColumn[i][3]));
             }
        }
             //如果學生的名字已經壓入name數組         
            else
             {
                var index=name.indexOf(noteColumn[i][0]);
                SelfMoney[index]+=parseInt(noteColumn[i][3]);
             }
        }
//     console.log(noteColumn);

  //二、判斷傳入的參數

  //index.js -n wang

  if(argument.length== 2 && argument[0]=='-n')
  {
    var money_n=0;
 
    for(var i=0;i<noteColumn.length;i++)
    {
           if(noteColumn[i][0]==argument[1])
          {
                money_n+=parseInt(noteColumn[i][3]);
          }
       
     } 
    console.log(argument[1],"      ",money_n);
   }
   
  //index.js -l
   else if(argument.length== 1 && argument[0]=='-l')
  {
    for(var i=0;i<name.length;i++)
    {
       console.log(name[i],"      ",SelfMoney[i]);    
        
     } 
   }



  //index.js -n wang -l

    else if(argument.length== 3 && argument[0]=='-n' &&  argument[2]=='-l' )
  {
    for(var i=0;i<noteColumn.length;i++)
    {
       if(argument[1]==noteColumn[i][0])
       {
          console.log(noteColumn[i][0],'   ',noteColumn[i][1],'   ',noteColumn[i][2],'    ',noteColumn[i][3]);
       }   
        
     } 
   }
  //index.js -a
   else if(argument.length== 1 && argument[0]=='-a')
  {
    var maxMon=-1,mixMon=1000;
     for(var i=0;i<SelfMoney.length;i++)
   {
      if(maxMon<SelfMoney[i])
          maxMon=SelfMoney[i];
      if(mixMon>SelfMoney[i])
          mixMon=SelfMoney[i];     
   }
    var maxIndex=SelfMoney.indexOf(maxMon);  
    var minIndex=SelfMoney.indexOf(mixMon);
    var maxDate,minDate;
    var DateMin=10000,DateMax=-1;

    for(var i=0;i<noteColumn.length;i++)
   {
     if(noteColumn[i][0]==name[maxIndex])
      {
        if(DateMax<parseInt(noteColumn[i][3]))
         {
           DateMax=parseInt(noteColumn[i][3]);
           maxDate=noteColumn[i][1];    
         }
       }
      if(noteColumn[i][0]==name[minIndex])
      {
        if(DateMin>parseInt(noteColumn[i][3]))
         {
           DateMin=parseInt(noteColumn[i][3]);
           minDate=noteColumn[i][1];    
         }
       }
   }
    console.log('賺錢最多的學生:    ',name[maxIndex]);
    console.log('賺錢最少的學生:    ',name[minIndex]);
    console.log('賺錢最多的日子:    ',maxDate);
    console.log('賺錢最多的學生:    ',minDate);
   
   }
    
    
});




  












