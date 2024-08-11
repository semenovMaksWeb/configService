import { StoreConfigElement } from "@src/store.module/store.config/store.config.interface";
import { StoreConfig } from "@src/store.module/store.module"

export enum CommandAction {
    CONNECTION_DATABASE = "connectionDatabase",
    SQL_CALL = "sql"
}

export enum CommandResultOperator {
    PUSH = "push",
    EQUALLY = "="
}

export interface Command {
    action: CommandAction,
    result: CommandResultOperator,
    name: string | string[];
    comment: string | null
}

export interface CommandConnectionDatabase extends Command {
    connection: StoreConfig[]
}

export interface CommandSql extends Command {
    sql: {
        type: StoreConfigElement,
        connection: StoreConfigElement,
        query: string;
        params: StoreConfig[]
    }
}