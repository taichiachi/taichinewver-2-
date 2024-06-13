const axios = require('axios');

module.exports.config = {
	name: "smsbomb",
	version: "1.0.0",
	credits: "taichi/jenard", //wag niyo tatanggalin!!!
	hasPrefix: true,
	role: 2,
	description: "sms spammer",
	aliases: [],
	usage: "[number] [amount] [delay]",
	cooldown: 5,
};

module.exports.run = async function ({ event, args, api }) {
	// Extract the parameters from args
	const number = args[0];
	const amount = parseInt(args[1], 10);
	const delay = parseInt(args[2], 10);

	if (!number || isNaN(amount) || isNaN(delay)) {
		return api.sendMessage("Please provide a valid number, amount, and delay.", event.threadID);
	}

	try {
		api.sendMessage("Processing your request...", event.threadID);

		let successCount = 0;
		for (let i = 0; i < amount; i++) {
			try {
				const response = await axios.get(`https://deku-rest-api-ywad.onrender.com/smsb`, {
					params: {
						number: encodeURIComponent(number),
						delay: encodeURIComponent(delay),
					}
				});
				if (response.data.success) {
					successCount++;
					api.sendMessage(`${successCount} success sent`, event.threadID);
				} else {
					api.sendMessage(`Failed to send SMS ${i + 1}`, event.threadID);
				}
			} catch (error) {
				console.error(error.message);
				api.sendMessage(`An error occurred while sending SMS ${i + 1}`, event.threadID);
			}
			await new Promise(resolve => setTimeout(resolve, delay));
		}
		api.sendMessage("All requests processed.", event.threadID);
	} catch (error) {
		console.error(error.message);
		api.sendMessage("An error occurred while sending the request.", event.threadID);
	}
};
