var argv = require('yargs').argv;
var fs = require('fs');

var FILENAME = 'parttimeJob.txt';

function readFile() {
   var data = fs.readFileSync(FILENAME);
   data = data.toString().split('\n');
   var list = new Array();
   
   for (let i=0; i<data.length; i++){
      let line = data[i].split(/\s+/);
      list[i] = line;
   }

   return list;
}

function processArgs(list) {
   if (argv.n && !argv.l){
      var earn_sum = 0;
      for (let i=0; i<list.length; i++){
         if (list[i][0] == argv.n){
            earn_sum += parseInt(list[i][3]);
         }
      }
      console.log(earn_sum);
   }

   if (argv.l && !argv.n){
      let sumdict = {};
      for (let i=0; i<list.length; i++){
         if (list[i][0] in sumdict){
            sumdict[list[i][0]] += parseInt(list[i][3]);
         }
         else{
            sumdict[list[i][0]] = parseInt(list[i][3]);
         }
      }
      for (let key in sumdict){
         console.log(key + '\t' + sumdict[key]);
      }
   }

   if (argv.l && argv.n){
      let sumdict = {};
      for (let i=0; i<list.length; i++){
         if (list[i][0] == argv.n){
            console.log(list[i][0] + '\t' + list[i][1] + '\t' + 
            list[i][2] + '\t' + list[i][3]);
         }
      }
   }

   if (argv.a && !argv.n && !argv.l){
      let earndict = {};
      let datedict = {};
      for (let i=0; i<list.length; i++){
         if (list[i][0] in earndict){
            earndict[list[i][0]] += parseInt(list[i][3]);
         }
         else{
            earndict[list[i][0]] = parseInt(list[i][3]);
         }
         if (list[i][0] in datedict){
            datedict[list[i][1]] += parseInt(list[i][3]);
         }
         else{
            datedict[list[i][1]] = parseInt(list[i][3]);
         }
      }
      var max_stu = "";
      var max_stu_earn = 0;
      var min_stu = "";
      var min_stu_earn = 9999999;
      var max_date = "";
      var max_date_earn = 0;
      var min_date = "";
      var min_date_earn = 9999999;

      for (let key in earndict){
         if(earndict[key] > max_stu_earn){
            max_stu = key;
            max_stu_earn = earndict[key];
         }
         if(earndict[key] < min_stu_earn){
            min_stu = key;
            min_stu_earn = earndict[key];
         }
      }
      for (let key in datedict){
         if(datedict[key] > max_date_earn){
            max_date = key;
            max_date_earn = datedict[key];
         }
         if(datedict[key] < min_date_earn){
            min_date = key;
            min_date_earn = datedict[key];
         }
      }
      console.log("赚钱最多的学生:    ", max_stu);
      console.log("赚钱最少的学生:    ", min_stu);
      console.log("赚钱最多的日子:    ", max_date);
      console.log("赚钱最少的日子:    ", min_date);
   }
   else if(argv.a && (argv.l || argv.n)){
      console.log("Parameters conflict! Input again.")
   }
}
processArgs(readFile());