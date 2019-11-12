const fs = require("fs");
const path = require("path");
const users = require("../user.json");

const signup = (email, password) => {
  users[email] = password;
  fs.writeFile(
    path.resolve(__dirname, "../user.json"),
    JSON.stringify(users),
    err => {
      if (err) console.log(err);
      console.log("注册成功");
    }
  );
};

const getUserList = () => {
  let arr = [];
  for (let user in users) {
    arr.push(user);
  }
  return arr;
};
module.exports = {
  signup,
  getUserList
};
