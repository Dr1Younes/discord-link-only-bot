import discord
from discord.ext import commands
import re
import os

intents = discord.Intents.default()
intents.messages = True
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

link_regex = re.compile(r"https?://\S+")

@bot.event
async def on_ready():
    print(f"✅ Logged in as {bot.user}")

@bot.event
async def on_message(message):
    if message.author.bot:
        return
    if not link_regex.search(message.content):
        try:
            await message.delete()
        except discord.Forbidden:
            print("❌ لا أمتلك صلاحية لحذف الرسالة.")
    else:
        await bot.process_commands(message)

# شغل البوت بالتوكن من البيئة
bot.run(os.getenv("DISCORD_TOKEN"))
