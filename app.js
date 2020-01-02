import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import rest from './rest'

const server = express();

server.use(helmet());
server.use(cors({
  origin: "*",
  credentials: true
}));
server.use(express.json());

rest(server);

export default server;