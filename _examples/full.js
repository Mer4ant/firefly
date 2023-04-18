const { WebHook, EmbedBuilder } = require('firefly');

const webhook = new WebHook({ channel: "channel-url", token: "token" });

webhook.setName("chlen").setAvatar("url");

const example = new EmbedBuilder()
    .setTitle("Title")
    .setAuthor("Author", "url", "url") // Use null to skip the parameter
    .setDescription("A base description")
    .setColor("#000")
    .addField("Field name", "Field Value", true)
    .setImage("url")
    .setThumbnail("url")
    .setFooter("A example footer")
    .build()

// If the response code is 400, then you probably have incorrectly filled in embed, consider the validity of the links!

webhook.send({content: "123", embeds: example, files: ["./1.jpg"]});

console.log(example)