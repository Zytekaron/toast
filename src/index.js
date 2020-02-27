const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.CLIENT_TOKEN });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));