const db = require("./db");

const signup = async (email, password) => {
  const user = db.getUserByEmail(email);
  if (user !== null) {
    await db.insertUser({ email, password });
    return true;
  } else {
    return false;
  }
};

const getUserList = async () => {
  return await db.getUserList();
};

const login = async (email, password) => {
  const user = await db.getUserByEmail(email);
  if (user !== null) {
    if (user.email === email && user.password === password) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  signup,
  getUserList,
  login
};