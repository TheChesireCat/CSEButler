var token = '181307459:AAEsXdg9_GNTTEwyP_pZtGTKhXL6fCKne84'
var Bot = require('node-telegram-bot-api'),
    bot;
var BASE_URL = "https://csebutler.herokuapp.com"

if(process.env.NODE_ENV ==='production'){
  bot = new Bot(token);
  bot.setWebHook(BASE_URL + bot.token);
} else {
  bot = new Bot(token,{polling:true});
}

console.log('bot server started...');

bot.onText(/^\/invite-link$/,function(msg){
  bot.sendMessage(msg.chat.id,'invite link for this group is : https://telegram.me/joinchat/ACZESjxi8y7an1ZcAdpBpA').then(function(){});
});

module.exports = bot;
