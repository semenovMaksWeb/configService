import { Pool } from "pg"
import { BdConfigResult } from "@src/bd.module/bd.interface";

class PgService {
    public connection(bdConfigResult: BdConfigResult) {
        return new Pool({
            password: bdConfigResult.password,
            user: bdConfigResult.user,
            database: bdConfigResult.database,
            port: bdConfigResult.port,
            host: bdConfigResult.host
        });
    }
    
    public async sqlCall(connection: Pool, sql: string, params: any[]) {
        return await connection.query(sql, params);
    }
}
export const pgService = new PgService();