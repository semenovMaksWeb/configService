import { StoreConfig, storeConfigService } from "@src/store.module/store.module";
import { BdConfigResult, ConnectionBd } from "@src/bd.module/bd.config/bd.config.interface";
import { pgService } from "@src/bd.module/pg/pg.service";
import { CommandSql } from "@src/constuctor.module/constuctor.interface";
import { mySqlService } from "@src/bd.module/mySql/mySql.service";

class BdService {
    constructor() { }

    public connectionDatabase(bdConfigList: StoreConfig[]) {
        const bdConfigResult: BdConfigResult = storeConfigService.getStoreConfigObject(bdConfigList) as BdConfigResult;
        switch (bdConfigResult.type) {
            case ConnectionBd.POSTGRE_SQL:
                return pgService.connection(bdConfigResult);
            case ConnectionBd.MYSQL:
                return mySqlService.connection(bdConfigResult);
        }
    }

    public async sqlCall(commandSql: CommandSql) {
        // TODO Придумать как определять type СУБД
        const connection = storeConfigService.getElementStoreConfig(commandSql.sql.connection);
        const paramsSql = storeConfigService.getStoreConfigArray(commandSql.sql.params);        
        const sqlResult = await connection.query(commandSql.sql.query, paramsSql);        
        return sqlResult.rows;
    }
}

export const bdService = new BdService();