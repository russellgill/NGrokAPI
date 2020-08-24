require('dotenv').config();
const chalk = require('chalk');
const app = require('express')();
const bodyParser = require('body-parser');

const ngrokConfig = require('./modules/ngrok');

const tunnel = require('./routes/ngrok');
const health = require('./routes/health');
const {
    env: {
        SERVER_PORT,
    }
} = process;

app.use(bodyParser.json());

app.use('/health', health);
app.use('/ngrok', tunnel);

app.listen(SERVER_PORT, async(err)=>{
    let url = null;
    if (err) {
        console.error(chalk.red(err));
    } else {
        console.log(chalk.green(`Server running on port: ${SERVER_PORT}`))
    }
});