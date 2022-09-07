
// TBD

async function sendMessageToAllChannels({client, message}) {

    const guilds = await client.guilds.fetch();
    return guilds.forEach(async (guild) => {
        console.log(" - guild: " + guild.name)

        // List all channels
        const guildFetch = await guild.fetch();

        const channels = await guildFetch.channels.fetch();

        // filter(c => c.guild &&  c.type === 4).
        return channels.filter(c => c.guild &&  c.type === 0).forEach(async(channel) => {
            try{
                console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)

                const ch = await client.channels.fetch(channel.id);
                return ch.send(message);
            }catch(e){
                console.error(e);
                throw Error(e);
            }
        })
    })


};

module.exports = {
    sendMessageToAllChannels
}

