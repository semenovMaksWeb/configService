import { StoreConfig, storeConfigService } from "@src/store.module/store.module";
import { BdConfigResult, ConnectionBd } from "@src/bd.module/bd.config/bd.config.interface";
import { pgService } from "./pg/pg.service";

class BdService {
    constructor() { }

    public connectionDatabase(bdConfigList: StoreConfig[]) {
        const bdConfigResult: BdConfigResult = storeConfigService.getStoreConfigArray(bdConfigList) as BdConfigResult;
        switch (bdConfigResult.type) {
            case ConnectionBd.POSTGRE_SQL:
                pgService.connection(bdConfigResult);
                break;
        }
    }
}

export const bdService = new BdService();