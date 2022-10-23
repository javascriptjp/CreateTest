const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js")

module.exports = {
    data: (() => {
        const data = new SlashCommandBuilder()
        data.setName('guilds')
        data.setDescription("get guilds list")
        return data
    })(),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        embed.setColor(0x0099FF)
        embed.setTitle("Guilds")
        const temp = []
        client.guilds.cache.forEach(i => {
            temp.push({
                name: i.name,
                value: i.id
            })
        })
        embed.setFields(temp)
        interaction.reply({
            embeds: [embed]
        })
    }
}