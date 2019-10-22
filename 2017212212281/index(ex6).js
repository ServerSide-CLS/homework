const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello world.')
})

app.get('/about', (req, res) => {
    res.send('About page of GET')
})

app.post('/about', (req, res) => {
    res.send('About page of POST')
})

app.get('/time', (req, res) => {
	let obj=new Date();
	let year=obj.getFullYear();
    let month=obj.getMonth();
    let day=obj.getDate();
	let hour=obj.getHours();
	let minute=obj.getMinutes();
	let second=obj.getSeconds();
    res.send(year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second)
})


app.post('/user', function(req, res) {
    let fs = require("fs");
	let data = fs.readFileSync('/etc/passwd');
	let file = data.toString().split('\n');
    let arrs = new Array();
    let userName = "";
    file.forEach(element => {
        arrs= element.split(":");
        userName += arrs[0] + '\n';
    });
    res.send(userName);
});

app.get('/time', (req, res) => {

	let obj=new Date();

	let year=obj.getFullYear();

    let month=obj.getMonth();

    let day=obj.getDate();

	let hour=obj.getHours();

	let minute=obj.getMinutes();

	let second=obj.getSeconds();

    res.send(year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second)

})

function checkPhone(id){ 
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(id))){ 
        return false; 
    } 
	return true;
}
app.get('/phone/:id', (req, res) => {
	if(checkPhone(req.params.id))
		res.send("OK")
	else
		res.send("NO")
})

app.listen(3000, () => console.log('listening on port 3000'))
