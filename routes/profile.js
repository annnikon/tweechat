var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('profile',{
    title:req.body.name+req.body.surname,
    language:req.body.language
  })
});

module.exports = router;
