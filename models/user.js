/**
 * Created by VladimirLiashyk on 15.09.16.
 */
var mongoose = require('../lib/mongoose'),
    Schema=mongoose.Schema;

var schema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:String,
    surname:String,
    country:String,
    age:String,
    gender:String,
    language:String,
    firends:[{
        friend_id:String
    }],
    profile_photo:{
        type:String,
        default:"/images/eclipse.png"
    }
});

exports.User = mongoose.model('User',schema);