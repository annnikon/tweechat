
var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var bodyParser = require('body-parser');

router.post("/register",function(req,res){
    var user = new User({
        email:"ksssk",
        password:"qwer"
    });
    console.log(req.body);
    // user.save(function (err,user,affected) {
    //     if(err) console.log(err);
    //
    // });
    User.findOne({email:"kk"},function (err,user) {
        console.log(user);
    })
    res.render('register',{
         language:"Hyu"

    })
});
module.exports=router;