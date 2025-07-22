import discord
from discord.ext import commands

import re

intents = discord.Intents.default()
intents.message_content = True  # لازم علشان نقرأ محتوى الرسائل

bot = commands.Bot(command_prefix="!", intents=intents)

# Regex لاكتشاف وجود رابط في الرسالة
url_regex = re.compile(r'https?://')

@bot.event
async def on_ready():
    print(f"✅ البوت شغال باسم: {bot.user}")

@bot.event
async def on_message(message):
    # تجاهل رسائل البوت نفسه
    if message.author.bot:
        return

    # لو مفيش رابط في الرسالة → امسحها
    if not url_regex.search(message.content):
        try:
            await message.delete()
            print(f"🗑️ تم حذف رسالة بدون رابط من: {message.author}")
        except discord.Forbidden:
            print("❌ مش معايا صلاحية حذف الرسائل!")
        except discord.HTTPException as e:
            print(f"❌ حصل خطأ: {e}")

    # علشان الأوامر تشتغل
    await bot.process_commands(message)

# شغل البوت بتوكنك هنا
bot.run("MTM5NTg3NTIwMzQwOTY0MTU4Mg.GDckuQ.DOT4bwOP7cxSAtsyXSdJkRIHHCer21mA8hMo6E")
