import { TypeVarEnum } from "@src/libs.module/libs.module"

export type StoreConfig = {
    key: string,
    const?: any,
    env?: string | string[],
    store?: string | string[],
    convert: {
        type: TypeVarEnum
    } | null,
}

export type StoreConfigElement = Omit<StoreConfig, "key">;