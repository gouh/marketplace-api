import express from "express";

export abstract class AbstractRouter {
    app: express.Router;
    name: string;

    constructor(app: express.Router, name: string) {
        this.app = app;
        this.name = name;
    }

    getName() {
        return this.name;
    }
}