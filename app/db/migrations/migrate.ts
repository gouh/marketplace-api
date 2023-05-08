import {mongoMigrateCli} from 'mongo-migrate-ts';

mongoMigrateCli({
    uri: process.env.USR_DB_CONN || "",
    database: process.env.USR_DB_NAME || "",
    migrationsDir: __dirname,
    migrationsCollection: 'Migrations',
});