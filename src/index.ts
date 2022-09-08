import {
    BaseInteraction,
    ButtonInteraction,
    ButtonStyle,
    GuildMemberRoleManager,
    MessageInteraction,
    SelectMenuInteraction
} from "discord.js";

const {calculateCycleValues : calculateCycleValuesFn} = require("./current-cycle-time/calculate-cycle-values");

const { Client, GatewayIntentBits } = require('discord.js');
const {getCycleTimeContents : getCycleTimeContentsFn} = require("./current-cycle-time/cycle-time-contents");
const {reportCq : reportCqFn} = require("./manage/report-cq");
const {sendMessageToAllChannels : sendMessageToAllChannelsFn} = require("./sendMessageToAllChannels");
/**
 * If not available from e.g. heroku, its read from .env file instead
 * token of your discord bot. starts with MTA
 * */
if(typeof process.env.token === "undefined"){
    require('dotenv').config();
}

const token = process.env.token;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], allowedMentions: { parse: ['users', 'roles'], repliedUser: true }}); //  allowedMentions: true,


const sentenceForRemainingDays = (lastDaysLeft, daysLeft) => {
    let justResettedNewCycle = lastDaysLeft === 0 && daysLeft === 2;
    if(justResettedNewCycle){
        return "A new cycle just started! Tip: Doing it now, will leave you 3 days in harmony."
    }
    if(lastDaysLeft === 2 && daysLeft === 1){
        return "1 day left! Last change to do conquests before the cycle ends."
    }

    // if(lastDaysLeft === 2 && daysLeft === 2){
    //     // not executed, yet
    //     return "Just 2 days left for cycle end.";
    // }

    return undefined;
}

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Ready.');
    client.user.setActivity('.', {type: 'WATCHING'});

    if (!client.user || !client.application) {
        return;
    }
    console.log(`${client.user.username} is online`);

    let lastDaysLeft = undefined;
    setInterval(async() => {
        const {isRestarted : [daysLeft]} = calculateCycleValuesFn();
        console.log(daysLeft + "_" + lastDaysLeft);
        if(typeof lastDaysLeft === "undefined"){
            lastDaysLeft = daysLeft;
            return;
        }
        if(daysLeft !== lastDaysLeft){
            lastDaysLeft = daysLeft;
            const automaticMessageOfRemainingTime = sentenceForRemainingDays(lastDaysLeft, daysLeft);
            if(typeof automaticMessageOfRemainingTime !== undefined){
                await sendMessageToAllChannelsFn({message: getCycleTimeContentsFn({isWithActions: false, isPingAll:true, description:"Sent automatic: " + automaticMessageOfRemainingTime}), client});

            }else{
                console.log(`would send for: daysLeft: ${daysLeft}, lastDaysLeft: ${lastDaysLeft}`);
            }
        }
    }, 60*10000);

});

client.on('interactionCreate', async (interaction : BaseInteraction)  => {

    try{
        if(interaction.isSelectMenu()){
            const inter = interaction as SelectMenuInteraction;
            // do nothing, yet
            const response = await interaction.reply("Saved");
            return response;
        }

    if (interaction.isChatInputCommand()) {
        const { commandName} = interaction as MessageInteraction;

        if(["cq", "cqtimer"].includes(commandName)){

            const roles = interaction.member.roles as GuildMemberRoleManager;
            const isOfficer = roles.cache.some(r => r.name === "Officer");
            // interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
            const isPingAll = isOfficer && interaction.options.getBoolean("pingall");
            if(!isOfficer && interaction.options.getBoolean("pingall")){
                const response = await interaction.reply( {content: "Only officers are allowed to ping everyone."});
                return response;
            }
            const description = interaction.options.getString("description");

            const isWithActions = commandName === 'cqtimer';

            // {isMessage: true, content: getCycleTimeContentsFn(),  fetchReply: true}
            const response = await interaction.reply(getCycleTimeContentsFn({isWithActions, isPingAll, description}));
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