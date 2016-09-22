
var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var user = new User();
var multiparty = require('multiparty');
var fs = require('fs');

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
    var profileid;
    var form = new multiparty.Form();
    var path="../tweechat/public/userphotos/";

    form.parse(req,function (err,fields,files) {
        var img = files.profile_photo[0];
        User.findOne({email:user.email},function (err,usr) {

            profileid=usr._id;

            path+=profileid;

            fs.mkdir(path,function (err) {
                if(err) console.log(err);
            });

            fs.readFile(img.path,function (err,data) {
               path+="/"+img.originalFilename;
                fs.writeFile(path,data,function (err) {
                    if(err) console.log(err);
                });
            });
            usr.profile_photo="/userphotos/"+profileid+"/"+img.originalFilename;
            usr.name=fields.name;
            usr.surname=fields.surname;
            usr.country=fields.country;
            usr.age=fields.age;
            usr.gender=fields.gender;
            usr.language=fields.lang;

            usr.save(function (err,usr) {
                if(err) console.log(err);
            });

        });
    });


    res.render('finish',{
        title:req.body.name+" "+req.body.surname,
        profile_url:"/profile/"+profileid,
        language:"Русский"
    })
})

module.exports=router;