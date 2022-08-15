import {
    ActionRowBuilder,
    BaseInteraction,
    ButtonBuilder,
    ButtonInteraction,
    EmbedBuilder, MessageActionRowComponentBuilder,
    MessageInteraction, ModalActionRowComponentBuilder, ModalBuilder, SelectMenuBuilder
} from "discord.js";

const { Client, GatewayIntentBits } = require('discord.js');
const {getCycleTimeContents : getCycleTimeContentsFn} = require("./current-cycle-time/cycle-time-contents")
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

            /*const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(carryInput);

            const modal = new ModalBuilder()
                .setCustomId('myModal')
                .setTitle('My Modal');
            modal.addComponents(firstActionRow);
            await interaction.showModal(modal);*/

            const guildMembers =  [{
                    label: 'Me',
                    description: 'This is a description',
                    value: 'first_option',
                },
                {
                    label: 'Someone else',
                    description: 'This is also a description',
                    value: 'second_option',
                }];

            const carryInput = 	new SelectMenuBuilder()
                    .setCustomId('carry')
                    .setPlaceholder('Carry')
                    .addOptions(guildMembers);

            const carriedInput = 	new SelectMenuBuilder()
                .setCustomId('carried')
                .setPlaceholder('Carried')
                .addOptions(guildMembers);

             const message = await interaction.message;
             const receivedEmbed = message.embeds[0];

             const firstActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(carryInput);
            const secondActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(carriedInput);

             const embedResult = EmbedBuilder.from(receivedEmbed).setTitle('Report score').setDescription("for current cq").setFields();
             const response = await interaction.update({ embeds: [embedResult], components:[firstActionRow, secondActionRow] });
           //  return response;
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