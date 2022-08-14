import {bold, EmbedBuilder, time} from "discord.js";

function formatCycleContents({nextCycleCount, nextCycleEnd}){

    const nextCycleEndRelativeDiscordString = time(nextCycleEnd.toMillis() / 1000, "R");// `<t:${nextCycleEnd.toMillis() / 1000}:R>`;
    const result = ` ${nextCycleEndRelativeDiscordString}`;

    const embedResult = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Conquest Cycle ${nextCycleCount}`)
        //.setURL('https://discord.js.org/')
        //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription("Time to conquest")
        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: `${bold("Cycle")} ends`, value: result },
       //     { name: '\u200B', value: '\u200B' },
         //   { name: 'Inline field title', value: 'Some value here', inline: true },
          //  { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Keep Bridge Baddies great!'});
    return embedResult;
}

module.exports = {
    formatCycleContents
}