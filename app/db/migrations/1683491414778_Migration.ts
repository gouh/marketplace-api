import {Db} from "mongodb"
import {MigrationInterface} from "mongo-migrate-ts";
import CryptoJs from "crypto-js";
import HmacSHA256 from "crypto-js/hmac-sha256";

/**
 * Migration for create admin user
 */
export class Migration1683491414778 implements MigrationInterface {
    public async up(db: Db): Promise<any> {
        let email = "admin@admin.com";
        let password: string = CryptoJs.enc.Base64.stringify(HmacSHA256("123456", process.env.USR_PASSWORD_KEY || ""))
        return db.collection("Users").insertOne({
            email: email,
            password: password,
            isAdmin: true
        });
    }

    public async down(db: Db): Promise<any> {
        return db.collection("Users").deleteOne({email: "admin@admin.com"});
    }
}
