import { storeService } from "@src/store.module/store.service";

import { Command, ConstuctorBody, CommandResultOperator } from "@src/constuctor.module/constuctor.module";
import { convertService } from "@src/libs.module/libs.module";
import { Store, StoreConfig, StoreConfigElement } from "configRepoInterface";

class StoreConfigService {
    public getStoreConfigObject(storeConfigList: StoreConfig[]) {
        const result: Store = {};
        for (const storeConfig of storeConfigList) {
            const value = this.getElementStoreConfig(storeConfig);
            result[storeConfig.key] = convertService.convertVar(value, storeConfig.convert);
        }
        return result;
    }

    public getStoreConfigArray(storeConfigList: StoreConfig[]) {
        const result: any[] = [];
        for (const storeConfig of storeConfigList) {
            const value = this.getElementStoreConfig(storeConfig);
            result.push(convertService.convertVar(value, storeConfig.convert));
        }
        return result;
    }

    public getElementStoreConfigConstructor(storeConfig: StoreConfigElement) {
        const value = this.getElementStoreConfig(storeConfig);
        return convertService.convertVar(value, storeConfig.convert);
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

    private setStorePush(key: string | string[], value: any, command?: Command) {
        if (command?.copyResult) {
            value = JSON.parse(JSON.stringify(value));
        }
        if (Array.isArray(key)) {
            storeService.pushPathStore(key, value);
            return;
        }
        storeService.pushStore(key, value);
    }

    saveBody(body?: ConstuctorBody) {
        if (!body) {
            return;
        }
        storeService.setStore("body", {});
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const element = body[key];
                storeService.setPathStore(["body", key], element)
            }
        }
    }
}

export const storeConfigService = new StoreConfigService()