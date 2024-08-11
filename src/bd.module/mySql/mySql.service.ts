import mysql from "mysql"
import { BdConfigResult } from "@src/bd.module/bd.config/bd.config.interface";

class MySqlService {
    public connection(bdConfigResult: BdConfigResult) {
        return mysql.createPool({
            host: bdConfigResult.host,
            user: bdConfigResult.user,
            password: bdConfigResult.password,
            database: bdConfigResult.database,
            port: bdConfigResult.port
        })
    }
}
export const mySqlService = new MySqlService();