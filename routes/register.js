
var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

var multiparty = require('multiparty');
var fs = require('fs');

router.post("/",function(req,res,next){

    User.find({},function (err,data) {
        var user = new User();
        user.email=req.body.email;
        user.password=req.body.password;
        user._id='id'+data.length;
        req.session._id='id'+data.length;
        user.save(function (err,user) {
            if(err) console.log(err);
        });
        res.render('register',{
            title:"Tweechat | Registration",
            language:"Русский"
        })
    });

});

router.post("/finish",function (req,res,next) {
    var profileid;
    var form = new multiparty.Form();
    var path="../public/userphotos/";

    form.parse(req,function (err,fields,files) {
        var img = files.profile_photo[0];
        User.findOne({_id:req.session._id},function (err,user) {
            console.log(req.session._id);
            path+=req.session._id;

            fs.mkdir(path,function (err) {
                if(err) console.log(err);
            });

            fs.readFile(img.path,function (err,data) {
               path+="/"+img.originalFilename;
                fs.writeFile(path,data,function (err) {
                    if(err) console.log(err);
                });
            });
            user.profile_photo="/userphotos/"+req.session._id+"/"+img.originalFilename;
            user.name=fields.name;
            user.surname=fields.surname;
            user.country=fields.country;
            user.age=fields.age;
            user.gender=fields.gender;
            user.language=fields.lang;

            user.save(function (err,user) {
                if(err) console.log(err);
            });

        });
    });


    res.render('finish',{
        title:req.body.name+" "+req.body.surname,
        profile_url:"/",
        language:"Русский"
    })
})

module.exports=router;