const fs = require("fs");
const path = require("path");
const adminConfig = JSON.parse(fs.readFileSync("admin.json", "utf8"));

module.exports = {
    name: "help",
    usedby: 0,
    info: "display available commands",
    dev: "Jonell Magallanes",
    onPrefix: true,
    usages: "help",
    cooldowns: 10,

    onLaunch: async function ({ api, event, target }) {
        const cmdsPath = path.join(__dirname, '');
        const commandFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith('.js'));

        const visibleCommandFiles = commandFiles.filter(file => {
            const command = require(path.join(cmdsPath, file));
            return !command.hide;
        });

        // Construct help message with all commands
        let helpMessage = `╭─『 Commands List 』\n`;

        visibleCommandFiles.forEach(file => {
            const commandInfo = require(path.join(cmdsPath, file));
            helpMessage += `│✧ ${commandInfo.name || "Unknown"}\n`;
        });

        helpMessage += `╰───────────◊\n\n` +
                       `Type ${adminConfig.prefix}help <command name> to see details about a specific command.\n\n` +
                       `Dev: ${adminConfig.ownerName}`;

        return api.shareContact(helpMessage, api.getCurrentUser ID(), event.threadID);
    }
};
