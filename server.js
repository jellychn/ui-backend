const db = require('./app/config/db');
const express = require('./app/config/express');

const app = express();
const port = 4001;

db.connect();

async function testDbConnection() {
    try {
        await db.connect();
    } catch (err) {
        console.error(`Unable to connect to server: ${err.message}`);
        process.exit(1);
    }
}

testDbConnection().then(function () {
    app.listen(port, function () {
        console.log(`Listening on port: ${port}`);
    });
});