var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

router.get('/', function(req, res, next) {
    if(req.session.name==null){
      res.render('index',
          { title: 'Welcome | Tweechat',
            language:'Русский'
          });
    }
    else{
       res.redirect('/profile'+req.session._id+'/news');
    }
});

router.get('/logout',function (req,res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/:id/:con',function (req,res) {
    if(req.session.name!=null){
        if(req.session._id==req.params.id){
            User.findOne({_id:req.session._id},function (err,user) {
                res.render('profile',{
                    title: ""+ req.session.name + " " +req.session.surname,
                    name:req.session.name,
                    surname:req.session.surname,
                    profile_photo:req.session.profile_photo,
                    s_profile_photo:req.session.profile_photo,
                    language:req.session.language,
                    s_name:req.session.name,
                    s_id:req.session._id,
                    myprofile:true,
                    id:req.session._id,
                    req_users:user.friends_requests,
                    friends:user.friends,
                    content:req.params.con
                });
            });

        }else {
            User.findOne({_id:req.params.id},function (err,user) {
                if(err) res.send(err);
                if(user!=null){
                    User.findOne({_id:req.session._id,'friends.$.id':req.body.id},function (err,data) {
                        if(err)console.log(err);
                        if(data!=null){
                            console.log(data)
                            res.render('profile',{
                                title: ""+user.name+" "+user.surname,
                                name:user.name,
                                surname:user.surname,
                                profile_photo:user.profile_photo,
                                s_profile_photo:req.session.profile_photo,
                                language:req.session.language,
                                s_name:req.session.name,
                                s_id:req.session._id,
                                myprofile:false,
                                isFriend:"yes",
                                id:req.params.id,
                                req_users:[],
                                content:req.params.con
                            })
                        }
                        else
                        {
                            User.findOne({_id:req.session._id,'added_friends.$.id':req.body.id},function (err,data) {
                                var isFriend;
                                if(data!=null){
                                    isFriend="added";

                                }
                                else {
                                    isFriend="no";

                                }
                                res.render('profile',{
                                    title: ""+user.name+" "+user.surname,
                                    name:user.name,
                                    surname:user.surname,
                                    profile_photo:user.profile_photo,
                                    s_profile_photo:req.session.profile_photo,
                                    language:req.session.language,
                                    s_name:req.session.name,
                                    s_id:req.session._id,
                                    myprofile:false,
                                    isFriend:isFriend,
                                    id:req.params.id,
                                    req_users:[],
                                    content:req.params.con
                                })
                            })
                        }
                    });
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
                res.redirect('/'+req.session._id+'/news');
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

router.post('/add',function (req,res) {
    User.findOne({_id:req.body.id},function (err,user) {
        if(err)console.log(err);
        var data={
            name:req.session.name,
            surname:req.session.surname,
            profile_photo:req.session.profile_photo,
            _id:req.session._id
        };
        user.friends_requests[user.friends_requests.length]=data;
        user.save(function (err,user) {
            if(err)console.log(err);
            User.findOne({_id:req.session._id},function (err,user) {
                var data={id:req.body.id}
                user.added_friends[user.added_friends.length]=data;
                user.save(function (err,user) {
                    if(err)console.log(err);
                })
            })
        })
    });
    res.json({isAdded:true});
});

router.post('/accept',function (req,res) {
    User.findOne({_id:req.body.id},function (err,user) {
        var data={
            name:user.name,
            surname:user.surname,
            id:user._id,
            profile_photo:user.profile_photo
        };

        User.findOne({_id:req.session._id},{friends:1,name:1,surname:1,profile_photo:1,_id:1},function (err,user) {
            user.friends[user.friends.length]=data;
            var s_data={
                name:user.name,
                surname:user.surname,
                profile_photo:user.profile_photo,
                id:req.session._id
            };
            User.update({_id:req.body.id},{$push:{friends:s_data}},function (err) {
                if(err)console.log(err);
            });
            User.update({_id:req.session._id},{$pull:{friends_requests:{_id:req.body.id}}},function (err) {
                if(err)console.log(err);
            });
            User.update({_id:req.body.id},{$pull:{added_friends:{id:req.session._id}}},function (err) {
                if(err)console.log(err);
            });
            user.save(function (err,user) {
                if(err)console.log(err);
            })
        });
    });
    res.json({isAdded:"true"});
});

router.post('/deletefriend',function (req,res) {
    User.update({_id:req.session._id},{$pull:{friends:{id:req.body.id}}},function (err) {
        if(err) res.json({result:"false"});
        User.update({_id:req.body.id},{$pull:{friends:{id:req.session._id}}},function (err) {
           if(err) res.json({result:"false"});
            res.json({result:"true"});
        });
    });
});
router.get('/about', function (reg, res) {
    res.render('about', {})
})
router.get('/settings', function (reg, res) {
    res.render('settings', {})
})
module.exports = router;
