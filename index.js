console.log("Bot is starting...");

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const urlRegex = /(https?:\/\/[^\s]+)/;

  if (!urlRegex.test(message.content)) {
    message.delete().catch(() => {});
  }
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
});
