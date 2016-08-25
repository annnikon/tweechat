var express = require('express'),
	app=express(),
	http=require('http').createServer(app);
	io=require('socket.io')(http)
http.listen('3000');

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	res.send('First');
});	