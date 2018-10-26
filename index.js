 const botconfig = require("./botconfig.json");
  const tokenfile = require("./token.json");
const Discord = require("discord.js");
const superagent = require("superagent");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let purple = botconfig.purple;
let prefix = botconfig.prefix;
const client = new Discord.Client();
let channel = "commands";

console.log(0);

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

console.log(1);

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("shadow", {type: "WATCHING"});

});

console.log(2);

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;



  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let msg = message

if(cmd===`${prefix}meme`) {


  let msg = await message.channel.send("Generating")

let {body} = await superagent
.get(`https://api-to.get-a.life/meme`);
if(!{body}) return message.channel.send("I broke try me again ;)")

let memeembed = new Discord.RichEmbed()
.setColor("#ff9900")
.setAuthor("Meme", message.guild.iconURL)
.setTitle("meme")
.setImage(body.url)
.setTimestamp()
.setFooter("GamingBot", bot.user.displayAvatarURL)


message.channel.send(memeembed);
msg.delete("5000")
}




  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


});

console.log(3);

bot.login(tokenfile.token);