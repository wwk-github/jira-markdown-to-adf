import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';

const defaultPort = 8083;
const app = express();

const actualPort = process.env.PORT || defaultPort;

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.set('port', actualPort);

const server = http.createServer(app);

server.listen(actualPort, () => {
    console.log(`api is running http://localhost:${actualPort}/`);
});

app.use('/', router());