var fs = require('fs');
var dataOfStudent
var b 
// }
// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
fs.readFile('study.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
    dataOfStudent=data.toString();
    var b=dataOfStudent.split("\n")
    var temp = new Array();
    for(var i =0;i<b.length-1;i++)
        {
            temp[i]=[];
            var tt=b[i].split(" ")
            for(var j =0;j<tt.length;j++)
                temp[i][j]=tt[j];
            temp[i][temp[i].length-1]=parseInt(temp[i][temp[i].length-1])
        }
        //sort
        for(var i=0;i<temp.length-1;i++)
        {
            for(var j=i+1;j<temp.length;j++)
            {
                if(temp[i][temp[i].length-1]>temp[j][temp[j].length-1])
                {
                    var ld=temp[j]
                    temp[j]=temp[i]
                    temp[i]=ld
                }
            }
        }
//arguments
var arguments = process.argv.splice(2);
if(arguments.length==2)
{
    if(arguments[0]=="-a"||arguments[1]=="-a")
        console.log("invalid argument");
    else
    {
        var sum=0
        for(var i=0;i<temp.length;i++)
        {
            if(temp[i][0]==arguments[1])
                sum+=temp[i][temp[i].length-1];
        }
        console.log(sum);
    }
}
else if(arguments.length==3)
{
    if(arguments[0]=="-a"||arguments[1]=="-a"||arguments[2]=="-a")
        console.log("invalid argument");
    else
        {
            for(var i=0;i<temp.length;i++)
            {
                if(temp[i][0]==arguments[1])
                    console.log(temp[i].join(" "))
            }
        }
}
else if(arguments.length==1)
{
    //dictionary
    var sum= {}
        for(var i=0;i<temp.length;i++)
        {
                if(temp[i][0] in sum)
                    {
                    sum[temp[i][0]]=temp[i][temp[i].length-1]+sum[temp[i][0]]
                    }
                else
                   {
                    sum[temp[i][0]]=temp[i][temp[i].length-1]
                   }
        }

    if(arguments[0]=="-a")
    {
        var maxDate
        var minDate
        for(var i=1;i<temp[0].length;i++)
            if(temp[0][i]!='')
            {
                minDate=temp[0][i]
                break
            }
        for(var i=1;i<temp[temp.length-1].length;i++)
            if(temp[temp.length-1][i]!='')
            {
                maxDate=temp[temp.length-1][i]
                break;
            }
        console.log("赚钱最多的日子:    "+maxDate)
        console.log("赚钱少的日子:    "+minDate)
        sum = Object.keys(sum).sort(function(a,b){ return sum[a]-sum[b];});
        var maxMoney
        var minMoney
        console.log("赚钱最多的学生:    "+sum[sum.length-1])
        console.log("赚钱最少的学生:    "+sum[0])
    }
    else if(arguments[0]=="-l")
    {
        sortedSum = Object.keys(sum).sort(function(a,b){ return sum[a]-sum[b];});
        var j=0
        for(let i =0;i<sortedSum.length;i++)
        {  
            console.log(sortedSum[i]+"    "+sum[sortedSum[i]])
        }
    }
}
});