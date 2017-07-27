const path = require('path');
const fs = require('fs');
const { URL } = require('url');
const storage = {};


class Util {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }


    static filterMentions(string) {
        return string.replace(/<@&(\d+)>|<@!(\d+)>|<@(\d+)>|<#(\d+)>/g, (match, RID, NID, UID, CID) => {
            if (UID && this.bot.client.users.has(UID)) return `@${this.bot.client.users.get(UID).username}`;
            if (CID && this.bot.client.channels.has(CID)) return `#${this.bot.client.channels.get(CID).name}`;

            if (RID || NID) {
                for (const server of this.bot.client.guilds.values()) {
                    if (RID && server.roles.has(RID)) return `@${server.roles.get(RID).name}`;
                    if (NID && server.members.has(NID)) return `@${server.members.get(NID).displayName}`;
                }
            }

            if (CID) return '#deleted-channel';
            if (RID) return '@deleted-role';
            return '@invalid-user';
        });
    }

    static cleanContent(msg, content) {
        return content.replace(/@everyone/g, '@\u200Beveryone')
            .replace(/@here/g, '@\u200Bhere')
            .replace(/<@&[0-9]+>/g, roles => {
                const replaceID = roles.replace(/<|&|>|@/g, '');
                const role = msg.channel.guild.roles.get(replaceID);

                return `@${role.name}`;
            })
            .replace(/<@!?[0-9]+>/g, user => {
                const replaceID = user.replace(/<|!|>|@/g, '');
                const member = msg.channel.guild.members.get(replaceID);

                return `@${member.user.username}`;
            });
    }
    static isURL(value) {
        return /^(https?:\/\/)?\w+(\.\w+)?\.\w+(\/[^]*)*$/.test(value);
    }

    static isImageArg(value) {
        return this.isURL(value) || /^(<@!?)?\d+>?$|^<:\w+:\d+>$/.test(value);
    }

    static filterWord(word) {
        word = word.toLowerCase();
        return word
            .replace(/\s+/g, '')
            .replace(/[!l1i]/g, 'i')
            .replace(/3/g, 'e')
            .replace(/4@/g, 'a')
            .replace(/[5$]/g, 's')
            .replace(/7/g, 't')
            .replace(/0/g, 'o')
            .replace(/#/g, 'h')
            .replace(/z/g, 's');
    }
    static hasFilteredWord(filteredWords, str) {
        return filteredWords ? filteredWords.some(word => str.toLowerCase().includes(word)) : false;
    }


    static hasImage(message) {
        if (message.attachments && message.attachments.size > 0) return message.attachments.some(attachment => attachment.url.match(/\.(png|jpg|jpeg|gif|webp)$/));
        return false;
    }

    static validateImageURL(message) {
        let attachmentImage = null;
        const extensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);
        const linkRegex = /https?:\/\/(?:\w+\.)?[\w-]+\.[\w]{2,3}(?:\/[\w-_\.]+)+\.(?:png|jpg|jpeg|gif|webp)/; // eslint-disable-line no-useless-escape
        if (message.attachments.some(attachment => {
                try {
                    const url = new URL(attachment.url);
                    const ext = path.extname(url.pathname);
                    return extensions.has(ext);
                } catch (err) {
                    if (err.message !== 'Invalid URL') console.log(err);
                    return false;
                }
            })) attachmentImage = message.attachments.first().url;

        if (!attachmentImage) {
            const linkMatch = message.content.match(linkRegex);
            if (linkMatch) {
                try {
                    const url = new URL(linkMatch[0]);
                    const ext = path.extname(url.pathname);
                    if (extensions.has(ext)) attachmentImage = linkMatch[0]; // eslint-disable-line max-depth
                } catch (err) {
                    attachmentImage = null;
                    if (err.message === 'Invalid URL') console.log('No valid image link.'); // eslint-disable-line max-depth
                    else console.log(err);
                }
            }
        }
        return attachmentImage ? attachmentImage.toString() : null;
    }
}


module.exports = Util;