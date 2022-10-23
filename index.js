require("dotenv").config()
const {
    Client,
    GatewayIntentBits,
    EmbedBuilder
} = require("discord.js")
const options = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]
}
const client = new Client(options)
const commands = {}
client.on("ready", async () => {
    await client.guilds.cache.forEach(i => client.guilds.cache.get(i.id)?.commands.set([]))
    const commandFiles = ["createTest.js", "deleteGuild.js", "getGuilds.js", "getInvite.js"]
    const data = new Array()
    for (const file of commandFiles) {
        const command = require(`./${file}`)
        commands[command.data.name] = command
    }
    for (const commandName in commands) data.push(commands[commandName]?.data)
    await client.application?.commands.set(data)
    client.user.setActivity({
        name: `[${client.guilds.cache.size}] servers/[${client.ws.ping}] ms`
    })
    setInterval(() => {
        client.user.setActivity({
            name: `[${client.guilds.cache.size}] servers/[${client.ws.ping}] ms`
        })
    }, 10000)
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }
    const command = commands[interaction.commandName]
    try {
        await command.execute(interaction, client)
    } catch (error) {
        const embed = new EmbedBuilder()
        embed.setColor(0x0099FF)
        embed.setTitle("Error")
        embed.setDescription(`${error}`)
        return interaction.reply({
            embeds: [embed]
        })
    }
})

client.on("guildCreate", guild => {
    if (guild.ownerId != client.user.id && guild.id != "945009233282334800") {
        guild.leave()
    }
})

client.on("guildMemberRemove", member => {
    if (client.user.id != member.guild.ownerId) return
    let temp = 0
    member.guild.members.cache.forEach(i => {
        if (!i.user.bot) temp++
    })
    if (temp == 0) member.guild.delete()
})

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason)
});

client.login(process.env.token)