import { TypeVarEnum } from "@src/libs.module/libs.module"

export type StoreConfig = {
    key: string,
    const?: any,
    env?: string | string[],
    store?: string,
    convert: {
        type: TypeVarEnum
    }
}

export type StoreConfigElement = Omit<StoreConfig, "key">;