//get command line arguments
var arguments=process.argv.splice(2);

var fs=require('fs');
var data=fs.readFileSync('study.txt','utf-8');
var records=data.split('\n');

//handle data
var arr=new Array();
records.forEach(element => {
    arr.push(element.trim().split(/\s+/));
});

//-n sum(money) by people
//-l sum(money) by date
var money_people={};
var money_date={};
arr.forEach(element => {
    money_people[element[0]]=0;
    money_date[element[1]]=0;
});
arr.forEach(element => {
    money_people[element[0]]+=parseInt(element[3]);
    money_date[element[1]]+=parseInt(element[3]);
});

var flag=arguments.length;

if(flag==1)
{
    if(arguments[0]=='-a')//show results
    {
        var minn=0x3f3f3f3f,maxx=-1;
        var ans_minn,ans_maxx;
        for(key in money_people)
        {
            if(money_people[key]>maxx)
            {
                maxx=money_people[key];
                ans_maxx=key;
            }
            if(money_people[key]<minn)
            {
                minn=money_people[key];
                ans_minn=key;
            }
        }
        console.log("赚钱最多的学生：  "+ans_maxx);
        console.log("赚钱最少的学生：  "+ans_minn);
        minn=0x3f3f3f3f,maxx=-1;
        for(key in money_date)
        {
            if(money_date[key]>maxx)
            {
                maxx=money_date[key];
                ans_maxx=key;
            }
            if(money_date[key]<minn)
            {
                minn=money_date[key];
                ans_minn=key;
            }
        }
        console.log("赚钱最多的日子：  "+ans_maxx);
        console.log("赚钱最少的日子：  "+ans_minn);
    }
    else if(arguments[0]=='-l')//show lists
    {
       for(key in money_people)
       {
           console.log(key,money_people[key]);
       }
    }
    else
    {
        console.log("unvalid command!>m<");
    }
}
else if(flag==2)
{
    if(arguments[0]=='-n')//show this people
    {
        console.log(arguments[1]+": "+money_people[arguments[1]]);
    }
    else
    {
        console.log("unvalid command!>m<");
    }
}
else if(flag==3)
{
    if(arguments[0]=='-n'&&arguments[2]=='-l')//show people's history work records
    {
        arr.forEach(element => {
            if(element[0]==arguments[1])
            {
                console.log(arguments[1]+"  "+element[1]+"  "+element[2]+"  "+element[3]);
            }
        });
    }
    else
    {
        console.log("unvalid command!>m<");
    }
}
else
{
    console.log("unvalid command!>m<");
}