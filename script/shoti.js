module.exports.config = {
  name: "shoti",
  version: "1.0.0",
  credits: "shoti-api",
  description: "Generate random tiktok girl videos",
  hasPermssion: 0,
  commandCategory: "other",
  usage: "[shoti]",
  cooldowns: 5,
  dependencies: [],
  usePrefix: true,
};

module.exports.run = async function ({ api, event }) {
  try {
    api.sendMessage(`⏱️ | Sending Shoti Please Wait...`, event.threadID, async (error, info) => {
      const axios = require("axios");
      const request = require("request");
      const fs = require("fs");
      let response = await axios.post(
        "https://shoti-srv1.onrender.com/api/v1/get",
        {
          apikey: "$shoti-1hg4gifgnlfdmeslom8",
        },
      );
      if (response.data.code !== 200) {
        api.sendMessage(
          `API ERROR: ${response.data}`,
          event.threadID,
          event.messageID,
        );
        return;
      }
      var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
      var rqs = request(encodeURI(response.data.data.url));
      rqs.pipe(file);
      file.on("finish", () => {
        api.sendMessage(
          {
            body: `Username: @${response.data.data.user.username}\nNickname: ${response.data.data.user.nickname}\nFull Name: ${response.data.data.user.fullname}\nAge: ${response.data.data.user.age}\n\nShoti Sauce by Jenard/Taichi`,
            mentions: [{
              tag: response.data.data.user.username,
              id: response.data.data.user.id,
            }],
            attachment: fs.createReadStream(__dirname + "/cache/shoti.mp4"),
          },
          event.threadID,
          event.messageID,
        );
      });
      file.on("error", (err) => {
        api.sendMessage(`Shoti Error: ${err}`, event.threadID, event.messageID);
      });
    }); 
  } catch (error) {
    api.sendMessage(
      "An error occurred while generating video:" + error,
      event.threadID,
      event.messageID,
    );
  }
};
