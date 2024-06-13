const axios = require('axios');

module.exports.config = {
	name: "smsbomb",
	version: "1.0.0",
	credits: "taichi/jenard", //wag niyo tatanggalin!!!
	hasPrefix: false,
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
		const response = await axios.get(`https://deku-rest-api-ywad.onrender.com/smsb`, {
			params: {
				number: encodeURIComponent(number),
				amount: encodeURIComponent(amount),
				delay: encodeURIComponent(delay),
			}
		});
		event.reply(response.data);
	} catch (error) {
		console.error(error.message);
		event.reply("An error occurred while sending the request.");
	}
};
