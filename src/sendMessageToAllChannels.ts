

const sendMessageToAllChannels = async () => {



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


};

module.exports = {
    sendMessageToAllChannels
}