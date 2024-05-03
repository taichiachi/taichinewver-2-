const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'taichi',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "An AI command powered by Hercai",
  usage: "hercai [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Hello I'm Taichi. How can i help you?`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 Taichi is composing your response! Please wait....`, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
