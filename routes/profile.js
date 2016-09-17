var express = require('express');
var router = express.Router();
var User = require('../models/user').User;


router.get('/', function(req, res) {
  res.render('profile',{
    title: "Tweechat | Profile",
    name:req.session.name,
    surname:req.session.surname,
    language:req.session.language
  })
});


router.post('/login',function (req,res) {
  User.findOne({email:req.body.email},function (err,user) {
    if(err) res.send('Error in db');
    if(user.email!=null){
      if(user.password==req.body.password){
        req.session.name=user.name;
        req.session.surname=user.surname;
        req.session.language=user.language;
        res.redirect('/profile');
      }
      else{
        res.send("Incorrect password");
      }
    }
    else {
      res.send("Wrong users email");
    }
  })
});

module.exports = router;
