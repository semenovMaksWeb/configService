import { Store } from "configRepoInterface";


class StoreService {
    private store: Store = {}

    constructor() { }

    public getAllStore(): Store {
        return this.store;
    }

    public setStore(key: string, value: any): void {
        this.store[key] = value;
    }

    public pushStore(key: string, value: any): void {
        this.store[key].push(value);
    }

    public pushPathStore(path: string[], value: any): void {
        const { link, key } = this.getLinkElementStore(path);
        link[key].push(value);
    }

    public setPathStore(path: string[], value: any): void {
        const { link, key } = this.getLinkElementStore(path);
        link[key] = value;
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

    private getLinkElementStore(path: string[]) {
        let link = this.store;
        let index = -1;

        for (const key of path) {
            index++;
            if (index == path.length - 1) {
                break;
            }
            link = link[key];
        }
        return { link, key: path[path.length - 1] }
    }
}

export const storeService = new StoreService();