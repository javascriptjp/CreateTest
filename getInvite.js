const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js")

module.exports = {
    data: (() => {
        const data = new SlashCommandBuilder()
        data.setName('invite')
        data.setDescription("get guilds list")
        data.addStringOption(option => {
            option.setName("guildid")
            option.setDescription("guild id")
            option.setRequired(true)
            option.setMinLength(12)
            return option
        })
        return data
    })(),
    async execute(interaction, client) {
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
        const channel = await guild.channels.create({
            name: "invite",
            reason: 'invite channel'
        })
        const invite = await guild.invites.create(channel)
        const embed = new EmbedBuilder()
        embed.setColor(0x0099FF)
        embed.setTitle("Invite Link")
        embed.setDescription(`invite code: ${invite.url}`)
        interaction.reply({
            embeds: [embed]
        })
    }
}