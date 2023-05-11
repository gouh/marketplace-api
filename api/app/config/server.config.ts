import http from "http";
import {loadConfig} from "./config";
import * as bodyparser from "body-parser";
import * as expressWinston from "express-winston";
import express from "express";
import * as winston from "winston";
import {setupRoutes} from "../router";
import helmet from "helmet";

function getOptionsLogger() {
    return {
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        )
    };
}

function setMiddlewareLogger(app: express.Application) {
    let index = expressWinston.requestWhitelist.indexOf('headers');
    if (index !== -1) expressWinston.requestWhitelist.splice(index, 1);
    app.use(expressWinston.logger(getOptionsLogger()));
}

function setMiddlewareErrorLogger(app: express.Application) {
    app.use(expressWinston.errorLogger(getOptionsLogger()));
}

function setCorsConfig(app: express.Application) {
    app.use(helmet());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Expose-Headers', 'Content-Length');
        res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
        if (req.method === 'OPTIONS') {
            return res.status(200).send();
        } else {
            return next();
        }
    });
}

export function initServer(app: express.Application) {
    const server: http.Server = http.createServer(app);
    const port = 3000;

    // Main config of API
    loadConfig()

    // Load body parser
    app.use(bodyparser.json({limit: '5mb'}));

    // API logger
    setMiddlewareLogger(app);

    // cors configuration
    setCorsConfig(app);

    // Routes
    setupRoutes(app);

    // API routes error logger
    setMiddlewareErrorLogger(app);

    server.listen(port, () => {
        console.log(`marketplace-api running at port ${port}`);
    });
}