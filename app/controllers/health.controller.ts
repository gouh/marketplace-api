import express from "express";
import {getResponse} from "./helpers/response.helper";
import {StatusCodes} from "http-status-codes";
import {MongoDBConnector} from "../db/mongodb.connector";
import {Container} from "typedi";

export class HealthController {
    /**
     * Get health of application
     * @param req
     * @param res
     */
    async get(req: express.Request, res: express.Response) {
        let mongoConnection = false;
        let statusCode = StatusCodes.OK;
        try {
            mongoConnection = await Container.get(MongoDBConnector).healthCheck()
        } catch (err) {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        }
        return getResponse(res, statusCode, {
            express: "4.17.1",
            mongo: mongoConnection
        }, "HealthCheck")
    }
}
