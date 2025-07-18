const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ID التشانل اللي يسمح فيه فقط باللينكات
const CHANNEL_ID = '1395873392221093959';

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // تجاهل رسائل البوتات
  if (message.author.bot) return;

  // اشتغل بس على التشانل المحدد
  if (message.channel.id === CHANNEL_ID) {
    const urlRegex = /(https?:\/\/[^\s]+)/i;

    // لو مفيش لينك في الرسالة
    if (!urlRegex.test(message.content)) {
      try {
        await message.delete();
        await message.author.send(
          `❌ الرسالة اللي بعتها في تشانل <#${CHANNEL_ID}> اتشالت لأنها مش فيها رابط.\n✅ في التشانل ده مسموح إرسال الروابط فقط.`
        );
      } catch (err) {
        console.error('⚠️ مشكلة في حذف الرسالة أو إرسال DM:', err.message);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
