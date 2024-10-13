import { StoreConfig, StoreConfigElement } from "@src/store.module/store.config/store.config.interface";
import { Store } from "@src/store.module/store.interface";
import { storeService } from "@src/store.module/store.service";

import { Command, CommandResultOperator } from "@src/constuctor.module/constuctor.module";
import { convertService } from "@src/libs.module/libs.module";

class StoreConfigService {
    public getStoreConfigObject(storeConfigList: StoreConfig[]) {
        const result: Store = {};
        for (const storeConfig of storeConfigList) {
            const value = this.getElementStoreConfig(storeConfig);
            result[storeConfig.key] = convertService.convertVar(value, storeConfig.convert?.type);
        }
        return result;
    }

    public getStoreConfigArray(storeConfigList: StoreConfig[]) {
        const result: any[] = [];
        for (const storeConfig of storeConfigList) {
            const value = this.getElementStoreConfig(storeConfig);
            result.push(convertService.convertVar(value, storeConfig.convert?.type));
        }
        return result;
    }

    public getElementStoreConfigConstructor(storeConfig: StoreConfigElement) {
        const value = this.getElementStoreConfig(storeConfig);
        return convertService.convertVar(value, storeConfig.convert?.type);
    }

    private getElementStoreConfig(storeConfig: StoreConfigElement) {
        if (storeConfig.const !== undefined) {
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

    public setStore(command: Command, value: any, key: string | string[]) {
        switch (command.result) {
            case CommandResultOperator.EQUALLY:
                Array.isArray(key) ? storeService.setPathStore(key, value) : storeService.setStore(key, value);
                break

            case CommandResultOperator.PUSH:
                this.setStorePush(key, value, command);
                break;
        }
    }

    private setStorePush(key: string | string[], value: any, command: Command) {
        if (command.copyResult) {
            value = JSON.parse(JSON.stringify(value));
        }
        if (Array.isArray(key)) {
            storeService.pushPathStore(key, value);
            return;
        }
        storeService.pushStore(key, value);
    }
}

export const storeConfigService = new StoreConfigService()