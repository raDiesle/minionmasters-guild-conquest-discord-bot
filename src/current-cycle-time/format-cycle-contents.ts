import {
    ActionRowBuilder,
    bold,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder, formatEmoji,
    MessageActionRowComponentBuilder,
    time
} from "discord.js";

function formatCycleContents({nextCycleCount, nextCycleEnd}){

    const nextCycleEndRelativeDiscordString = time(nextCycleEnd.toMillis() / 1000, "R");// `<t:${nextCycleEnd.toMillis() / 1000}:R>`;
    const timeString = time(nextCycleEnd.toJSDate(), "F");
    const result = ` ${nextCycleEndRelativeDiscordString}  ${timeString}`;


    const buttonReportCqDone = new ButtonBuilder()
        .setCustomId('report')
        .setLabel('Manage')
        .setStyle(ButtonStyle.Primary)
    //    .setEmoji('123456789012345678')
    ;

    const embedResult = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Conquest Cycle ${bold(nextCycleCount)}`)
        //.setURL('https://discord.js.org/')
        //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription(`🛎️ ${result} 🛎️`)

        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
        //.addFields(
//            { name: ``, value: result })
       //     { name: '\u200B', value: '\u200B' },
         //   { name: 'Inline field title', value: 'Some value here', inline: true },
          //  { name: 'Inline field title', value: 'Some value here', inline: true },
        //)
        //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        // .setTimestamp()

        // .setFooter({ text: 'Keep Bridge Baddies great!'});


    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(
           buttonReportCqDone
        );

    return { embeds: [embedResult], components : [row],  ephemeral: false };
}

module.exports = {
    formatCycleContents
}