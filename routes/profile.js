var express = require('express');
var router = express.Router();
var User = require('../models/user').User;



router.get('/:id',function (req,res) {
  if(req.session.name!=null){
    if(req.session._id==req.params.id){
      res.render('profile',{
        title: "TC | "+ req.session.name + " " +req.session.surname,
        name:req.session.name,
        surname:req.session.surname,
        profile_photo:req.session.profile_photo,
        language:req.session.language,
        s_name:req.session.name,
        s_id:req.session._id
      });
    }else {
      User.findOne({_id:req.params.id},function (err,user) {
        if(err) res.send(err);
        if(user!=null){
          res.render('profile',{
            title: "TC | "+user.name+" "+user.surname,
            name:user.name,
            surname:user.surname,
            profile_photo:user.profile_photo,
            language:req.session.language,
            s_name:req.session.name,
            s_id:req.session._id
          })
        }
        else {
          res.send("no such user");
        }
      })
    }
  }else{
    res.redirect('/');
  }
});

router.post('/login',function (req,res) {
  User.findOne({email:req.body.email},function (err,user) {
    if(err) res.send('Error in db');
    if(user.email!=null){
      if(user.password==req.body.password){
        req.session.name=user.name;
        req.session.surname=user.surname;
        req.session.profile_photo=user.profile_photo;
        req.session.language=user.language;
        req.session._id=user._id;
        res.redirect('/profile/'+req.session._id);
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
