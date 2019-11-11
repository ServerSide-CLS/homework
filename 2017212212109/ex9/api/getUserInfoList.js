const userService = require('../services/userService');

function signIn(req, res) {
    userService.getUserInfoList().then(userInfoList => {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(userInfoList));
    });
}

module.exports = signIn;