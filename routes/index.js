var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index',
      { title: 'Welcome | Tweechat',
        language:'Русский'
      });
});

module.exports = router;
