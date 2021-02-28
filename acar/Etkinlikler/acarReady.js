const { GuildMember, MessageEmbed,Client} = require("discord.js");
const moment = require('moment');
const fs = require('fs');
module.exports = {
    Etkinlik: "ready",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    
    },
    /**
     * @param {client} ready
     */
    onRequest: async function () {    
    client.user.setPresence({ activity: { name: "Workzc" }, status: "idle" });
    }
  };