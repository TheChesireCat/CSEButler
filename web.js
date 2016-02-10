var express = require('express');
var packageInfo = require('./package.json');
var bodyParser = require('body-parser');
var token = '181307459:AAEsXdg9_GNTTEwyP_pZtGTKhXL6fCKne84'

var app= express();

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.json({version : packageInfo.version});
});

var server = app.listen(process.env.PORT,function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s',host,port);
});

module.exports = function(bot){
  app.post('/' + token,function(req,res){
    console.log(req.body);
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
