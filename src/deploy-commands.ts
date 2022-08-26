const { SlashCommandBuilder, Routes, ButtonComponent} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('../config.json');

const commands = [
    new SlashCommandBuilder().setName('cqtimer').setDescription('let you show cq and manage to track cq contribution.'),
    new SlashCommandBuilder().setName('cq').setDescription('Show remaining currency cycle conquest time'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);