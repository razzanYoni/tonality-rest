import express from 'express';
import {z} from 'zod';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.APP_PORT;
app.get('/', (req, res) => {
    res.send(
        {
            message: 'Hello World!',
        }
    );
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
