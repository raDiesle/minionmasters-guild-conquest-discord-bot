import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle, EmbedBuilder,
    MessageActionRowComponentBuilder,
    SelectMenuBuilder
} from "discord.js";

async function reportCq(interaction) {

    /*const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(carryInput);

         const modal = new ModalBuilder()
             .setCustomId('myModal')
             .setTitle('My Modal');
         modal.addComponents(firstActionRow);
         await interaction.showModal(modal);*/

    const guildMembers = [{
        label: 'Me',
        description: 'This is a description',
        value: 'first_option',
    },
        {
            label: 'Someone else',
            description: 'This is also a description',
            value: 'second_option',
        }];

    const carryInput = new SelectMenuBuilder()
        .setCustomId('carry')
        .setPlaceholder('Carry')
        .addOptions(guildMembers);

    const carriedInput = new SelectMenuBuilder()
        .setCustomId('carried')
        .setPlaceholder('Carried')
        .addOptions(guildMembers);

    const message = await interaction.message;
    const receivedEmbed = message.embeds[0];


    const submitCarryReport = new ButtonBuilder()
        .setCustomId('reportSubmit')
        .setLabel('Submit')
        .setStyle(ButtonStyle.Primary);
    ;
    const firstActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(carryInput);
    const secondActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(carriedInput);
    const thirdActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(submitCarryReport);

    const embedResult = EmbedBuilder.from(receivedEmbed).setTitle('Report score').setDescription("For current conquest cycle below").setFields();
    const response = await interaction.update({
        embeds: [embedResult],
        components: [firstActionRow, secondActionRow, thirdActionRow]
    });
}

module.exports = {
    reportCq
}