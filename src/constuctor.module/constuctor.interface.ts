import { StoreConfig } from "@src/store.module/store.module"

export enum ConstuctorAction {
    CONNECTION_DATABASE = "connectionDatabase"
}

export enum ConstuctorResultOperator {
    PUSH = "push",
    EQUALLY = "="
}

export interface ConstuctorResult {
    name: string;
    operator: ConstuctorResultOperator;
}

export interface Constuctor {
    action: ConstuctorAction,
    result?: ConstuctorResult,
}

export interface ConstuctorConnectionDatabase extends Constuctor {
    connection: StoreConfig[]
}