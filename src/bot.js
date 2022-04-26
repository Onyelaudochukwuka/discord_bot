//jshint esversion:6
var bot = {};

bot.init = () =>{
require('dotenv').config();
const {
    Client,
    Intents
} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const PREFIX = "$";
const key = [];
const keyContent = []; 
let num;
client.login(process.env.DISCORD_BOT_TOKEN);
client.on('ready', (message) => {
    console.log(`${client.user.tag} has logged in`);
});
client.on('message', (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(1)
            .split(/\s+/);
        if (CMD_NAME == 'store') {
            if(args[0] && args.slice(1)){
             key.push(args[0]);
              keyContent.push(args.slice(1));
               num = key.length;
            }else{
                message.reply("Enter two parameters to store i.e key and content");
            }

        }   
        if(CMD_NAME == 'membercount'){
            message.reply(`There are ${message.guild.memberCount} member's in the group ,${message.guild.maximumMembers - message.guild.memberCount} person's left to fill the group`);
        }
        if(CMD_NAME == 'remove'){
            if(key.indexOf(args[0]) > -1){
                key.splice(key.indexOf(args[0]) , 1);
                keyContent.splice(key.indexOf(args[0]),1);
                message.reply(`I have cleared "${args[0]}" from my memory`);
            }else{
                  message.reply(`I have no memory of "${args[0]}"`);
            }
        }
    }                            
            if(key.length > 0){
            for(let i = 0; i < key.length ; i++){
                if(message.content == key[i]){
                    message.reply(keyContent[i].join(" "));
                }
            }
        
            }
           if(message.content.indexOf('Received') > -1||message.content.indexOf('received') > -1){
               message.react('♥️');
           }
           if(message.content.indexOf('Thank') > -1 ||message.content.indexOf('thank') > -1){
               message.react('👍');
           }
    
    });

    
    client.on('guildMemberAdd',(member)=>{
        console.log(member);
        message.channel.send(`Welcome ${member.id} to De-indomitable Germosa`);
);
    });
};

bot.init();
