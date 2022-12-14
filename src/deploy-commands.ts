const { SlashCommandBuilder, Routes, ButtonComponent} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('../config.json');

const commands = [
    // new SlashCommandBuilder().setName('cqtimer').setDescription('Show remaining currency cycle conquest time'),
    new SlashCommandBuilder().setName('cq')
        .setDescription('let you show cq and manage to track cq contribution.')
        .addBooleanOption(option => option.setName("pingall")
            .setDescription("Weather to ping all members This is only available for officers")
        )
        .addStringOption(option => option.setName("description").setDescription("Additional text you want to provide inside of the box"))
    ,
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);


 rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands }) // Routes.applicationGuildCommands(clientId, guildId)
     .then(() => console.log('Successfully registered application commands.'))
     .catch(console.error);

// rest.put(Routes.applicationCommands(clientId),
//     { body: commands },
// ).then(() => console.log('Successfully registered application commands.'))
//     .catch(console.error);


// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
//     .then(() => console.log('Successfully deleted all guild commands.'))
//     .catch(console.error);
