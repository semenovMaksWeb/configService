import { convertService } from "@src/libs.module/libs.module";
import { StoreConfig } from "@src/store.module/store.config/store.config.interface";
import { Store } from "@src/store.module/store.interface";
import { storeService } from "@src/store.module/store.service";

class StoreConfigService {
    public getStoreConfigArray(storeConfigList: StoreConfig[]) {
        const result: Store = {};
        for (const storeConfig of storeConfigList) {
            const value = this.getElementStoreConfig(storeConfig);
            result[storeConfig.key] = convertService.convertVar(value, storeConfig.convert.type);
        }
        return result;
    }

    private getElementStoreConfig(storeConfig: StoreConfig) {
        if (storeConfig.const) {
            return storeConfig.const;
        }

        if (Array.isArray(storeConfig.store)) {
            return storeService.getPathStore(storeConfig.store);
        }

        if (typeof storeConfig.store === "string") {
            return storeService.getStore(storeConfig.store);
        }

        if (typeof storeConfig.env === "string") {
            return process.env[storeConfig.env]
        }
    }

    public setStore(key: string | string[], value: any) {
        if (Array.isArray(key)) {
            storeService.setPathStore(key, value);
            return;
        }
        storeService.setStore(key, value);
    }
}

export const storeConfigService = new StoreConfigService();