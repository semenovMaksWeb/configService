import { Pool } from "pg"
import { BdConfigResult } from "@src/bd.module/bd.config/bd.config.interface";

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
}
export const pgService = new PgService();