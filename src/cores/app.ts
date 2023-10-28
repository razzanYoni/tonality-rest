import express from 'express';
import dotenv from 'dotenv';
import premiumAlbumRouter from '../route/premium-album-router';

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

app.use(express.json());
app.use("/", premiumAlbumRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
