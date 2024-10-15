import { TypeVarEnum } from "@src/libs.module/libs.module"

export type StoreConfig = {
    key: string,
    const?: any,
    env?: string | string[],
    store?: string | string[],
    convert: StoreConvert
}

export type StoreConvert = {
    type: TypeVarEnum,
    regExpFlag?: string
} | null

export type StoreConfigElement = Omit<StoreConfig, "key">;