const axios = require('axios');
let successCount = 0;

module.exports.config = {
    name: 'smsbomb',
    version: '1.0.0',
    role: 0,
    hasPrefix: true,
    aliases: ['smsbomb'],
    description: "sms spammer",
    usage: "[phone] [amount] [cooldown]",
    credits: 'taichi/jenard', //wag niyo tanggalin!!!
};

module.exports.run = async function ({ api, event, args }) {
    const [phone, amount, cooldown] = args;

    if (!phone || !amount || !cooldown) {
        return api.sendMessage('Please provide a phone number, amount, and cooldown period.', event.threadID, event.messageID);
    }

    api.sendMessage('Processing SMS bombing...', event.threadID, async (err, info) => {
        if (err) {
            console.error('Error processing SMS bombing:', err);
            return;
        }

        try {
            const response = await axios.get(`https://deku-rest-api-ywad.onrender.com/smsb`, {
                params: {
                    number: phone,
                    amount: amount,
                    delay: cooldown
                }
            });

            if (response.data.success) {
                successCount += parseInt(amount);
                api.sendMessage(`${successCount} success sent`, event.threadID, event.messageID);
            } else {
                api.sendMessage('Failed to start SMS bombing. Please try again later.', event.threadID, event.messageID);
            }
        } catch (error) {
            console.error('Error starting SMS bombing:', error);
            api.sendMessage('Error starting SMS bombing.', event.threadID, event.messageID);
        }
    });
};
