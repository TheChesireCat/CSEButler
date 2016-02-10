var token = '181307459:AAEsXdg9_GNTTEwyP_pZtGTKhXL6fCKne84'
var Bot = require('node-telegram-bot-api'),
    bot;
var BASE_URL = "https://csebutler.herokuapp.com"

if(process.env.NODE_ENV ==='production'){
  bot = new Bot(token);
  bot.setWebHook(BASE_URL + bot.token);
  console.log('WebHook :)');

} else {
  bot = new Bot(token,{polling:true});
  console.log('Polling :(');
}

console.log('bot server started...');

bot.onText(/^\/invite$/,function(msg){
  bot.sendMessage(msg.chat.id,'The invite link for this group is : https://telegram.me/joinchat/ACZESjxi8y7an1ZcAdpBpA').then(function(){});
});

module.exports = bot;
