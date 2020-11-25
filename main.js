// Global variables and libraries used
const Discord = require('discord.js');
const config = require('./config.json');
const token = config.token;
const version = config.version;
const admin_role = config.admin_role;
const admin_channel_id = config.admin_channel_id;
const PREFIX = '!';
const commands = require('./libraries/custom.js');
const bot = new Discord.Client();

// Confirmation to console that bot is running
bot.once('ready', () => {
  console.log("The bot is online.");
});

bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split("|");

  switch (args[0].trim()) {
    case 'sell':
      commands.sell(message, args);
      break;
    case 'buy':
      commands.buy(message, args);
      break;
    case 'cashout':
      commands.cashout(message, args);
      break;
    case 'scammers':
      commands.scammers(message, args);
      break;
    case 'support':
      message.channel.send('Join our Discord server and create a support ticket: https://discord.gg/ZB2ByE9wsC');
      break;
    case 'exchange':
      commands.exchange(message, args);
      break;
    case 'middlemen':
      commands.middlemen(message, args);
      break;
    case 'remove':
      commands.remove(message, args);
      break;
  }
});

bot.login(token);

// Function needed for various commands
function sell(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Sellers')
    .setDescription('Sellers\n\nSellers\n\nSellers')
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }
}
