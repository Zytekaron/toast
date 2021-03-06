const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = (client, message, args, { guild }) => {
	const { prefix } = guild;

	const noargs = new RichEmbed()
		.setTitle("Help Menu")
		.setDescription("<> = required, [] = optional\nRun t!help <command> to view usage")
		.setColor(Colors.DEFAULT)
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	const commandOne = client.commands.get(args[0]);

	if (commandOne) {
		if (commandOne.data.hide) {
			return message.channel.send(new RichEmbed()
				.setTitle("Help")
				.setDescription("This command is currently unavailable (or hidden).")
				.setColor(Colors.DEFAULT)
				.setFooter(message.author.tag, message.author.displayAvatarURL));
		}
		const embed = new RichEmbed()
			.setTitle(`**${commandOne.data.name}**`)
			.setColor(Colors.DEFAULT)
			.setFooter(message.author.tag, message.author.displayAvatarURL);
		const usage = commandOne.data.usage
			.join("\n")
			.replace(/!/g, prefix);

		const { description } = commandOne.data;
		embed.addField("Description", description);
		embed.addField("Usage", `\`${usage}\``);
		message.channel.send(embed);
	}
	else {
		const commands = client.commands.filter(c => !c.data.hide);
		noargs.addField(
			"Moderation", commands.filter(c => c.data.type === "mod").map(c => `${c.data.name} ➜ \`${c.data.usage[0]}\`\n`).join("").replace(/!/g, prefix)
		);
		noargs.addField(
			"Fun", commands.filter(c => c.data.type === "fun").map(c => `${c.data.name} ➜ \`${c.data.usage[0]}\`\n`).join("").replace(/!/g, prefix)
		);
		noargs.addField(
			"Utility", commands.filter(c => c.data.type === "util").map(c => `${c.data.name} ➜ \`${c.data.usage[0]}\`\n`).join("").replace(/!/g, prefix)
		);
		message.author.send(noargs);
		message.channel.send(new RichEmbed()
			.setTitle("Help")
			.setDescription("I have sent you my list of help commands, please check your DMs")
			.setColor(Colors.DEFAULT)
			.setFooter(message.author.tag, message.author.displayAvatarURL));
	}

};

module.exports.data = {
	name: "help",
	description: "Sends an embed containing command information",
	type: "misc",
	usage: ["!help"],
	aliases: ["commands"],
};
