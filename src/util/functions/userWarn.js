module.exports = async (message, user, guild) => {
    const { author: userObj, guild: guildObj } = message;
    const moderation = new Map(guild.moderation) || [];
    const warnings = new Map(guild.warnings) || [];

    const warnArr = warnings.get(user._id) || [];
    if (!warnArr.length) return;

    const points = warnArr.reduce((acc, cur) => acc + cur.points, 0);

    if (points >= moderation.get(kick)) {
        await userObj.send(`You have been kicked from ${guildObj.name} for recieving ${moderation.kick} warnings!`)
            .catch(e);
        await guildObj.kick(user._id, `Recieved ${moderation.kick} warnings.`)
            .catch(e);
    }

    if (points >= moderation.get(ban)) {
        await userObj.send(`You have been banned from ${guildObj.name} for recieving ${moderation.ban} warnings!`)
            .catch(e);
        await guildObj.ban(user._id, `Recieved ${moderation.ban} warnings.`)
            .catch(e);
    }
};