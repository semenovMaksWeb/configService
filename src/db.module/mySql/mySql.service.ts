import { DBConfigResult } from "configRepoInterface";
import mysql, { Pool } from "mysql2"

class MySqlService {
    public connection(bdConfigResult: DBConfigResult) {
        return mysql.createPool({
            host: bdConfigResult.host,
            user: bdConfigResult.user,
            password: bdConfigResult.password,
            database: bdConfigResult.database,
            port: bdConfigResult.port
        })
    }

    public async sqlCall(connection: Pool, sql: string, params: any[]) {
        const [result] = await connection.promise().query(sql, params);
        return result
    }
}
export const mySqlService = new MySqlService();