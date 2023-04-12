const axios = require('axios')
const fs = require('fs');
const FormData = require('form-data');

module.exports = class WebHook {
    constructor({ channel, token }) {
        this.url = `https://ptb.discord.com/api/webhooks/${channel}/${token}`;
    }

    setName(name) {
        this.username = name;
        return this;
    }

    setAvatar(url) {
        this.avatar_url = url;
        return this;
    }

    async send({ content, embeds = [], files = [] }) {
        const formData = new FormData();
    
        formData.append('payload_json', JSON.stringify({ content, embeds, username: this.username, avatar_url: this.avatar_url }));

        for (const file of files) {
            formData.append('file', fs.createReadStream(file));
        }
    
        const config = {
            headers: {
                ...formData.getHeaders()
            }
        };
    
        try {
            const response = await axios.post(this.url, formData, config);
    
            if (response.status === 204) {
                console.log(`Successfully sent`);
            } else {
                console.error(`Error sending a message to Discord: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error sending a message to Discord: ${error.message}`);
        }
    }
    
}