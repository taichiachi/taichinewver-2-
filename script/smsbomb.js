const axios = require('axios');

module.exports.config = {
  name: 'send-sms',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['sendsms'],
  description: 'Send an SMS message',
  usage: 'send-sms [number] [message]',
  credits: 'taichi/jenard', //wag niyo tatanggalin!!!
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const number = args[0];
  const message = args.slice(1).join(' ');

  if (!number || !message) {
    api.sendMessage('Please provide a phone number and message.', event.threadID, event.messageID);
    return;
  }

  try {
    const { data } = await axios.get(`https://api-freesms.replit.app/send_sms?number=${encodeURIComponent(number)}&message=${encodeURIComponent(message)}`);
    const success = data.success;
    if (success) {
      api.sendMessage(`Message sent successfully to ${number}: ${message}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('Failed to send message. Please check the phone number and try again.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while sending the message.', event.threadID, event.messageID);
  }
};
