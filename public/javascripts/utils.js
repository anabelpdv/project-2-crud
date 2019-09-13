
const utils = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login')
    }
  },
  
  checkRoles : function  (role) {
    return function(req, res, next) {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      } else {
        res.redirect('/login')
      }
    }
  }
}



module.exports = utils;