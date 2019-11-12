const dbService = require('./dbService');

class UserService {
    async getUserInfoByEmail(userEmail) {
        const userInfo = dbService.findOne('users', { userEmail });
        return userInfo;
    }

    async addUser(userEmail, userPassword) {
        await dbService.update('users', { userEmail }, { userEmail, userPassword });
    }

    async getUserInfoList() {
        const userInfoList = dbService.find('users', {});
        return userInfoList;
    }
}

const userService = new UserService();
module.exports = userService;