const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/ex09_db';

/**
 * 连接
 */
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

/**
  * 连接失败
  */
db.on('error', () => {
  console.log('\x1B[31mMongoose connection error!\x1B[0m')
});

/**
  * 连接成功
  */
db.once('open', () => {
  console.log('\x1B[32mMongoose connection success!\x1B[0m')
});
