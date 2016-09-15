/**
 * Created by VladimirLiashyk on 15.09.16.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tweechat');

mongoose.Promise = global.Promise;
module.exports=mongoose;
