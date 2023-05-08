import express from 'express';
import {initServer} from "./config/server.config";

const app: express.Application = express();

initServer(app)

export default app;