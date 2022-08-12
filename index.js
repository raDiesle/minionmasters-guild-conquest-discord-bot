// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

const {calculateEndTime} = require("./countdown");

/**
 * If not available from e.g. heroku, its read from .env file instead
 * token of your discord bot. starts with MTA
 * */
if(typeof process.env.token === "undefined"){
    require('dotenv').config();
}

const token = process.env.token;
console.warn(token);

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
        const message = await interaction.reply({isMessage: true, content: calculateEndTime().asString ,  fetchReply: true});

        const SEQUENCE_TO_UPDATE = 1000 * 60;
        setInterval(async () => {
            const remainingTimeString = calculateEndTime().asString;
            message.edit(remainingTimeString);
        }, SEQUENCE_TO_UPDATE );
    }
});


client.login(token);