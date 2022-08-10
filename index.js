// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

const {calculateEndTime} = require("./countdown");


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Ready!');
    client.user.setActivity('.', {type: 'WATCHING'});
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'cqtimer') {
        const message = await interaction.reply({isMessage: true, content: calculateEndTime(),  fetchReply: true});

        setInterval(async () => {
            // client.channels.cache.get("916642101989617684").send("!stats");
            message.edit(calculateEndTime());
        }, 1000);
    }
});

const token = process.env.token;
client.login(token);