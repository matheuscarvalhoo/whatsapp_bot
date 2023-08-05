const { Buttons } = require('whatsapp-web.js');

module.exports = async message => {
  let chat = await message.getChat();

  if (message.body === '!buttons') {
    console.log('!buttons triggered');
    let button = new Buttons('Button body', [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }], 'title', 'footer');
    client.reply(message.from, button);
  }

  if (message.body.startsWith('!')) {
    if (message.body === '!comm') {
      message.reply('WIP!\n\nTry using:\n*!prices*\n *!vapes*\n\nWIP!');
    } else if (message.body === '!vapes') {
      message.reply(require('./vapes'));
    } else if (message.body === '!prices') {
      message.reply(require('./prices.js'));
    }
  }
};
