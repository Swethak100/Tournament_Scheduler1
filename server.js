const express = require('express');
const { Client } = require('pg');

const app = express();
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'teams',
    password: '1002',
    port: 5432, 
});

app.use(express.json());

app.post('/schedule', async (req, res) => {
    const { matchInfoArray } = req.body;
    try {
        await client.connect();
        for (const [teamName, matchDateString] of matchInfoArray) {
            const query = {
                text: 'INSERT INTO teamdetail(teamname, date) VALUES($1, $2)',
                values: [teamName, matchDateString],
            };
            await client.query(query);
        }
    } catch (error) {
        console.error('Error executing query', error);
    } finally {
        client.end();
    }
    res.json({ message: 'Data inserted into the database.' });
});

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});
