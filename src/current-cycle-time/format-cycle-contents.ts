import {
    ActionRowBuilder,
    bold,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder, formatEmoji,
    MessageActionRowComponentBuilder,
    time
} from "discord.js";

function formatCycleContents({nextCycleCount, nextCycleEnd, isWithActions, isPingAll, description }){

    const nextCycleEndRelativeDiscordString = time(nextCycleEnd.toMillis() / 1000, "R");// `<t:${nextCycleEnd.toMillis() / 1000}:R>`;
    const timeString = time(nextCycleEnd.toJSDate(), "F");
    const result = ` ${nextCycleEndRelativeDiscordString}  ${timeString}`;


    const buttonReportCqDone = new ButtonBuilder()
        .setCustomId('report')
        .setLabel('Manage')
        .setStyle(ButtonStyle.Primary)
    //    .setEmoji('123456789012345678')
    ;


    const embedResultStatic = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Conquest Cycle ${bold(nextCycleCount)}`)
        //.setURL('https://discord.js.org/')
        //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })

        .setDescription(`🛎️ ${result}  🛎️ `)
        // .setTimestamp()
        // .setFooter({ text: 'Keep Bridge Baddies great!'});

    const embedResult = description ? embedResultStatic.addFields({ name: 'Notice', value: description, inline: true }) : embedResultStatic;

    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(
           buttonReportCqDone
        );

    const everyoneNoticeMention = isPingAll ? `@everyone ` : "" ;

    const renderConfig = { content: everyoneNoticeMention, embeds: [embedResult], ephemeral: false, ...(isWithActions) && {components : [row]},  allowedMentions : { parse: ['users', 'roles', 'everyone'] }, mentionable: true,  repliedUser: true };
    return renderConfig;
}

module.exports = {
    formatCycleContents
}