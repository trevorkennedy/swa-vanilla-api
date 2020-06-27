const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

async function readFile(path) {
  // Recommended file read pattern
  let data;
  try {
      data = await readFileAsync(path);
  } catch (err) {
      context.log.error('ERROR', err);
      throw err;
  }
  return data;
}

function buildBody(body) {
  var message = {
    content: [{
        type: 'text/plain',
        value: body
    }]
  };

  return message;
}

module.exports = async function (context, req) {
  var msg = 'JavaScript HTTP trigger function request\n';
  msg += `Time: ${new Date().toISOString()}\n`;
  msg += `Runtime: ${process.env['FUNCTIONS_WORKER_RUNTIME']}\n`;
  msg += `Time Zone: ${process.env['WEBSITE_TIME_ZONE']}\n`;
  msg += `Hostname: ${process.env.WEBSITE_HOSTNAME}\n`;
  msg += `Environment: ${process.env['AZURE_FUNCTIONS_ENVIRONMENT']}\n`;
  msg += `Custom Value: ${process.env['CUSTOM_VALUE']}\n`;
  msg += `Request Body: ${req.body}\n`;
  msg += `Query Param: ${req.query.redirectUrl}\n`;
  msg += `Context biding: ${context.bindingData.id}\n`;
  msg += `File Contents: ${await readFile('./hello.txt')}\n`;
  
  context.log(msg);
  //context.bindings.sendGrid = buildBody(msg);
  context.res = {body: {text: msg}};
};