import { StoreConfig, storeConfigService } from "@src/store.module/store.module";
import { ConnectionDB, DBConfigResult } from "@src/db.module/db.interface";
import { pgService } from "@src/db.module/pg/pg.service";
import { CommandSql } from "@src/constuctor.module/constuctor.interface";
import { mySqlService } from "@src/db.module/mySql/mySql.service";
import { loggerService } from "@src/logger.module/logger.service";

class DBService {

    private connectionBd = {
        [ConnectionDB.POSTGRE_SQL]: pgService,
        [ConnectionDB.MYSQL]: mySqlService,
    }

    private getConnectionBd(type: ConnectionDB) {
        const connectionBd = this.connectionBd[type];
        if (!connectionBd) {
            throw new Error(`Обработка данной СУБД не реализовано - ${type}`)
        }
        return connectionBd;
    }

    public connectionDatabase(bdConfigList: StoreConfig[]) {
        const bdConfigResult = storeConfigService.getStoreConfigObject(bdConfigList) as DBConfigResult;
        const connectionBd = this.getConnectionBd(bdConfigResult.type);

        try {
            return connectionBd.connection((bdConfigResult));
        } catch (error) {
            if (error instanceof Error) {
                loggerService.error(`Ошибка при подключение к бд: ${error.message}`, { config: { connection: bdConfigResult } });
                throw new Error(`Ошибка при подключение к бд: ${error.message}`);
            }
        }

    }

    public async sqlCall(commandSql: CommandSql) {
        const connection = storeConfigService.getElementStoreConfigConstructor(commandSql.params.connection);
        const paramsSql = storeConfigService.getStoreConfigArray(commandSql.params.params);
        const typeBd = storeConfigService.getElementStoreConfigConstructor(commandSql.params.type) as ConnectionDB;

        const connectionBd = this.getConnectionBd(typeBd);

        try {
            return await connectionBd.sqlCall(connection, commandSql.params.query, paramsSql);
        } catch (error) {
            if (error instanceof Error) {
                loggerService.error(`Ошибка при вызове SQL: ${error.message}`, { config: { sql: commandSql.params.query, name: commandSql.name } })
                throw new Error(`Ошибка при вызове SQL: ${error.message}`);
            }
        }
    }
}

export const dbService = new DBService();