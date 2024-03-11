const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token from BotFather
const botToken = '6699051609:AAEmTyQ1B4G4EDFmynO5lh0lxsvXExHlAJg';
const chatId = '6747357233'; // Replace with the chat ID where you want to send the message

const bot = new TelegramBot(botToken, { polling: true });

let messageCount = 0;

// Function to retrieve the public IP address
async function getPublicIPAddress() {
  try {
    const response = await axios.get('https://api64.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error retrieving public IP address:', error.message);
    return null;
  }
}

// Function to send a message to the Telegram bot
async function sendMessage() {
  messageCount++;
  const publicIPAddress = await getPublicIPAddress();

  if (publicIPAddress) {
    const message = `Hello! This is message #${messageCount}. FROM Public IP: ${publicIPAddress}`;

    bot.sendMessage(chatId, message)
      .then(() => {
        console.log(`Message sent successfully - #${messageCount}. FROM Public IP: ${publicIPAddress}`);
      })
      .catch((error) => {
        console.error('Error sending message:', error.message);
      });
  } else {
    console.error('Unable to send message. Public IP address not available.');
  }
}

const millisecondsInterval = 500;
const jobInMilliseconds = setInterval(() => {
  sendMessage();
}, millisecondsInterval);

console.log('Telegram Bot is running. Press Ctrl+C to stop.');
