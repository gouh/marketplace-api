import {Container} from "typedi";

export function loadConfig(): void {
    Container.set([
        {id: "mongodb.url", value: process.env.USR_DB_CONN || null},
        {id: "mongodb.database", value: process.env.USR_DB_NAME || null},
        {id: "password.key", value: process.env.USR_PASSWORD_KEY || null},
        {id: "jwt.secret", value: process.env.USR_PASSWORD_KEY || null},
    ]);
}