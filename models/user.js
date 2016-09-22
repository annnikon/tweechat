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
        profile_photo:{
            type:String
        },
        name:{
            type:String
        },
        surname:{
            type:String
        },
        id:{
            type:String
        }
    }],
    profile_photo:{
        type:String,
        default:"/images/eclipse.png"
    },
    friends_requests:[{
        profile_photo:{
            type:String
        },
        name:{
            type:String
        },
        surname:{
            type:String
        },
        id:{
            type:String
        }
    }],
    added_friends:[{
        id:{
            type:String
        }
    }]
});

exports.User = mongoose.model('User',schema);