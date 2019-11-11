module.exports.authGuard = () => {
  return function(req, res, next) {
    const whiteList = ["/login", "/javascripts", "/stylesheets", "/captcha"];//白名单访问该信息无需登录
    const inWhiteList = whiteList.some(w => req.path.match(w));
    if (inWhiteList) {
      next();
    } else {
      if (!req.session.role || req.session.role === "guest") {
        req.session.role = "guest";//未注册
        if (req.path !== "/signup") {
          res.redirect("/signup");
        } else {
          next();
        }
      } else if (req.session.role === "master") {
        if (req.path === "/signup") {
          res.redirect("/");
        } else {
          next();
        }
      } else {
        next();
      }
    }
  };
};
