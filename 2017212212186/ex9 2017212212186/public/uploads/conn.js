var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1:27017/user'
mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',()=>{
    console.log('connection success')
});

module.exports = mongoose;