const axios = require('axios');

module.exports.config = {
	name: "smsbomb",
	version: "1.0.0",
	credits: "taichi/jenard", //wag niyo tatanggalin!!!
	hasPrefix: true,
	role: 2,
	description: "sms spammer",
	aliases: [],
	usage: "[prompt]",
	cooldown: 5,
};

module.exports.run = async function ({ event, args, api }) {
	// Extract the parameters from args
	const number = args[0];
	const amount = args[1];
	const delay = args[2];

	if (!number || !amount || !delay) {
		return event.reply("Please provide a number, amount, and delay.");
	}

	try {
		event.reply("Processing your request...");

		let successCount = 0;
		for (let i = 0; i < amount; i++) {
			const response = await axios.get(`https://deku-rest-api-ywad.onrender.com/smsb`, {
				params: {
					number: encodeURIComponent(number),
					delay: encodeURIComponent(delay),
				}
			});
			if (response.data.success) {
				successCount++;
				event.reply(`${successCount} success sent`);
			} else {
				event.reply(`Failed to send SMS ${i + 1}`);
			}
			await new Promise(resolve => setTimeout(resolve, delay));
		}
		event.reply("All requests processed.");
	} catch (error) {
		console.error(error.message);
		event.reply("An error occurred while sending the request.");
	}
};
