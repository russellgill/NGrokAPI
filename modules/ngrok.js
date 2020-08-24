const ngrok = require('ngrok');
const chalk = require('chalk');

const {
    env: {
        NGROK_PORT,
        NGROK_DOMAIN,
        NGROK_TOKEN,
    }
} = process;

module.exports.CreateTunnel = async () => {
    console.log(chalk.gray('Starting Tunnel...'));
    let url = null;
    try {
        url = await ngrok.connect({
            proto: 'http',
            addr: NGROK_PORT,
            authtoken: NGROK_TOKEN,
            subdomain: NGROK_DOMAIN,
        });
        return url;
    } catch (err) {
        console.log(chalk.red('Failed to create NGROK tunnel'));
        console.error(chalk.red(err));
        return null;
    }
}