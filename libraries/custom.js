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
    if(description == false){
      message.channel.send('Your command was not accepted. If having troubles type: !help');
    }else{
      var embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Updated Sellers')
      .setDescription(description)
      .setTimestamp()
      .setFooter('Updated by BMBot Team');
      message.channel.send(embed);
    }
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
    if(description == false){
      message.channel.send('Your command was not accepted. If having troubles type: !help');
    }else{
      var embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Updated Buyer')
      .setDescription(description)
      .setTimestamp()
      .setFooter('Updated by BMBot Team');
      message.channel.send(embed);
    }
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
    if(description == false){
      message.channel.send('Your command was not accepted. If having troubles type: !help');
    }else{
      var embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Updated Cashout')
      .setDescription(description)
      .setTimestamp()
      .setFooter('Updated by BMBot Team');
      message.channel.send(embed);
    }
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
    if(description == false){
      message.channel.send('Your command was not accepted. If having troubles type: !help');
    }else{
      var embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Updated Scammers')
      .setDescription(description)
      .setTimestamp()
      .setFooter('Updated by BMBot Team');
      message.channel.send(embed);
    }
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
    if(description == false){
      message.channel.send('Your command was not accepted. If having troubles type: !help');
    }else{
      var embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Updated Exchanger')
      .setDescription(description)
      .setTimestamp()
      .setFooter('Updated by BMBot Team');
      message.channel.send(embed);
    }
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
    if(description == false){
      message.channel.send('Your command was not accepted. If having troubles type: !help');
    }else{
      var embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Updated Middlemen')
      .setDescription(description)
      .setTimestamp()
      .setFooter('Updated by BMBot Team');
      message.channel.send(embed);
    }
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

async function help(message, args){
  if(message.channel.id == admin_channel_id && message.member.roles.cache.find(role => role.name == admin_role)){
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Admin Commands')
    .addFields(
      { name: 'Add Sellers', value: '!sell | Discord: User#0001 | Robux: 3/1-5/1 | Payment Method: BTC/PP | Time Zone: UTC9\n\n!sell | Discord: User#0001 | Limiteds: 3/1-5/1 | Payment Method: BTC/PP | Time Zone: UTC9\n\n!sell | Discord: User#0001 | Robux: 1.5/1-5/1 |Limiteds: 3/1-5/1 | Payment Method: BTC/PP | Time Zone: UTC9\n\n' },
      { name: 'Remove Sellers', value: '!remove | seller | Discord: User#0001' },
      { name: 'Add Buyers', value: '!buy | Discord: User#0001 | Robux: 3/1-5/1 | Payment Method: BTC/PP | Time Zone: UTC9\n\n!buy | Discord: User#0001 | Limiteds: 3/1-5/1 | Payment Method: BTC/PP | Time Zone: UTC9\n\n!buy | Discord: User#0001 | Robux: 1.5/1-5/1 |Limiteds: 3/1-5/1 | Payment Method: BTC/PP | Time Zone: UTC9\n\n' },
      { name: 'Remove Buyers', value: '!buy | buyer | Discord: User#0001' },
      { name: 'Add Cashout', value: '!cashout | Discord: User#0001 | Rate: 1.4-1.5 | Payment Method: BTC/PayPal | Buying: Robux/Limiteds | Time Zone: EST' },
      { name: 'Remove Cashout', value: '!remove | cashout | Discord: User#0001' },
      { name: 'Add Scammers', value: '!scammers | ID: 1111111 | Discord: User#0001 | Description: Very bad man, scams a lot' },
      { name: 'Remove Scammers', value: '!remove | scammer | Discord: User#0001' },
      { name: 'Add Exchangers', value: '!exchange | Discord: User #0001 | Exchanging: PP to BTC to USD' },
      { name: 'Remove Exchangers', value: '!remove | exchanger | Discord: User#0001' },
      { name: 'Add Middlemen', value: '!middlemen | Discord: User #0001 | Server: .gg/mm' },
      { name: 'Remove Middlemen', value: '!remove | middleman | Discord: User #0001' },
    )
    .setTimestamp()
    .setFooter('Generated and maintained by BMBot Team');
    message.channel.send(embed);
  }else if(message.channel.id == command_channel_id){
    var embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Commands Help')
    .addFields(
      { name: 'View Sellers', value: '!sell' },
      { name: 'View Buyers', value: '!buy' },
      { name: 'View Cashout', value: '!cashout' },
      { name: 'View Scammers', value: '!scammers' },
      { name: 'View Support', value: '!support' },
      { name: 'View Exchangers', value: '!exchange' },
      { name: 'View Middlemen', value: '!middlemen' },
    )
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
        if(description == false){
          message.channel.send('Your command was not accepted. If having troubles type: !help');
        }else{
          var embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Updated Sellers')
          .setDescription(description)
          .setTimestamp()
          .setFooter('Updated by BMBot Team');
          message.channel.send(embed);
        }
        break;
      case 'buyer':
        var description = await edit.buyRemove(args);
        if(description == false){
          message.channel.send('Your command was not accepted. If having troubles type: !help');
        }else{
          var embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Updated Buyers')
          .setDescription(description)
          .setTimestamp()
          .setFooter('Updated by BMBot Team');
          message.channel.send(embed);
        }
        break;
      case 'cashout':
        var description = await edit.cashoutRemove(args);
        if(description == false){
          message.channel.send('Your command was not accepted. If having troubles type: !help');
        }else{
          var embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Updated Cashout')
          .setDescription(description)
          .setTimestamp()
          .setFooter('Updated by BMBot Team');
          message.channel.send(embed);
        }
        break;
      case 'scammer':
        var description = await edit.scammersRemove(args);
        if(description == false){
          message.channel.send('Your command was not accepted. If having troubles type: !help');
        }else{
          var embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Updated Scammers')
          .setDescription(description)
          .setTimestamp()
          .setFooter('Updated by BMBot Team');
          message.channel.send(embed);
        }
        break;
      case 'exchanger':
        var description = await edit.exchangeRemove(args);
        if(description == false){
          message.channel.send('Your command was not accepted. If having troubles type: !help');
        }else{
          var embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Updated Exchangers')
          .setDescription(description)
          .setTimestamp()
          .setFooter('Updated by BMBot Team');
          message.channel.send(embed);
        }
        break;
      case 'middleman':
        var description = await edit.mmRemove(args);
        if(description == false){
          message.channel.send('Your command was not accepted. If having troubles type: !help');
        }else{
          var embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Updated Middlemen')
          .setDescription(description)
          .setTimestamp()
          .setFooter('Updated by BMBot Team');
          message.channel.send(embed);
        }
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
  remove,
  help
}
