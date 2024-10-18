import { Pool } from "pg"
import { DBConfigResult } from "@src/db.module/db.interface";

class PgService {
    public connection(bdConfigResult: DBConfigResult) {
        return new Pool({
            password: bdConfigResult.password,
            user: bdConfigResult.user,
            database: bdConfigResult.database,
            port: bdConfigResult.port,
            host: bdConfigResult.host
        });
    }

    public async sqlCall(connection: Pool, sql: string, params: any[]) {
        return (await connection.query(sql, params)).rows;
    }
}
export const pgService = new PgService();