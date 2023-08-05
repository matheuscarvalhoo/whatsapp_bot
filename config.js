// Import environment variables
require('dotenv').config();

module.exports = {
  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
  SESSION_FILE_PATH: './session.json'
};