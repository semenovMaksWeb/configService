import { Store } from "@src/store.module/store.interface";

class StoreService {
    private store: Store = {}

    constructor() { }

    public getAllStore(): Store {
        return this.store;
    }

    public setStore(key: string, value: any): void {
        this.store[key] = value;
    }

    public setPathStore(path: string[], value: any): void {
        let link = this.store;
        let index = -1;

        for (const key of path) {
            index++;
            if (index == path.length - 1) {
                break;
            }
            link = link[key];
        }
        link[path[path.length - 1]] = value;
    }

    public getStore(key: string) {
        return this.store[key];
    }

    public getPathStore(path: string[]) {
        let link = this.store;

        for (const key of path) {
            link = link[key];
        }

        return link;
    }
}

export const storeService = new StoreService();