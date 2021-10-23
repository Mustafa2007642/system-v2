const {
    Client,
    Collection,
    MessageEmbed,
    Intents,
    Permissions,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
  } = require("discord.js");
  
  const Discord = require('discord.js')
  const client = new Client({
    partials: ["MESSAGE", "USER", "GUILD_MEMBER", "REACTION", "CHANNEL"],
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    allowedMentions: { parse: ["users", "roles"], repliedUser: false },
  });
  const express = require("express")
const app = express();
const db = require('quick.db');
const fs = require('fs');
const figlet = require('figlet');
const moment = require('moment');
const prefix = "!";
client.on('ready', () => {
  console.log(`${client.user.tag} ._. ﻡﺎﺗ ﺡﺎﺠﻨﺑ ﺕﻮﺒﻟﺍ ﻞﻴﻐﺸﺗ ﻢﺗ`)
})


//codes


client.on('messageCreate', async  message => {
if (message.content.toLowerCase() === prefix + "help") {
  if (message.channel.type == "dm") return;
  let embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .addField('**🌍 General Commands [8]** ',`\`server , user , avatar , tax , ping , id , bot link , decoration\``)
  .addField('**🔐 Admin Commands [18]**',`\`role, nickname , warn , warnnings , clear-warnnings , kick , vkick , ban , unban , unmute , mute , clear , lock , unlock , hide , show و hide all و show all \``)
  .setFooter(`طلب من ${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
  message.reply({embeds: [embed]})
} 
}) 

client.on('messageCreate', async (message) => {
if (message.content.toLowerCase().startsWith(prefix + "server")) {
if (message.channel.type == "dm") return;
let text = message.guild.channels.cache.filter(r => r.type === "text").size
let voice = message.guild.channels.cache.filter(r => r.type === "voice").size
let chs = message.guild.channels.cache.size

let roles = message.guild.roles.cache.size

let embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setColor('BLACK')
  .addFields({
    name: `🆔 ايدي السيرفر`,
    value: `${message.guild.id}`,
    inline: true

  }, {
      name: `👑 المالك من`,
      value: `<@${message.guild.ownerid}>`,
      inline: true

    }, {
      name: `📆 تم انشاء السيرفر بتاريخ`,
      value: `<t:${Math.floor(message.guild.createdAt/1000.0)}:R>`,
      inline: true
    }, {
      name: `👥 أعضاء (${message.guild.memberCount})`,
      value: `**${message.guild.premiumSubscriptionCount}** التعزيزات ✨`,
      inline: true
    }, {
      name: `💬 الرومات (${chs})`,
      value: `**${text}** رومات الكتابيه | **${voice}** رومات الصوتيه`,
      inline: true
    }, {
      name: `🔐 عدد الرولات (${roles})`,
      value: `لرؤية قائمة مع استخدام جميع الرتب ${prefix}roles`,
      inline: true
    })
  .setFooter(`طلب من ${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
message.reply({embeds: [embed]})
}
});

client.on('messageCreate',async message => {
if (message.content.toLowerCase().startsWith(prefix + "user")) {
var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
var heg;
if (men) {
  heg = men
} else {
  heg = message.author
}
var mentionned = message.mentions.members.first();
var h;
if (mentionned) {
  h = mentionned
} else {
  h = message.member
}
moment.locale('ar-en');
let name = h.user.username || h.username
let Id = h.id
var useer = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField("الإسم", name)
  .addField("الايدي", Id)
  .addField('دخول الديسكورد :', `**<t:${Math.floor(message.guild.createdTimestamp/1000.0)}:R>**`, true)
  .setFooter(`طلب من ${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
  .setThumbnail(heg.avatarURL());
message.reply({embeds: [useer]})
}
});
client.on('messageCreate',async message => {
if (message.content.toLowerCase().startsWith(prefix + 'avatar')) {
let args = message.content.substring(prefix.length).split(" ");
let user = message.mentions.users.first()
if (!user && !args[1]) {
  let uavatar = message.author.avatarURL({ size: 4096, dynamic: true })
  let embed3 = new Discord.MessageEmbed()
    .setTitle(`${message.member.user.username} الصورة الرمزية`)
    .setColor('RANDOM')
    .setImage(uavatar)
    var avataru = new MessageButton()
    .setStyle("LINK")
  .setLabel(`${message.member.user.username}`)
  .setURL(`${uavatar}`)
var row = new MessageActionRow()
  .addComponents(avataru)
await message.reply({ components: [row], embeds: [embed3] })
}
if (args[1] === 'server') {
  let savatar = message.guild.iconURL({ size: 4096, dynamic: true })
  let embed2 = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} الصورة الرمزية`)
    .setColor('RANDOM')
    .setImage(savatar)
  var avatars = new MessageButton()
  .setStyle("LINK")
  .setLabel(`${message.guild.name}`)
  .setURL(`${savatar}`)
var row = new MessageActionRow()
  .addComponents(avatars)
await message.reply({ components: [row], embeds: [embed2] })
}
if (user) {
  let xavatar = user.displayAvatarURL({ size: 4096, dynamic: true });
  let embed = new Discord.MessageEmbed()
    .setTitle(`${user.username} الصورة الرمزية`)
    .setColor('RANDOM')
    .setImage(xavatar)
    var avatarx = new MessageButton()
    .setStyle("LINK")
  .setLabel(`${user.username}`)
  .setURL(`${xavatar}`)
var row = new MessageActionRow()
  .addComponents(avatarx)
await message.reply({ components: [row], embeds: [embed] })
}
}
})
client.on("messageCreate", async message => {
let args = message.content
  .split(" ")
  .slice(1)
  .join(" "); if (message.author.bot) return;
if (!message.guild) return;
if (!message.content.startsWith(prefix)) return;
if (message.content.toLowerCase().startsWith(prefix + "tax")) { 
  let args2 = parseInt(args)
  let tax = Math.floor(args2 * (20) / (19) + (1))
  let tax2 = Math.floor(args2 * (20) / (19) + (1)-(args2))
  let tax3 = Math.floor(tax2 * (20) / (19) + (1))
  let tax4 = Math.floor(tax2 + tax3 + args2)
  let embed1 = new Discord.MessageEmbed()
  .setTitle(`**❌ خطأ**`)
  .setColor("#f04747")
  .setDescription(`**يجب أن يكون رقمًا**`)
  .setFooter(`${client.user.username}`);
  if (!args2) return message.reply({embeds: [embed1]});
  let embed2 = new Discord.MessageEmbed()
  .setTitle(`**❌ خطأ**`)
  .setColor("#f04747")
  .setDescription(`**يجب أن يكون رقمًا**`)
  .setFooter(`${client.user.username}`);
  if (isNaN(args2)) return message.reply({embeds: [embed2]});
  let embed3 = new Discord.MessageEmbed()
  .setTitle(`**❌ خطأ**`)
  .setColor("#f04747")
  .setDescription(`**يجب أن يكون الرقم أكبر 1**`)
  .setFooter(`${client.user.username}`);
  if (args2 < 1) return message.reply({embeds: [embed3]});
  let embed4 = new Discord.MessageEmbed()
  .setTitle(`**:notes: التكلفة النهائية هي:**`)
  .setColor("#43b581")
  .setDescription(`1`)
  .setFooter(`${client.user.username}`);
  if (args2 == 1) return message.reply({embeds: [embed4]});
  message.reply(`**> السـعـر كامل بدون الوسيط : ${tax}\n > السـعـر كامل مع الوسيط : ${tax4}**`);
}
});
  client.on('messageCreate',async message => {
    if (message.content.startsWith(prefix + "ping")) {
            if (message.channel.type == "dm") return;
        let embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.avatarURL())
            .setColor("#43b581")
            .setTitle(`Ping Bot`)
            .setDescription(`**
 :signal_strength: - ping bot 
${client.ws.ping}**`)
            .setFooter(`Requsted By ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            message.reply({embeds: [embed]});
    }
})
client.on('messageCreate',async message => {
if (message.author.bot) return;
if (message.content.toLowerCase().startsWith(prefix + 'id')) {
if (message.channel.type == "dm") return;
 
var user = message.guild.member(message.mentions.members.first() || message.author);
const embed = new Discord.MessageEmbed()
  .setColor("#33ff00")
  .addField(`الايدي : [ ${user.id} ]`, `${user.user}`)
  .setThumbnail(user.user.avatarURL())
  .setFooter(`- طلب من: ${message.author.tag}`)
message.reply({embeds: [embed]});
}
});
client.on('messageCreate',async message => {
if (message.content.toLowerCase().startsWith(prefix + "bot link") || message.content.toLowerCase().startsWith(prefix + "link bot")) {
if (message.channel.type == "dm") return;
const mbot = message.mentions.users.first();
if (!mbot) return message.reply("*حدد البوت من فضلك!*")
if (!mbot.bot) return message.reply('*هذا شخص مو بوت*');
const embed = new Discord.MessageEmbed()
  .setThumbnail(mbot.avatarURL())
  .setColor("#33ff00")
  .setTitle("*`تم ✓ `*")
  .setDescription(` **[(دعوة ${mbot.username})](https://discordapp.com/oauth2/authorize?client_id=${mbot.id}&scope=bot&permissions=384064) ** `)
  .setFooter("طلب " + message.author.username)
message.reply({embeds: [embed]})
}
});
client.on('messageCreate',async message => {
if (message.content.toLowerCase().startsWith(prefix + 'decoration')) {
if (message.channel.type == "dm") return;
let args = message.content.split(" ").slice(1);
if (!args[0]) return;
figlet(args.join(" "), (err, decor) => {
message.reply(`تم,
\`\`\`${decor}\`\`\`
`)
})
}
});

//------------------------//
client.on('messageCreate', async message => {
if (!message.guild) return;
if (message.content.toLowerCase().startsWith(prefix + 'role')) {
 
if (!message.member.permissions.has('MANAGE_ROLES'))
  return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
var user =
  message.mentions.members.first() ||
  client.users.cache.get(message.content.split(' ')[1]);
if (!user)
  return message.reply(
    `**${prefix}role @member اسم الرول**`
  );
var role =
  message.mentions.roles.first() ||
  message.guild.roles.cache.find(r =>
    r.name.startsWith(
      message.content
        .split(' ')
        .slice(2)
        .join(' ')
    )
  );
if (!role) return message.reply(`*لم اجد الرتبة*`);
if (user.roles.cache.get(role.id)) {
  user.roles.remove(role).then(() => {
    return message.reply(
      `✅ - **تم ازالة الرتبة بنجاح ${user.user.username}, \`${
      role.name
      }\`**`
    );
  });
} else {
  user.roles.add(role).then(() => {
    return message.reply(
      `✅ - **تم اضافة رتبة الى حساب >  ${user.user.username}, \`${
      role.name
      }\`**`
    );
  });
}
}
});

client.on("messageCreate",async message => {
if (message.author.bot) return;
if (!message.guild) return;
if (message.content.toLowerCase().startsWith(prefix + 'nickname') || message.content.toLowerCase().startsWith(prefix + 'لقب') || message.content.toLowerCase().startsWith(prefix + 'nick') || message.content.toLowerCase().startsWith(prefix + 'اسم')) {
 
if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
if (!message.guild.member(client.user).permissions.has('MANAGE_NICKNAMES')) return message.reply('**ليس لدي الصلاحية ! 🙄**');
var user = message.mentions.users.first();
var member = message.mentions.members.first();
if (member) {
  var args = message.content.split(" ").slice(2).join(" ");
  if (!args[1]) {
    member.setNickname(user.username)
    return message.reply(' ✅ ' + user.username + ' تم إعادة تعيين الاسم المستعار ')
  } else if (args[1]) {
    member.setNickname(args)
    return message.reply(`> تم تغيير النك نيم  | ✅ **${user.username}** الى **${args}**`)
  }
} else {
  message.reply({embeds: [new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
    .setTitle("command: nickname")
    .setDescription(`**Aliases:**\n\`لقب , اسم ,nick \`\n**Usage:**
     \`${prefix}nickname (username - user id)\`\n\n**Example:**\n\`${prefix}nickname\` <@!${message.author.id}> \`test\`\n\`${prefix}nickname ${message.author.id} test\``)]}).then(message => message.delete({ timeout: 350000 }));
  }
}
})
client.on('messageCreate',async message => {
 
   
if (!message.content.startsWith(prefix) || message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();
const user = message.mentions.users.first()
if (command.toLowerCase() === 'warn') {
 
if (message.channel.type === 'DM') return;
 
if (!user) return message.reply("منشن المستخدم")
if (user) {
   
  message.reply(`**${user.username}** تم تحذيره!`)
  user.send(`⚠️| لقد تم تحذيرك  سبب **${args[1]}**`).catch(err => { (message.reply('لا يمكن إرسال رسالة تحذير في هذا المستخدم dm لكنه تلقى التحذير في قاعدة البيانات الخاصة بنا')) })
  db.add(`warnnings_${user.id}_reason`, 1)
}
}
if (command.toLowerCase() === 'warnnings') {
 
if (message.channel.type === 'DM') return;

if (user) {
   
  if (!db.has(`warnnings_${user.id}_reason`)) return message.reply('❌| لا يمكن العثور على أي تحذيرات لهذا المستخدم')
  let getwarnings = db.fetch(`warnnings_${user.id}_reason`)
  if (db.has(`warnnings_${user.id}_reason`)) {
    message.reply(`${user.username} لديه ${getwarnings} تحذير`)
  }
}
}
if (command.toLowerCase() === 'clear-warnnings') {
 
if (message.channel.type === 'DM') return;

if (user) {
   
  if (!db.has(`warnnings_${user.id}_reason`)) return message.reply('❌| لا يمكن العثور على أي تحذيرات لهذا المستخدم')
  if (db.has(`warnnings_${user.id}_reason`)) {
    db.delete(`warnnings_${user.id}_reason`)
    message.reply(`✅| إزالة كافة التحذيرات الخاصة بـ ${user.username},`)
  }
}
}
});
client.on('messageCreate', async message => {  
  if (message.content.toLowerCase().startsWith(prefix + "kick")) {
  if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply(`! 🙄ليس لديك صلاحيات`)
  if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply("! 🙄ليس لدي صلاحيات")
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.user.username === args.slice(1).join(' '));
  if (!member) return message.reply(`**الرجاء منشن المستخدم او اكتب ايديه/اليوزرنيم**`)
  if (member.id === message.author.id) return message.reply(`**لا يمكنك ركل نفسك**`)
  if (member.id === message.guild.me.id) return message.reply(`**لا يمكنك ركلي  <_>**`)
  if (!member.kickable) return message.reply(`**رتبه المستخدم أعلى مني**`);
  
  await member.kick()
  message.reply(`**${member.user.username} Has been kicked from the server ✈**`)
  }
  })
client.on('messageCreate', async message => {
if (message.content.toLowerCase().startsWith(prefix + "vkick")) {
if (!message.member.permissions.has("MOVE_MEMBERS")) return;
if (!message.channel.guild) return;
let user = message.guild.member(
  message.mentions.users.first())
if (!user) return message.reply("Mention Some One | منشن الشخص")
if (!message.guild.member(user).voice.channel) return message.reply("الشخص مو بروم")
await user.voice.kick()
message.reply(`تم طرد الشخص من الروم الصوتي ${user}`)
}
})
client.on("messageCreate",async (message) => {
if (message.content.toLowerCase().startsWith(prefix + "ban")) {
var args = message.content.split(' ')
var member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
var trueUser = message.guild.member(member);
var reason = message.content.split(' ').slice(3).join(' ') || 'undefined';
var time = args[2] || '1y'
if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply({embeds: [new Discord.MessageEmbed().setColor("RED").setDescription("! 🙄ليس لديك صلاحيات** Ex: " + `${prefix}ban @user 4d spam`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]});
if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply({embeds: [new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " ** أنت بحاجة إلى إذن `BAN_MEMBER` لاستخدام هذا الأمر!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]});
if (!trueUser) return message.reply({embeds: [new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **يرجى منشن / ايدي احدا ما!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]});
if (!reason) return message.reply({embeds: [new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **الرجاء كتابة السبب!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]});
trueUser.ban({ reason: reason }).then(() => {
  message.reply({embeds: [new Discord.MessageEmbed().setColor("GREEN").setDescription("✅" + ` **<@!${trueUser.user.id}> banned from the server ! :airplane: من:<@${message.author.id}> **`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
  setTimeout(() => {
    message.guild.fetchBans().then(bans => {
      if (bans.size == 0) return;
      bans.forEach(ban => {
        if (ban.user.id == trueUser.user.id) {
          message.guild.members.unban(ban.user.id);
        } else console.log(ban.user.id + " => " + trueUser.user.id)
      });
    });
  }, ms(time))
})
}
})
client.on("messageCreate",async message => {
let command = message.content.split(" ")[0];
if (command.toLowerCase() == prefix + "unban") {
 
if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("**! 🙄ليس لديك صلاحيات**")
let message = message.content
  .split(" ")
  .slice(1)
  .join(" ");
if (message == "all") {
  message.guild.fetchBans().then(zg => {
    zg.cache.forEach(NoNo => {
      message.guild.unban(NoNo);
    });
  });
  return message.reply(
    "**✅ تم فك عن جميع الباندات !**"
  );
}
if (!message)
  return message.reply(
    "**:rolling_eyes:- الرجاء كتابة ايدي المستخدم / الكل**"
  );
message.guild
  .unban(message)
  .then(m => {
    message.reply(
      `**✅ @${m.username} تم فك عنه الباند !**`
    );
  })
  .catch(stry => {
    message.reply(
      `**:rolling_eyes: لا أجد \`${message}\` في قائمة الحظر **`
    );
  });
}
});
client.on('messageCreate', async message => {
let args = message.content.split(" ");
if (args[0].toLowerCase() === prefix + 'unmute') {
 
if (message.author.bot) return;
if (message.channel.type == "dm") return;
if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({embeds: [new Discord.MessageEmbed().setDescription( " **! 🙄ليس لديك صلاحيات**").setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
if (!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply({embeds: [new Discord.MessageEmbed().setDescription( " **! 🙄ليس لدي صلاحيات*").setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
let user = message.mentions.members.first()
if (!user) return message.reply({embeds: [new Discord.MessageEmbed().setDescription( " **رجاءا منشن احدهم!**").setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
if (user.id === message.author.id) return message.reply({embeds: [new Discord.MessageEmbed().setDescription("**ماذا تفعل يا صاح**").setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
if (!message.guild.member(user).bannable) return message.reply({embeds: [new Discord.MessageEmbed().setDescription( " **لا يمكنني إلغاء كتم صوت  لانه أعلى مني > _ <**").setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
var muteRole = message.guild.roles.cache.find(n => n.name === 'Muted')
if (!muteRole) return message.reply({embeds: [new Discord.MessageEmbed().setDescription(  + ` **لم اجد رتبه الميوت؟؟**`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
user.roles.remove(muteRole)
message.reply(  + " **معالجة وظيفة الغاء كتم الصوت**").then((m) => {
  m.edit(  + " **اكتملت المعالجة**")
})
message.reply({embeds: [new Discord.MessageEmbed().setDescription(  + ` **${user} لقد تم إلغاء كتم صوت بن بواسطة <@!${message.author.id}>**`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
}
})
client.on("messageCreate",async (message) => {
if (message.content.toLowerCase().startsWith(prefix + "mute")) {
 
if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({embeds: [
  new Discord.MessageEmbed().setColor("RED")
    .setDescription(`**! 🙄ليس لديك صلاحيات**`)
    .setFooter(`طلب من ${message.author.tag}`).setTimestamp()
]})
if (!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply({embeds: [
  new Discord.MessageEmbed().setColor("RED")
    .setDescription("! 🙄ليس لدي صلاحيات**")
    .setFooter(`طلب من ${message.author.tag}`).setTimestamp()
]})
let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1])
var user = message.guild.member(member)
if (!user) return message.reply({embeds: [
  new Discord.MessageEmbed().setColor("RED")
    .setDescription("❌" + " **رجاءا منشن المستخدم**")
    .setFooter(`طلب من ${message.author.tag}`).setTimestamp()
]})
if (user.id === message.author.id) return message.reply({embeds: [
  new Discord.MessageEmbed().setColor("YELLOW")
    .setDescription("⚠" + " **ماذا تفعل يا صاح**")
    .setFooter(`طلب من ${message.author.tag}`).setTimestamp()
]})
if (user.id === client.user.id) return message.reply({embeds: [
  new Discord.MessageEmbed().setColor("YELLOW")
    .setDescription("⚠" + " **ماذا تفعل يا صاح**")
    .setFooter(`طلب من ${message.author.tag}`).setTimestamp()
]})
if (!message.guild.member(user).bannable) return message.reply({embeds: [
  new Discord.MessageEmbed().setColor("RED").setDescription('❌" + " *"*لا يمكنني كتم صوت أعلى مني > _ <**')
    .setFooter(`طلب من ${message.author.tag}`).setTimestamp()
]})
let muteRole = message.guild.roles.cache.find(n => n.name === 'Muted')
if (!muteRole) {
  message.guild.roles.create({
    data: {
      name: "Muted",
    }
  }).then(async (role) => {
    await message.guild.channels.cache.forEach(channel => {
      channel.overwritePermissions([{
        id: role.id,
        deny: ["SEND_MESSAGES"]
      }]);
    })
  })
}
user.roles.add(muteRole)
var time = message.content.split(' ')[2]
if (!time) time = '24h'
message.reply({embeds: [new Discord.MessageEmbed().setColor("GREEN").setDescription("✅" + ` **${user} لقد صمت الفاعل  <@!${message.author.id}>, لوقت  ${ms(ms(time))}**`).setFooter(`طلب من ${message.author.tag}`).setTimestamp()]})
setTimeout(() => {
  user.roles.remove(muteRole);
}, ms(time));
return;
}
})
client.on("messageCreate", async message => {
if (message.content.toLowerCase() == prefix + "clear" || message.content.toLowerCase() == prefix + "مسح") {
message.delete({ timeout: 1000 })
if (message.author.bot) return;
if (message.channel.type == 'dm') return;
if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply(`** ليس لديك الصلاحية ! 🙄**`);
if (!message.guild.member(client.user).permissions.has('MANAGE_GUILD')) return message.reply(`** ليس لدي الصلاحية ! 🙄**`);
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.reply(`لا استطيع حذف اكثر من 100 رسالة`).then(messages => messages.delete({ timeout: 5000 }))
    if (!messagecount) messagecount = '100';
    message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(messages => {
        message.reply(
          (`تم مسح **${messages.size}** رسالة`)
        ).then(messages =>
            messages.delete({ timeout: 5000 }));
    })
}
});
client.on('messageCreate', async message => {
if (message.content.toLowerCase() === prefix + "lock" || message.content.toLowerCase() === prefix + "قفل") {
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`ليس لديك الصلاحية ! 🙄**`);
let channel = message.mentions.channels.first();
let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
if (!channel) channel_find = message.channel
if (!channel_find) return;
channel_find.permissionOverwrites.edit(message.guild.id, {
  SEND_MESSAGES: false
});
message.reply(`\n 🔒 | تم قفل <#${channel_find.id}>\n`);
}
});
client.on('messageCreate', async message => {
if (message.content.toLowerCase() === prefix + "unlock" || message.content.toLowerCase() === prefix + "فتح") {
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`ليس لديك الصلاحية ! 🙄**`);
let channel = message.mentions.channels.first();
let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
if (!channel) channel_find = message.channel;
if (!channel_find) return;
channel_find.permissionOverwrites.edit(message.guild.id, {
  SEND_MESSAGES: true
});
message.reply(`\n 🔓 | تم فتح <#${channel_find.id}>\n`);
}
});
client.on('messageCreate', async message => {
if (message.content.toLowerCase() === prefix + "hide" || message.content.toLowerCase() === prefix + "اخفاء") {
if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
let channel = message.mentions.channels.first();
let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
if (!channel) channel_find = message.channel
if (!channel_find) return;
channel_find.permissionOverwrites.create(message.channel.guild.roles.everyone, {
  VIEW_CHANNEL: false,
})
message.reply(`\n 📢 | تم اخفاء <#${channel_find.id}>\n`);
}
});
client.on('messageCreate', async message => {
if (message.content.toLowerCase() === prefix + "show" || message.content.toLowerCase() === prefix + "اظهار") {
if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
let channel = message.mentions.channels.first();
let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
if (!channel) channel_find = message.channel;
if (!channel_find) return;
channel_find.permissionOverwrites.create(message.channel.guild.roles.everyone, {
  VIEW_CHANNEL: true,
})
message.reply(`\n 📢 | تم ظهور <#${channel_find.id}>\n`);
}
});
client.on('messageCreate', message =>{
if(message.content.toLowerCase() === prefix +"hide all"){
if(message.author.bot || !message.guild) return;
if(!message.member.permissions.has('MANAGE_CHANNELS')) 
return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    message.guild.channels.cache.forEach((channel) => {
        channel.permissionOverwrites.create(everyone, {VIEW_CHANNEL: false}).then(() => {
message.reply(`\n 📢 | تم اخفاء ${channel} \n`)
  });
})
}
});

client.on('messageCreate', message =>{
if(message.content.toLowerCase() === prefix +"show all"){
if(message.author.bot || !message.guild) return;
if(!message.member.permissions.has('MANAGE_CHANNELS')) 
return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    message.guild.channels.cache.forEach((channel) => {
        channel.permissionOverwrites.create(everyone, {VIEW_CHANNEL: true}).then(() => {
message.reply(`\n 📢 | تم اظهار ${channel} \n`)
  });
})
}
});
client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase().startsWith(prefix + "slow mod")) {
   if (message.author.bot) return;
   if (message.channel.type == "dm") {
     return;
   }
   var args = message.content.split(" ")
   if (isNaN(args[1])) return message.reply('الـرجـاء كـتابة الـرقـم')
   message.reply('** تـم وضع السـلو مـود' + args[1] + ' ثـانية **')
   message.channel.setRateLimitPerUser(args[1])
 }
})
//client.login(process.env.token) عشان تحطو بالقفل اذا ريبل ات او اذا فيجوال ستديو سوي ملف .env
client.login("TOKEN!")
