var express = require('express');
var app= express();

var packageInfo = require('./package.json');
var bodyParser = require('body-parser');

var token = '181307459:AAE5vJaFSWKTxtCo33HkYgnRm5GSAb1gRvI'
var Bot = require('node-telegram-bot-api'),
    bot;
var BASE_URL = "https://csebutler.herokuapp.com/"
var track={};
var app= express();

if(process.env.NODE_ENV ==='production'){
  bot = new Bot(token);
  bot.setWebHook(BASE_URL + token);
  console.log('WebHook :)');

} else {
  bot = new Bot(token,{polling:true});
  console.log('Polling :)');
}

console.log('bot server started...');

bot.onText(/^\/invite.*$/,function(msg){
    if(track[msg.chat.id == undefined]){
      bot.sendMessage(msg.chat.id,'Hey '+msg.from.first_name+'! the invite link for the CSE supergroup is : https://telegram.me/joinchat/ACZESjxi8y7an1ZcAdpBpA').then(function(){});
      track[msg.chat.id]=0;
  } else if (track[msg.chat.id]>0) {
    bot.sendMessage(msg.chat.id,'Hey '+msg.from.first_name+'! you probably didn\'t see the link, please scroll up a bit.').then(function(){});
  } else if(track[msg.chat.id]==0){
    bot.sendMessage(msg.chat.id,'Hey '+msg.from.first_name+'! the invite link for the CSE supergroup is : https://telegram.me/joinchat/ACZESjxi8y7an1ZcAdpBpA').then(function(){});
  }
});

bot.on('message',function(msg){
  var chatId = msg.chat.id;
  track[chatId] = (track[chatId]+1)%10;
});

var server = app.listen(process.env.PORT,function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s',host,port);
});

app.use(bodyParser.json());
app.get('/',function(req,res){
  console.log("get request!")
  res.json({name: packageInfo.name, version : packageInfo.version});
});
app.post('/' + token,function(req,res){
  console.log(req.body);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
