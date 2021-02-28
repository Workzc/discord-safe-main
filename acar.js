const { Client, Discord, MessageEmbed, Collection, WebhookClient, Util, Guild, Message } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
global.client = client;
const fs = require("fs");
client.komutlar = new Collection();
client.komut = new Collection();
client.sistem = require("./acar/acar-ayar.json");
client.modüller = {}; 
client.altbaslik = "Developed by ACAR"
fs.readdir("./acar/Komutlar", (err, files) => {
    if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log(`[ ${files.length} ] Adet ACAR Komutları Yüklenecek!`);
    files.forEach(file => {
        let referans = require(`./acar/Komutlar/${file}`);
  if(typeof referans.onLoad === "function") referans.onLoad(client);
            client.komutlar.set(referans.Isim, referans);
            if (referans.Komut) {
              referans.Komut.forEach(alias => client.komut.set(alias, referans));
            }
          });
});

  fs.readdir("./acar/Etkinlikler/", (err, files) => {
    if (err) return console.myTime(err);
    files.forEach(fileName => {
      let referans = require("./acar/Etkinlikler/" + fileName);
        referans.onLoad(client);
        client.on(referans.Etkinlik, referans.onRequest);
      console.log(
        `[~ ACAR~ ] (${fileName}) isimli etkinlik yüklendi.`
      );
    });
  });

 client.on("message", (message) => {
      if (message.author.bot ||!message.content.startsWith(client.sistem.a_Prefix) || !message.channel || message.channel.type == "dm") return;
      let args = message.content
        .substring(client.sistem.a_Prefix.length)
        .split(" ");
      let komutcuklar = args[0];
      let bot = message.client;
      args = args.splice(1);
      let calistirici;
      if (bot.komut.has(komutcuklar)) {
        calistirici = bot.komut.get(komutcuklar);
      
        calistirici.onRequest(bot, message, args);
      } else if (bot.komutlar.has(komutcuklar)) {
        calistirici = bot.komutlar.get(komutcuklar);
        calistirici.onRequest(bot, message, args);
      }
});
client.login(client.sistem.a_Token).catch(err => console.error("[~ ACAR ~] Discord API Botun tokenini doğrulayamadı."));
