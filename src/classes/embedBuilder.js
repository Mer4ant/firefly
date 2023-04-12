const axios = require('axios');

function formatColor (color) {
    if (typeof color === 'string' && color.startsWith("#")){
        const rawHex = color.split('#')[1];

        return parseInt(rawHex, 16);
    }
    else {
        return Number(color);
    };
};

module.exports = class EmbedBuilder {
    constructor() {
        this.fields = [];
        this.footer = {};
        this.image = {};
        this.thumbnail = {};
        this.author = {};
        this.color = null;
        this.description = null;
        this.title = null;
        this.url = null;
        this.timestamp = null;
    }

    setColor(color) {
        this.color = formatColor(color)
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setURL(url) {
        this.url = url;
        return this;
    }

    setAuthor(name, icon_url, url) {
        this.author = { name, icon_url, url };
        return this;
    }

    addField(name, value, inline = false) {
        this.fields.push({ name, value, inline });
        return this;
    }

    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }

    setImage(url) {
        this.image = { url };
        return this;
    }

    setFooter(text, icon_url) {
        this.footer = { text, icon_url };
        return this;
    }

    setTimestamp(timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    build() {
        const embed = {
            fields: this.fields,
            footer: this.footer,
            image: this.image,
            thumbnail: this.thumbnail,
            author: this.author,
            color: this.color,
            description: this.description,
            title: this.title,
            url: this.url,
            timestamp: this.timestamp
        };
        return [embed];
    }
}