import { DBConfigResult } from "configRepoInterface";
import pg from 'pg';

class PgService {
    public connection(bdConfigResult: DBConfigResult) {
        return new pg.Pool({
            password: bdConfigResult.password,
            user: bdConfigResult.user,
            database: bdConfigResult.database,
            port: bdConfigResult.port,
            host: bdConfigResult.host
        });
    }

    public async sqlCall(connection: pg.Pool, sql: string, params: any[]) {
        return (await connection.query(sql, params)).rows;
    }
}
export const pgService = new PgService();