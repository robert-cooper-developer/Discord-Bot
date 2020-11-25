// Global variables and libraries used
const Discord = require('discord.js');
const config = require('../config.json');
const edit = require('../libraries/edit.js');
const token = config.token;
const version = config.version;
const admin_role = config.admin_role;
const admin_channel_id = config.admin_channel_id;
const command_channel_id = config.command_channel_id;

async function sell(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    var description = await edit.sellAdd(args);
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Updated Sellers')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Updated by BMBot Team');
    message.channel.send(embed);
  }else if(message.channel.id == command_channel_id){
    var description = await edit.sellRead();
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Sellers')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }
}

async function buy(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    var description = await edit.buyAdd(args);
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Updated Buyer')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Updated by BMBot Team');
    message.channel.send(embed);
  }else if(message.channel.id == command_channel_id){
    var description = await edit.buyRead();
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Buyers')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }
}

async function cashout(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    var description = await edit.cashoutAdd(args);
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Updated Cashout')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Updated by BMBot Team');
    message.channel.send(embed);
  }else if(message.channel.id == command_channel_id){
    var description = await edit.cashoutRead();
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Cashout')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }
}

async function scammers(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    var description = await edit.scammersAdd(args);
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Updated Scammers')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Updated by BMBot Team');
    message.channel.send(embed);
  }else if(message.channel.id == command_channel_id){
    var description = await edit.scammersRead();
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Scammers')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }
}

async function exchange(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    var description = await edit.exchangeAdd(args);
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Updated Exchanger')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Updated by BMBot Team');
    message.channel.send(embed);
  }else if(message.channel.id == command_channel_id){
    var description = await edit.exchangeRead();
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Exchangers')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }
}

async function middlemen(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    var description = await edit.mmAdd(args);
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Updated Middlemen')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Updated by BMBot Team');
    message.channel.send(embed);
  }else if(message.channel.id == command_channel_id){
    var description = await edit.mmRead();
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Middlemen')
    .setDescription(description)
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }
}

async function remove(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    switch (args[1].trim()) {
      case 'seller':
        var description = await edit.sellRemove(args);
        var embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Updated Sellers')
        .setDescription(description)
        .setTimestamp()
        .setFooter('Updated by BMBot Team');
        message.channel.send(embed);
        break;
      case 'buyer':
        var description = await edit.buyRemove(args);
        var embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Updated Buyers')
        .setDescription(description)
        .setTimestamp()
        .setFooter('Updated by BMBot Team');
        message.channel.send(embed);
        break;
      case 'cashout':
        var description = await edit.cashoutRemove(args);
        var embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Updated Cashout')
        .setDescription(description)
        .setTimestamp()
        .setFooter('Updated by BMBot Team');
        message.channel.send(embed);
        break;
      case 'scammer':
        var description = await edit.scammersRemove(args);
        var embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Updated Scammers')
        .setDescription(description)
        .setTimestamp()
        .setFooter('Updated by BMBot Team');
        message.channel.send(embed);
        break;
      case 'exchanger':
        var description = await edit.exchangeRemove(args);
        var embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Updated Exchangers')
        .setDescription(description)
        .setTimestamp()
        .setFooter('Updated by BMBot Team');
        message.channel.send(embed);
        break;
      case 'middleman':
        var description = await edit.mmRemove(args);
        var embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Updated Middlemen')
        .setDescription(description)
        .setTimestamp()
        .setFooter('Updated by BMBot Team');
        message.channel.send(embed);
        break;
    }
  }
}

module.exports = {
  sell,
  buy,
  cashout,
  scammers,
  exchange,
  middlemen,
  remove
}
