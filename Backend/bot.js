const { Telegraf } = require('telegraf');

// Replace with your Bot Token from @BotFather
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Replace with your GitHub Pages URL
const WEB_APP_URL = 'https://your-username.github.io/your-repo-name';

bot.start((ctx) => {
  ctx.reply('Welcome! Click the button below to sign:', {
    reply_markup: {
      keyboard: [
        [{ text: "✍️ Open Signature Pad", web_app: { url: WEB_APP_URL } }]
      ],
      resize_keyboard: true
    }
  });
});

// This listener catches the data sent from tg.sendData()
bot.on('web_app_data', async (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data().text);
    
    if (data.image) {
      // Remove the "data:image/png;base64," prefix
      const base64Data = data.image.replace(/^data:image\/png;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');

      // Send the image back to the user
      await ctx.replyWithPhoto({ source: buffer }, { 
        caption: `Signature received from ${ctx.from.first_name}!` 
      });
    }
  } catch (e) {
    console.error(e);
    ctx.reply("Failed to process signature.");
  }
});

bot.launch();
console.log("Bot is running...");