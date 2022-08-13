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

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Ready!');
    client.user.setActivity('.', {type: 'WATCHING'});

    const guilds = await client.guilds.fetch();
    guilds.forEach(async (guild) => {
        console.log(" - guild: " + guild.name)

        // List all channels
        const guildFetch = await guild.fetch();

        const channels = await guildFetch.channels.fetch();


        // filter(c => c.guild &&  c.type === 4).
        channels.filter(c => c.guild &&  c.type === 0).forEach(async(channel) => {
            try{

            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)

            const ch = await client.channels.fetch(channel.id);
            ch.send("Bot Registered");
            }catch(e){
                console.error(e);
            }
        })
    })


});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'cqtimer') {
        const message = await interaction.reply({isMessage: true, content: calculateEndTime().result ,  fetchReply: true});


    }
});

client.on("message", () => {
    const SEQUENCE_TO_UPDATE = 1000 * 60;


   /* setInterval(async () => {
        console.log("check cycle time");
        const guildList = client.guilds.array();
        try {
            guildList.forEach(guild => guild.defaultChannel.send("messageToSend"));

            if(calculateEndTime().isRestarted){
                guildList.forEach(guild => guild.defaultChannel.send("new cycle started"));
            }
        } catch (err) {
            console.log("Could not send message to " + guild.name);
        }

    }, SEQUENCE_TO_UPDATE );*/
});

client.login(token);