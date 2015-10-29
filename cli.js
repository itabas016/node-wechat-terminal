"use strict"

var readline = require('readline');
var WechatClient = require('./lib/wechat_client');
var logger = require('./lib/logger');

var wechat = new WechatClient();
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

wechat.on('err', () => { rl.close(); });
wechat.on('chat_change', (chat) => { updatePrompt(wechat.user); });

wechat.on('logout', function() {
  logger.info('Logout.');
  rl.close();
});

wechat.on('login', function(user) {
  logger.info('Login successfully.');

  updatePrompt(user);
  rl.prompt();

  rl.on('line', function(msg) {
    var cmd = parseCmd(msg);
    if (cmd) {

    }

    rl.prompt();
  }).on('SIGINT', function() {
    rl.question('Are you sure you want to exit?(y/N)', function(answer) {
      if (answer.match(/^y(es)?$/i)) {
        rl.close();
      } else {
        rl.prompt();
      }
    });
  });
});

wechat.login();

function updatePrompt(user) {
  var name = user.NickName || '';
  var chat = user.chat || '';
  rl.setPrompt(((name + chat) || 'wechat') + '> ');
}

function parseCmd(cmd) {
}
