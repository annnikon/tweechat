var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.name==null){
      res.render('index',
          { title: 'Welcome | Tweechat',
            language:'Русский'
          });
    }
    else{
       res.redirect('/profile');
    }
});
router.get('/logout',function (req,res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
