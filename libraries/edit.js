const csv = require('csv-parser');
const fs = require('fs');

// SELLER FUNCTIONS
async function sellAdd(args) {
  var discord = "";
  var limiteds = "0";
  var limiteds_rate = "";
  var robux = "0";
  var robux_rate = "";
  var payment = "";
  var timezone = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }else if(split[0].trim() == "Limiteds"){
        limiteds = "1";
        limiteds_rate = split[1].trim();
      }else if(split[0].trim() == "Robux"){
        robux = "1";
        robux_rate = split[1].trim();
      }else if(split[0].trim() == "Payment Method"){
        payment = split[1].trim();
      }else if(split[0].trim() == "Time Zone"){
        timezone = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == "" || payment == "" || timezone == "" || (limiteds == "" && robux == "")){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/sell.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        values.push(row);
        var str = `Discord: ${row.Discord} |`;

        if(row.Robux != 0){
          str += ` Buying: Robux | Robux Rate: ${row.RobuxRate} |`;
        }

        if(row.Limiteds != 0){
          str += ` Buying: Limiteds | Limiteds Rate: ${row.LimitedsRate} |`;
        }

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Add new
  var str = `Discord: ${discord} |`;
  if(robux != 0){str += ` Selling: Robux | Robux Rate: ${robux_rate} |`;}
  if(limiteds != 0){str += ` Selling: Limiteds | Limiteds Rate: ${limiteds_rate} |`;}
  str += ` Payment Method:  ${payment} | Time Zone: ${timezone} \n\n`;
  full = full.concat(str);

  var new_ob = {
    Discord: discord,
    Limiteds: limiteds,
    LimitedsRate: limiteds_rate,
    Robux: robux,
    RobuxRate: robux_rate,
    Payment: payment,
    Timezone: timezone
  };

  values.push(new_ob);

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/sell.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Limiteds', title: 'Limiteds'},
      {id: 'LimitedsRate', title: 'LimitedsRate'},
      {id: 'Robux', title: 'Robux'},
      {id: 'RobuxRate', title: 'RobuxRate'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'},
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

async function sellRead() {
  var full = "";
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/sell.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        var str = `Discord: ${row.Discord} |`;

        if(row.Robux != 0){
          str += ` Selling: Robux | Robux Rate: ${row.RobuxRate} |`;
        }

        if(row.Limiteds != 0){
          str += ` Selling: Limiteds | Limiteds Rate: ${row.LimitedsRate} |`;
        }

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;
        full = full.concat(str);
      })
      .on('end', function(){
        return resolve(full)
      });
  });

  await reading;

  return reading;
}

async function sellRemove(args) {
  var discord = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/sell.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Discord != discord){
          values.push(row);
          var str = `Discord: ${row.Discord} |`;

          if(row.Robux != 0){
            str += ` Selling: Robux | Robux Rate: ${row.RobuxRate} |`;
          }

          if(row.Limiteds != 0){
            str += ` Selling: Limiteds | Limiteds Rate: ${row.LimitedsRate} |`;
          }

          str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

          full = full.concat(str);
        }
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/sell.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Limiteds', title: 'Limiteds'},
      {id: 'LimitedsRate', title: 'LimitedsRate'},
      {id: 'Robux', title: 'Robux'},
      {id: 'RobuxRate', title: 'RobuxRate'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'},
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

// BUYER FUNCTIONS
async function buyAdd(args) {
  var discord = "";
  var limiteds = "0";
  var limiteds_rate = "";
  var robux = "0";
  var robux_rate = "";
  var payment = "";
  var timezone = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }else if(split[0].trim() == "Limiteds"){
        limiteds = "1";
        limiteds_rate = split[1].trim();
      }else if(split[0].trim() == "Robux"){
        robux = "1";
        robux_rate = split[1].trim();
      }else if(split[0].trim() == "Payment Method"){
        payment = split[1].trim();
      }else if(split[0].trim() == "Time Zone"){
        timezone = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == "" || payment == "" || timezone == "" || (limiteds == "" && robux == "")){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/buy.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        values.push(row);
        var str = `Discord: ${row.Discord} |`;

        if(row.Robux != 0){
          str += ` Buying: Robux | Robux Rate: ${row.RobuxRate} |`;
        }

        if(row.Limiteds != 0){
          str += ` Buying: Limiteds | Limiteds Rate: ${row.LimitedsRate} |`;
        }

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Add new
  var str = `Discord: ${discord} |`;
  if(robux != 0){str += ` Buying: Robux | Robux Rate: ${robux_rate} |`;}
  if(limiteds != 0){str += ` Buying: Limiteds | Limiteds Rate: ${limiteds_rate} |`;}
  str += ` Payment Method:  ${payment} | Time Zone: ${timezone} \n\n`;
  full = full.concat(str);

  var new_ob = {
    Discord: discord,
    Limiteds: limiteds,
    LimitedsRate: limiteds_rate,
    Robux: robux,
    RobuxRate: robux_rate,
    Payment: payment,
    Timezone: timezone
  };

  values.push(new_ob);

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/buy.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Limiteds', title: 'Limiteds'},
      {id: 'LimitedsRate', title: 'LimitedsRate'},
      {id: 'Robux', title: 'Robux'},
      {id: 'RobuxRate', title: 'RobuxRate'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'},
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

async function buyRead() {
  var full = "";
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/buy.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        var str = `Discord: ${row.Discord} |`;

        if(row.Robux != 0){
          str += ` Buying: Robux | Robux Rate: ${row.RobuxRate} |`;
        }

        if(row.Limiteds != 0){
          str += ` Buying: Limiteds | Limiteds Rate: ${row.LimitedsRate} |`;
        }

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;
        full = full.concat(str);
      })
      .on('end', function(){
        return resolve(full)
      });
  });

  await reading;

  return reading;
}

async function buyRemove(args) {
  var discord = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/buy.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Discord != discord){
          values.push(row);
          var str = `Discord: ${row.Discord} |`;

          if(row.Robux != 0){
            str += ` Buying: Robux | Robux Rate: ${row.RobuxRate} |`;
          }

          if(row.Limiteds != 0){
            str += ` Buying: Limiteds | Limiteds Rate: ${row.LimitedsRate} |`;
          }

          str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

          full = full.concat(str);
        }
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/buy.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Limiteds', title: 'Limiteds'},
      {id: 'LimitedsRate', title: 'LimitedsRate'},
      {id: 'Robux', title: 'Robux'},
      {id: 'RobuxRate', title: 'RobuxRate'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'},
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

// CASHOUT FUNCTIONS
async function cashoutAdd(args) {
  var discord = "";
  var rate = "";
  var buying = "";
  var payment = "";
  var timezone = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }else if(split[0].trim() == "Rate"){
        rate = split[1].trim();
      }else if(split[0].trim() == "Buying"){
        buying = split[1].trim();
      }else if(split[0].trim() == "Payment Method"){
        payment = split[1].trim();
      }else if(split[0].trim() == "Time Zone"){
        timezone = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == "" || payment == "" || timezone == "" || buying == "" || rate == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/cashout.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        values.push(row);
        var str = `Discord: ${row.Discord} |`;

        str += ` Buying: ${row.Buying} | Rate: ${row.Rate} |`;

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Add new
  var str = `Discord: ${discord} |`;
  str += ` Buying: ${buying} | Rate: ${rate} |`;
  str += ` Payment Method:  ${payment} | Time Zone: ${timezone} \n\n`;
  full = full.concat(str);

  var new_ob = {
    Discord: discord,
    Rate: rate,
    Buying: buying,
    Payment: payment,
    Timezone: timezone
  };

  values.push(new_ob);

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/cashout.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Rate', title: 'Rate'},
      {id: 'Buying', title: 'Buying'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

async function cashoutRead() {
  var full = "";
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/cashout.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        var str = `Discord: ${row.Discord} |`;

        str += ` Buying: ${row.Buying} | Rate: ${row.Rate} |`;

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve(full)
      });
  });

  await reading;

  return reading;
}

async function cashoutRemove(args) {
  var discord = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/cashout.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Discord != discord){
          values.push(row);
          var str = `Discord: ${row.Discord} |`;

          str += ` Buying: ${row.Buying} | Rate: ${row.Rate} |`;

          str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

          full = full.concat(str);
        }
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/cashout.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Rate', title: 'Rate'},
      {id: 'Buying', title: 'Buying'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

// CASHOUT FUNCTIONS
async function cashoutAdd(args) {
  var discord = "";
  var rate = "";
  var buying = "";
  var payment = "";
  var timezone = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }else if(split[0].trim() == "Rate"){
        rate = split[1].trim();
      }else if(split[0].trim() == "Buying"){
        buying = split[1].trim();
      }else if(split[0].trim() == "Payment Method"){
        payment = split[1].trim();
      }else if(split[0].trim() == "Time Zone"){
        timezone = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == "" || payment == "" || timezone == "" || buying == "" || rate == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/cashout.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        values.push(row);
        var str = `Discord: ${row.Discord} |`;

        str += ` Buying: ${row.Buying} | Rate: ${row.Rate} |`;

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Add new
  var str = `Discord: ${discord} |`;
  str += ` Buying: ${buying} | Rate: ${rate} |`;
  str += ` Payment Method:  ${payment} | Time Zone: ${timezone} \n\n`;
  full = full.concat(str);

  var new_ob = {
    Discord: discord,
    Rate: rate,
    Buying: buying,
    Payment: payment,
    Timezone: timezone
  };

  values.push(new_ob);

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/cashout.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Rate', title: 'Rate'},
      {id: 'Buying', title: 'Buying'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

async function cashoutRead() {
  var full = "";
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/cashout.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        var str = `Discord: ${row.Discord} |`;

        str += ` Buying: ${row.Buying} | Rate: ${row.Rate} |`;

        str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve(full)
      });
  });

  await reading;

  return reading;
}

async function cashoutRemove(args) {
  var discord = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/cashout.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Discord != discord){
          values.push(row);
          var str = `Discord: ${row.Discord} |`;

          str += ` Buying: ${row.Buying} | Rate: ${row.Rate} |`;

          str += ` Payment Method:  ${row.Payment} | Time Zone: ${row.Timezone} \n\n`;

          full = full.concat(str);
        }
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/cashout.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Rate', title: 'Rate'},
      {id: 'Buying', title: 'Buying'},
      {id: 'Payment', title: 'Payment'},
      {id: 'Timezone', title: 'Timezone'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

// SCAMMERS FUNCTIONS
async function scammersAdd(args) {
  var discord = "";
  var discord_id = "";
  var description = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }else if(split[0].trim() == "ID"){
        discord_id = split[1].trim();
      }else if(split[0].trim() == "Description"){
        description = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == "" || discord_id == "" || description == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/scammers.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        values.push(row);
        var str = `Discord: ${row.Discord} |`;

        str += ` ${row.ID} |`;

        str += ` ${row.Description}\n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Add new
  var str = `Discord: ${discord} |`;
  str += ` ${discord_id} |`;
  str += ` ${description}\n\n`;
  full = full.concat(str);

  var new_ob = {
    Discord: discord,
    ID: discord_id,
    Description: description
  };

  values.push(new_ob);

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/scammers.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'ID', title: 'ID'},
      {id: 'Description', title: 'Description'},
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

async function scammersRead() {
  var full = "";
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/scammers.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        var str = `Discord: ${row.Discord} |`;

        str += ` ${row.ID} |`;

        str += ` ${row.Description}\n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve(full)
      });
  });

  await reading;

  return reading;
}

async function scammersRemove(args) {
  var discord = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/scammers.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Discord != discord){
          values.push(row);
          var str = `Discord: ${row.Discord} |`;

          str += ` ${row.ID} |`;

          str += ` ${row.Description}\n\n`;

          full = full.concat(str);
        }
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/scammers.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'ID', title: 'ID'},
      {id: 'Description', title: 'Description'},
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

// EXCHANGER FUNCTIONS
async function exchangeAdd(args) {
  var discord = "";
  var exchanging = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }else if(split[0].trim() == "Exchanging"){
        exchanging = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == "" || exchanging == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/exchange.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        values.push(row);
        var str = `Discord: ${row.Discord} |`;

        str += ` Exchanging: ${row.Exchange} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Add new
  var str = `Discord: ${discord} |`;
  str += ` Exchanging: ${exchanging} \n\n`;
  full = full.concat(str);

  var new_ob = {
    Discord: discord,
    Exchange: exchanging
  };

  values.push(new_ob);

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/exchange.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Exchange', title: 'Exchange'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

async function exchangeRead() {
  var full = "";
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/exchange.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        var str = `Discord: ${row.Discord} |`;

        str += ` Exchanging: ${row.Exchange} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve(full)
      });
  });

  await reading;

  return reading;
}

async function exchangeRemove(args) {
  var discord = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/exchange.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Discord != discord){
          values.push(row);
          var str = `Discord: ${row.Discord} |`;

          str += ` Exchanging: ${row.Exchange} \n\n`;

          full = full.concat(str);
        }
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/exchange.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Exchange', title: 'Exchange'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

// MM FUNCTIONS
async function mmAdd(args) {
  var discord = "";
  var server = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }else if(split[0].trim() == "Server"){
        server = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == "" || server == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/mm.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        values.push(row);
        var str = `Discord: ${row.Discord} |`;

        str += ` Server: ${row.Server} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Add new
  var str = `Discord: ${discord} |`;
  str += ` Server: ${server} \n\n`;
  full = full.concat(str);

  var new_ob = {
    Discord: discord,
    Server: server
  };

  values.push(new_ob);

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/exchange.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Server', title: 'Server'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

async function mmRead() {
  var full = "";
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/mm.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        var str = `Discord: ${row.Discord} |`;

        str += ` Server: ${row.Server} \n\n`;

        full = full.concat(str);
      })
      .on('end', function(){
        return resolve(full)
      });
  });

  await reading;

  return reading;
}

async function mmRemove(args) {
  var discord = "";

  // Update all the variables
  args.forEach(function(arg) {
    var split = arg.split(":");
    if(split.length > 1){
      if(split[0].trim() == "Discord"){
        discord = split[1].trim();
      }
    }
  });

  // Make sure the minimal variables are there
  if(discord == ""){
    return false;
  }

  // Read all values currently from file
  var full = "";
  var values = [];
  var reading = new Promise(function(resolve, reject) {
    fs.createReadStream('./storage/mm.csv')
      .on('error', reject)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Discord != discord){
          values.push(row);
          var str = `Discord: ${row.Discord} |`;

          str += ` Server: ${row.Server} \n\n`;

          full = full.concat(str);
        }
      })
      .on('end', function(){
        return resolve([full, values])
      });
  });

  await reading;

  // Write new document with new person included
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './storage/mm.csv',
    header: [
      {id: 'Discord', title: 'Discord'},
      {id: 'Server', title: 'Server'}
    ]
  });

  csvWriter
    .writeRecords(values)
    .then(()=> console.log('Storage successfully updated.'));

  return full;
}

module.exports = {
  sellAdd,
  sellRead,
  sellRemove,
  buyAdd,
  buyRead,
  buyRemove,
  cashoutAdd,
  cashoutRead,
  cashoutRemove,
  scammersAdd,
  scammersRead,
  scammersRemove,
  exchangeAdd,
  exchangeRead,
  exchangeRemove,
  mmAdd,
  mmRead,
  mmRemove,
}
