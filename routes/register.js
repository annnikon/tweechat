
var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var user = new User();

router.post("/",function(req,res,next){

    user.email=req.body.email;
    user.password=req.body.password;
    
    user.save(function (err,user,affected) {
        if(err) console.log(err);
    });

    res.render('register',{
         title:"Tweechat | Registration",
         language:"Русский"
    })
});

router.post("/finish",function (req,res,next) {
    User.findOne({email:user.email},function (err,usr) {

        usr.name=req.body.name;
        usr.surname=req.body.surname;
        usr.country=req.body.country;
        usr.age=req.body.age;
        usr.gender=req.body.gender;
        usr.language=req.body.lang;

        usr.save(function (err,usr) {
            if(err) console.log(err);
        });

    });
    res.render('finish',{
        title:req.body.name+" "+req.body.surname,
        language:"Русский"
    })
})

module.exports=router;