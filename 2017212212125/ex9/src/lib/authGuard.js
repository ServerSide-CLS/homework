module.exports.authGuard = () => {
  return function(req, res, next) {
    const whiteList = [
      "/signup",
      "/javascripts",
      "/stylesheets",
      "/captcha",
      "/logout"
    ];
    const inWhiteList = whiteList.some(w => req.path.match(w));
    if (inWhiteList) {
      next();
    } else {
      if (!req.session.role || req.session.role === "guest") {
        req.session.role = "guest";
        if (req.path !== "/login") {
          res.redirect("/login");
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
