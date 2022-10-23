const {
    SlashCommandBuilder,
    PermissionsBitField,
    EmbedBuilder
} = require("discord.js")

module.exports = {
    data: (() => {
        const data = new SlashCommandBuilder()
        data.setName('create')
        data.setDescription("create test server")
        data.addStringOption(option => {
            option.setName("name")
            option.setDescription("ServerName")
            option.setRequired(true)
            option.setMinLength(2)
            option.setMaxLength(100)
            return option
        })
        return data
    })(),
    async execute(interaction, client) {
        if (client.guilds.cache.size >= 10) {
            const embed = new EmbedBuilder()
            embed.setColor(0x0099FF)
            embed.setTitle("Error")
            embed.setDescription(`too many servers/delete unnecessary servers`)
            return interaction.reply({
                embeds: [embed]
            })
        }
        const Guild = await client.guilds.create({
            name: interaction.options.getString("name")
        })
        const channel = await Guild.channels.create({
            name: "test",
            reason: 'first channel'
        })
        const invite = await Guild.invites.create(channel)
        await Guild.roles.everyone.setPermissions([PermissionsBitField.Flags.Administrator])
        const embed = new EmbedBuilder()
        embed.setColor(0x0099FF)
        embed.setTitle("Invite Link")
        embed.setDescription(`invite code: ${invite.url}`)
        interaction.reply({
            embeds: [embed]
        })
    }
}