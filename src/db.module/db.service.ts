import { StoreConfig, storeConfigService } from "@src/store.module/store.module";
import { ConnectionDB, DBConfigResult } from "@src/db.module/db.interface";
import { pgService } from "@src/db.module/pg/pg.service";
import { CommandSql } from "@src/constuctor.module/constuctor.interface";
import { mySqlService } from "@src/db.module/mySql/mySql.service";
import { loggerService } from "@src/logger.module/logger.service";

class DBService {
    constructor() { }

    private connectionBd = {
        [ConnectionDB.POSTGRE_SQL]: pgService,
        [ConnectionDB.MYSQL]: mySqlService,
    }

    private getConnectionBd(type: ConnectionDB) {
        if (!(type in this.connectionBd)) {
            throw new Error(`Обработка данной СУБД не реализовано - ${type}`)
        }
        return this.connectionBd[type];
    }

    public connectionDatabase(bdConfigList: StoreConfig[]) {
        const bdConfigResult: DBConfigResult = storeConfigService.getStoreConfigObject(bdConfigList) as DBConfigResult;
        const connectionBd = this.getConnectionBd(bdConfigResult.type);
        return connectionBd.connection((bdConfigResult));
    }

    public async sqlCall(commandSql: CommandSql) {
        // TODO Придумать как определять type СУБД
        const connection = storeConfigService.getElementStoreConfigConstructor(commandSql.sql.connection);
        const paramsSql = storeConfigService.getStoreConfigArray(commandSql.sql.params);
        const typeBd = storeConfigService.getElementStoreConfigConstructor(commandSql.sql.type) as ConnectionDB;

        const connectionBd = this.getConnectionBd(typeBd);
        try {
            return await connectionBd.sqlCall(connection, commandSql.sql.query, paramsSql);
        } catch (error) {
            if (error instanceof Error) {
                loggerService.error(`Ошибка при вызове SQL: ${error.message}`, { config: { sql: commandSql.sql.query, name: commandSql.name } })
                throw new Error(`Ошибка при вызове SQL: ${error.message}`);
            }
        }
    }
}

export const dbService = new DBService();