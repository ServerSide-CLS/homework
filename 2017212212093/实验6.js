const express=require('express')
const app=express()

app.get('/',(req,res)=>{
  res.send('hello world');
})

app.get('/about',(req,res)=>{
 res.send('About page');
})

//補0操作函數
function addZero(value){
  var str='';
  var len=String(value).length;
//  console.log(len); 
 if(len<2){
   str+='0'+value;
  }
  else{
   str+=value;
  }
//  console.log(value,str);
  return str;
}

app.get('/time',(req,res)=>{
 var tme=new Date();
 var year=tme.getFullYear();
 var month=tme.getMonth()+1;
 var day=tme.getDate();
 var hour=tme.getHours();
 var min=tme.getMinutes();
 var sec=tme.getSeconds(); 
 var tmeStr=year+'-'+addZero(month)+'-'+addZero(day)+' '+addZero(hour)+':'+addZero(min)+':'+addZero(sec);
 res.send(tmeStr);
})


// /etc/passwd文件中所有用戶名
         
app.get('/user',(req,res)=>{
   var fs=require('fs');
   fs.readFile('../etc/passwd',function(err,data){
      if(err){
       return console.error(err); 
      }
      var note=new Array();
      var noteColumn=new Array();
      var name=new Array();
      note=data.toString().split('\n');
      
      for(var i=0;i<note.length;i++){
        noteColumn[i]=new Array();
        noteColumn[i]=note[i].trim().split(':');
        if(name.indexOf(noteColumn[i][0])==-1){
           name.push(noteColumn[i][0]);
          }
       }
       console.log(name);  
       res.send(name);   
    });
});

// get /phone/:id 是否爲有效的移動電話，是的話返回OK，不時地話，返回NO
app.get('/phone/:id',function(req,res){
   var GetId=req.params.id;
   var Reg=/^[1][3,4,5,7,8][0-9]{9}$/;
  if(!Reg.test(GetId)){
    res.send('NO');
  }
  else{
    res.send('OK');
 }
   
});


app.listen(8900,()=>console.log('listening on port 8900'))
