import {
    ActionRowBuilder,
    BaseInteraction,
    ButtonBuilder,
    ButtonInteraction, ButtonStyle,
    EmbedBuilder, MessageActionRowComponentBuilder,
    MessageInteraction, ModalActionRowComponentBuilder, ModalBuilder, SelectMenuBuilder, SelectMenuInteraction
} from "discord.js";

const { Client, GatewayIntentBits } = require('discord.js');
const {getCycleTimeContents : getCycleTimeContentsFn} = require("./current-cycle-time/cycle-time-contents");
const {reportCq : reportCqFn} = require("./manage/report-cq");
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
    console.log('Ready.');
    client.user.setActivity('.', {type: 'WATCHING'});

    if (!client.user || !client.application) {
        return;
    }
    console.log(`${client.user.username} is online`);
});

client.on('interactionCreate', async (interaction : BaseInteraction)  => {


    console.log("received interactionCreate");

    try{

        if(interaction.isSelectMenu()){
            const inter = interaction as SelectMenuInteraction;
            // do nothing, yet
            const response = await interaction.reply("Saved");
            return response;
        }

    if (interaction.isChatInputCommand()) {
        const { commandName} = interaction as MessageInteraction;
        if (commandName === 'cqtimer') {
            // {isMessage: true, content: getCycleTimeContentsFn(),  fetchReply: true}
            const response = await interaction.reply(getCycleTimeContentsFn());
            return response;
        }
    }
    if(interaction.isButton()){
        const {customId} = interaction as ButtonInteraction;
        if(customId === "report"){
            await reportCqFn(interaction);
        }
    }
    }catch(e) {
       console.error(e);
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