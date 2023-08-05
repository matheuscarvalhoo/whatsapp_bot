const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth, ChatType, Buttons } = require('whatsapp-web.js');
const { STRIPE_API_KEY, SESSION_FILE_PATH } = require('./config');
const Stripe = require('stripe');
const stripe = Stripe(STRIPE_API_KEY);

// Check if there exists a previous session data, then load it to sessionData if so.
let sessionData = fs.existsSync(SESSION_FILE_PATH) ? require(SESSION_FILE_PATH) : null;

// Define client and calls Client() using sessionData as a value for {session} parameter
const client = new Client({
  session: sessionData,
  authStrategy: new LocalAuth()
});

// Save session file
client.on('authenticated', (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();

client.on('message', require('./messageHandler'));
