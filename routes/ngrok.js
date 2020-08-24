const chalk = require('chalk');
const ngrok = require('ngrok');
const router = require('express').Router();
const ngrokConfig = require('../modules/ngrok');

let _url = null;

router.get('/spin-up', async(req, res) => {
    let url = null;
    try {
        url = await ngrokConfig.CreateTunnel();
        _url = url;
        console.log(chalk.green(`NGROK tunnel running at ${_url} started`));
        res.statusCode = 200;
        res.send({ 'success': true });
    } catch (err){
        console.log(chalk.red(err));
        res.statusCode = 500;
        res.send({ 'success': false });
    }
});

router.get('/spin-down', async(req, res) => {
    try {
        if (!_url){
            throw new TypeError('NGROK URL is `null`. No tunnel exists');
        }
        console.log(chalk.gray('Stopping Tunnel...'));
        await ngrok.disconnect();
        await ngrok.kill();
        console.log(chalk.green(`NGROK tunnel running at ${_url} stopped`));
        res.statusCode = 200;
        res.send({ 'success': true });
    } catch (err){
        console.log(chalk.red(err));
        res.statusCode = 500;
        res.send({ 'success': false });
    }

});

module.exports = router;