const mongodb = require("mongodb");
const url = "mongodb://localhost:27017";
const client = mongodb.MongoClient;

async function connect(cb) {
  client.connect(url, { useNewUrlParser: true }, async function(err, db) {
    if (err) throw err;
    var mail_system_database = db.db("mail_system");
    const collection = mail_system_database.collection("user");
    await cb(collection);
    db.close();
  });
}
const insertUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    connect(userCollection => {
      userCollection.insertOne({ email, password }, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  });
};
const getUserList = () => {
  return new Promise((resolve, reject) => {
    connect(userCollection => {
      userCollection.find({}).toArray((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  });
};

const getUserByEmail = email => {
  return new Promise((resolve, reject) => {
    connect(userCollection => {
      userCollection.find({ email }).toArray((err, data) => {
        if (err) reject(err);
        if (data.length === 0) {
          resolve(null);
        } else {
          resolve(data[0]);
        }
      });
    });
  });
};

module.exports = {
  getUserByEmail,
  getUserList,
  insertUser
};
