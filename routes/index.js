const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/home', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
