const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js")

module.exports = {
    data: (() => {
        const data = new SlashCommandBuilder()
        data.setName('delete')
        data.setDescription("delete server")
        data.addStringOption(option => {
            option.setName("guildid")
            option.setDescription("guild id")
            option.setRequired(false)
            option.setMinLength(12)
            return option
        })
        return data
    })(),
    async execute(interaction, client) {
        if (interaction.options.getString("guildid") == null) {
            if (client.user.id != interaction.guild.ownerId) {
                const embed = new EmbedBuilder()
                embed.setColor(0x0099FF)
                embed.setTitle("Error")
                embed.setDescription(`bot is not owner`)
                return interaction.reply({
                    embeds: [embed]
                })
            }
            interaction.guild.delete()
        } else {
            const guild = await client.guilds.cache.get(interaction.options.getString("guildid"))
            if (guild == undefined) {
                const embed = new EmbedBuilder()
                embed.setColor(0x0099FF)
                embed.setTitle("Error")
                embed.setDescription(`non-existent server`)
                return interaction.reply({
                    embeds: [embed]
                })
            }
            if (client.user.id != guild.ownerId) {
                const embed = new EmbedBuilder()
                embed.setColor(0x0099FF)
                embed.setTitle("Error")
                embed.setDescription(`bot is not owner`)
                return interaction.reply({
                    embeds: [embed]
                })
            }
            await guild.delete()
            const embed = new EmbedBuilder()
            embed.setColor(0x0099FF)
            embed.setTitle("Delete")
            embed.setDescription(`GuildName: ${guild.name}`)
            interaction.reply({
                embeds: [embed]
            })
        }
    }
}