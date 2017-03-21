const express = require('express');
const settings = require('./settings');
const routers = require('./routers');
const app = express();

app.use('/', routers);

const port = settings.server.port;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open http://localhost:${port} in your browser.`);
    }
});

