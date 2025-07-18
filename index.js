require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const CHANNEL_ID = 'MTM5NTg3NTIwMzQwOTY0MTU4Mg.GGyOAx.hEq02rXoYiiJVQN72a6rkjKp2bwWx1leTFvt8Q';

client.on('messageCreate', (message) => {
  if (message.channel.id === CHANNEL_ID && !message.author.bot) {
    if (!message.content.match(/https?:\/\/\S+/)) {
      message.delete();
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
