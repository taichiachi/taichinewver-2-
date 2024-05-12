const axios = require('axios');
module.exports.config = {
	name: 'token',
	version: '1.1.0',
	hasPermssion: 0,
	credits: 'Greegmon',
	description: 'Facebook token getter',
	usePrefix: true,
	allowPrefix: true,
	commandCategory: 'others',
	usages: '[username] | [password]',
	cooldowns: 5,
};
module.exports.run = async function ({ api, event, args, box }) {
	const input = args.join(' ');
	const [u,p] = input.split('|').map(part => part.trim())
	if (!box) {
		return api.sendMessage(`Unsupported.`, event.threadID);
	}
	try {
		if (!input) {
			box.reply('Please provide a username & password');
			box.react('❓');
		} else {
			box.reply(`Fetching access token...`);
			box.react('🕙');
			const res = await axios.get(`https://Greepi.onrender.com/token?username=${u}&password=${p}`);
			const token = res.data.response;
			if(token.includes('Error')){
				box.react('⚠️');
				return api.sendMessage(`⚠️ error while generating your access token`,event.threadID,event.messageID);
			}
			box.react('✅');
			return api.sendMessage(`[ ACCESS TOKEN ]\n𝗘𝗔𝗔𝗔𝗔𝗨: ${token[0]}\n\n𝗘𝗔𝗔𝗗𝗬𝗣: ${token[1]}\n\n𝗘𝗔𝗔𝗚𝗡𝗢: ${token[2]}`, event.threadID, event.messageID)
		}
	} catch (error) {
		box.reply('⚠️ Something went wrong: ' + error);
		box.react('⚠️');
	}
};
