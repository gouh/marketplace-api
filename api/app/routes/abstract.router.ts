import express from "express";

export abstract class AbstractRouter {
    app: express.Router;
    name: string;

    /**
     * @param app express.Router
     * @param name string
     */
    constructor(app: express.Router, name: string) {
        this.app = app;
        this.name = name;
    }

    /**
     * @inheritDoc
     */
    getName() {
        return this.name;
    }
}